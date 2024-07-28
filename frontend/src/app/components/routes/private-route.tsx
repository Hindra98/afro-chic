import { useNavigate} from "react-router-dom";
import { useCallback } from "react";
import { useAppDispatch } from "../../core/hooks/core-hooks";
import { useGlobalAppContext } from "../../core/hooks/use-app-context";

interface Props{
  children?: any
}

export const PrivateRoute = (props: Props) => {
  
  const dispatch = useAppDispatch();
  const { accessToken, rExpires } = useGlobalAppContext();
  const navigate = useNavigate();

  const close = useCallback(() => {
    // dispatch(signOut());
    setTimeout(() => navigate("/login", { replace: true }), 300);
  },[dispatch, navigate])

  // if(accessToken){
  //   if((rExpires !== null && rExpires !== undefined && rExpires * 1000 < Date.now()) 
  //     || rExpires === 0 
  //     || rExpires === undefined){
  //     close();
  //   }
  // }
  // else{
  //   close();
  // }
    return props.children;
}