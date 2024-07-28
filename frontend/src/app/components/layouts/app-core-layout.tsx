import { useOutlet } from "react-router-dom";
import "../../styles/_app-core-layout.scss";


export const HomeCoreLayout = () => {
  const outlet = useOutlet();


  return (<div className="w-full home-core-layout" id="home-core-layout">{outlet}</div>);
};

export default HomeCoreLayout;
