import { redirect } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

const redirectTidal = () => {
  console.log("Redirecting to Tidal...");
  window.location.href = "http://192.168.1.73:3000/api/auth/tidal/login";
};
export function Welcome() {
  return (
    <main>
      <h1>Tidal-fest :D</h1>
      <button onClick={redirectTidal}>Dale Click ACA</button>
    </main>
  );
}
