import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("view", "routes/view.tsx"),
  route("docs", "routes/docs.tsx"),
  route("api/snapshot", "routes/api.snapshot.ts"),
  route("debug-example-code", "routes/debug-example-code.tsx"),
] satisfies RouteConfig;
