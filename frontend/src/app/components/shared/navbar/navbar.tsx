import { AppBarComponent } from "@syncfusion/ej2-react-navigations";
import "../../../styles/common.scss";
import "../../../styles/_header.scss";


import Hamburger from "./hamburger";
import { lazy } from "react";
import SettingNavbar from "./setting";

const Brand = lazy(() => import("./brand"));
const SearchBox = lazy(() => import("./search-box"));
const User = lazy(() => import("./user"));
const NotificationBell = lazy(() => import("./notification-bell"));

type Props = { clicked: () => void };

const NavBar = ({ clicked }: Props) => {

  const properties: any = {
    colorMode: "Dark",
    colorClass: "e-dark",
    isPrimary: "false",
    loginClass: "e-inherit login",
  };

  return (
    <div className="control-section color-appbar-section">
      <AppBarComponent colorMode={properties.colorMode}>
        <Hamburger clicked={clicked} />
        <Brand />
        <div className="e-appbar-spacer"></div>
        <SearchBox />
        <div className="e-appbar-spacer"></div>
        <NotificationBell />
        <SettingNavbar />
        <div className="e-appbar-separator"></div>
        <User colorClass={properties.colorClass}/>
      </AppBarComponent>
    </div>
  );
};
export default NavBar;
