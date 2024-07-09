import { useNavigate } from "react-router-dom";

export const usePreviousPage = () => {
  const navigate = useNavigate();
  navigate(-1);
};
