import { loadSnapshot } from "../lib/raisu";
import type { Route } from "./+types/api.snapshot";

export async function loader({ request }: Route.LoaderArgs) {
  const url  = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json(
      { error: "Missing 'code' query parameter" },
      { status: 400 }
    );
  }

  try {
    const snapshot = await loadSnapshot(code);
    return Response.json(snapshot, {
      headers: { "Cache-Control": "public, max-age=30" },
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Failed to load snapshot" },
      { status: 500 }
    );
  }
}
