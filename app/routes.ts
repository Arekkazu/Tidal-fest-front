import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/fesival/:id", "routes/festival.$id.tsx"),
] satisfies RouteConfig;
