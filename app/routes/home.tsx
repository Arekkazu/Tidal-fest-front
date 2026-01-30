import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TidalFest - Tu Festival Personalizado" },
    {
      name: "description",
      content:
        "Conecta tu cuenta de Tidal y descubre tu lineup de festival personalizado basado en tus gustos musicales.",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
