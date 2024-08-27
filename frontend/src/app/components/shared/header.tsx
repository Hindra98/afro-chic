import { NavLink } from "react-router-dom";
import LanguageSelector from "../form/LanguageSelector";
import useCart from "../../core/hooks/use-cart";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../core/hooks/core-hooks";
import Button from "../form/Button";
import { handleSignOut } from "../../http/firebase/users/oauth/oauth";

const Header = () => {
  const { t } = useTranslation();
  const navRef = useRef<HTMLDivElement>(null);
  const userConnected = useAppSelector(state=> state.getUser);
  const hamburgerRef = useRef<HTMLSpanElement>(null);
  const { cartItems } = useCart();
  const [showNav, setShowNav] = useState(false);
  const toggleFocus = () => {
    showNav
      ? (navRef?.current?.blur(), hamburgerRef?.current?.blur())
      : (navRef?.current?.focus(), hamburgerRef?.current?.focus());
  };

  return (
    <header className="w-full">
      <nav
        className={`flex w-full items-center justify-between px-2`}
      >
        <div className="actions gap-4    flex flex-row items-center">
          <NavLink to={"/"}>AfroChic</NavLink>
        </div>
        <div
          className={`xmd:hidden xs:flex xs:flex-row items-center transition`}
        ><LanguageSelector className="languages z-10" />
          <NavLink to={"/cart"} className={`inline-block pe-2`}>
            <div className="relative w-8">
              <span className="icon shopicon- text-[28px] text-black"></span>
              {cartItems?.length>0 ? (
                <span className="absolute block top-1 right-0 rounded-full size-4 text-xs text-center bg-red-700 text-slate-50">
                  {cartItems?.length}
                </span>
              ) : (
                ""
              )}
            </div>
          </NavLink>
          <span
            className={`text-2xl active:scale-90 cursor-pointer icon ${showNav? "cancelicon-":"menuicon-"} `}
            ref={hamburgerRef}
            onClick={() => (setShowNav(!showNav), toggleFocus())}
            onBlur={() => setShowNav(false)}
            tabIndex={-1}
          ></span>
        </div>

        <div
          ref={navRef}
          onBlur={() => setShowNav(false)}
          tabIndex={-1}
          className={`user flex items-center justify-end gap-4 z-10 xmd:flex xmd:justify-between xmd:flex-row xmd:bg-transparent xmd:relative xmd:top-0 xs:${showNav ? "flex" : "hidden"} xs:flex-col xs:bg-slate-100 xs:absolute xs:right-[5px] xs:top-10 transition-all`}
        >
          <NavLink to={"/cart"} className={`xs:hidden xmd:block`}>
            <div className="relative w-8">
              <span className="icon shopicon- text-[28px] text-black"></span>
              {cartItems?.length>0 ? (
                <span className="absolute block top-1 right-0 rounded-full size-4 text-xs text-center bg-red-700 text-slate-50">
                  {cartItems?.length}
                </span>
              ) : (
                ""
              )}
            </div>
          </NavLink>
          <NavLink to={"/admin"}>
            {t("MODULE_COMMON_NAVBAR_ADMINISTRATION")}
          </NavLink>
          <NavLink to={"/shop"}>
            {t("MODULE_COMMON_NAVBAR_SHOP")}
          </NavLink>
          <NavLink to={"/contact"}>
            {t("MODULE_COMMON_NAVBAR_CONTACT")}
          </NavLink>
          {userConnected.user !== null ? <>
            <NavLink to={"/account/profil"}>
            {userConnected.user.email}
          </NavLink><button onClick={handleSignOut}>Se deconnecter</button> </>: <><NavLink to={"/account/login"}>
            {t("MODULE_COMMON_NAVBAR_LOGIN")}
          </NavLink>
          <NavLink to={"/account/register"}>
            {t("MODULE_COMMON_NAVBAR_REGISTER")}
          </NavLink></>}
          
          <LanguageSelector className="languages xs:hidden xmd:block" />
        </div>
      </nav>

{/* 
      <div>
        <span id="ProgressLabel" className="sr-only">
          Loading
        </span>
        <span
          role="progressbar"
          aria-labelledby="ProgressLabel"
          aria-valuenow="75"
          className="block rounded-full bg-gray-200"
        >
          <span
            className="block h-3 rounded-full bg-[repeating-linear-gradient(45deg,_var(--tw-gradient-from)_0,_var(--tw-gradient-from)_20px,_var(--tw-gradient-to)_20px,_var(--tw-gradient-to)_40px)] from-indigo-400 to-indigo-500"
            style="width: 75%"
          ></span>
        </span>
      </div> */}


    </header>
  );
};

export default Header;
