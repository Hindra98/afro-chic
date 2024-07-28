import { useOutlet, useNavigate } from "react-router-dom";
import "../../styles/_authentication-flow.scss";
import { useGlobalAppContext } from "../../core/hooks/use-app-context";

export default function OpenRouteLayout() {
  const outlet = useOutlet();
  const { rExpires } = useGlobalAppContext();
  const navigate = useNavigate();
  if (
    rExpires !== null &&
    rExpires !== undefined &&
    rExpires * 1000 > Date.now()
  ) {
    navigate("/dashboard", { replace: true });
  }

  return <div className="w-full">{outlet}</div>;
}
