import { decode } from "@msgpack/msgpack";
import type { Snapshot } from "./types";

// ── Shortcode ──────────────────────────────────────────────────────────────

function base64urlToBytes(str: string): Uint8Array {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

interface DecodedShortcode {
  providerId: number;
  pasteKey: string;
  aesKey: Uint8Array;
}

export function decodeShortcode(shortcode: string): DecodedShortcode {
  const bytes = base64urlToBytes(shortcode);
  const providerId = bytes[0];
  const keyLen = bytes[1];
  const pasteKey = new TextDecoder().decode(bytes.slice(2, 2 + keyLen));
  const aesKey = bytes.slice(2 + keyLen); // 16 raw bytes
  return { providerId, pasteKey, aesKey };
}

// ── Fetch ──────────────────────────────────────────────────────────────────

const PROVIDERS: Record<number, (key: string) => string> = {
  0: (key) => `https://api.pastes.dev/${key}`,
  1: (key) => `https://hastebin.com/raw/${key}`,
};

export async function fetchPayload(
  providerId: number,
  pasteKey: string
): Promise<string> {
  const urlFn = PROVIDERS[providerId];
  if (!urlFn) throw new Error(`Unknown provider id: ${providerId}`);
  const res = await fetch(urlFn(pasteKey));
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  return await res.text();
}

// ── Base64 decode ──────────────────────────────────────────────────────────

function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64.trim());
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

// ── Decrypt ────────────────────────────────────────────────────────────────

async function decrypt(
  encryptedBytes: Uint8Array,
  aesKeyBytes: Uint8Array
): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    aesKeyBytes.buffer.slice(aesKeyBytes.byteOffset, aesKeyBytes.byteOffset + aesKeyBytes.byteLength) as ArrayBuffer,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
  const iv = encryptedBytes.slice(0, 16);
  const ciphertext = encryptedBytes.slice(16);
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    ciphertext
  );
  return new Uint8Array(plaintext);
}

// ── Pipeline ───────────────────────────────────────────────────────────────

const SUPPORTED_VERSIONS = new Set([0, 1, 2]);

export async function loadSnapshot(shortcode: string): Promise<Snapshot> {
  const { providerId, pasteKey, aesKey } = decodeShortcode(shortcode);
  const b64 = await fetchPayload(providerId, pasteKey);
  const encryptedBytes = base64ToBytes(b64);
  const plaintextBytes = await decrypt(encryptedBytes, aesKey);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = decode(plaintextBytes) as Record<string, any>;

  const version: number = typeof raw.version === "number" ? raw.version : 0;

  if (!SUPPORTED_VERSIONS.has(version)) {
    console.warn(
      `Unknown snapshot version ${version} — attempting best-effort render`
    );
  }

  return {
    version,
    timestamp: raw.timestamp,
    serverVersion: raw.serverVersion,
    javaVersion: raw.javaVersion,
    categories: (raw.categories ?? []).sort(
      (a: { priority: number }, b: { priority: number }) =>
        a.priority - b.priority
    ),
  };
}

// ── Adventure component name parsing ──────────────────────────────────────

export function parseCategoryName(raw: string): string {
  try {
    const parsed = JSON.parse(raw);
    // Plain JSON string: "Category" → Category
    if (typeof parsed === "string") return parsed;
    // Adventure component object: {"text":"Category"}
    if (typeof parsed?.text === "string") return parsed.text;
    // Array of Adventure components: [{"text":"Category"}]
    if (Array.isArray(parsed) && typeof parsed[0]?.text === "string")
      return parsed[0].text;
  } catch {
    // not JSON — use raw string as-is
  }
  return raw;
}
