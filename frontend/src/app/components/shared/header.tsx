import { NavLink } from "react-router-dom";
import LanguageSelector from "../form/LanguageSelector";
import { useLocalizer } from "../../core/Localization";
import useCart from "../../core/hooks/use-cart";
import { useRef, useState } from "react";

const Header = () => {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  const navRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLSpanElement>(null)
  const { total } = useCart();
  const totals = total+1
  const [showNav, setShowNav] = useState(false);
  const toggleFocus = () => {
    (showNav) ? (navRef?.current?.blur(), hamburgerRef?.current?.blur()):(navRef?.current?.focus(), hamburgerRef?.current?.focus())
  }
  
  return (
    <header className="w-full">
      <nav
        className={`flex w-full items-center p-2 xmd:justify-between xmd:flex-row xs:flex-col relative`}
      >
        <div className="actions self-start gap-4">
          <NavLink to={"/"}>AfroChic</NavLink>
        </div>
        <div
          className={`xmd:hidden xs:block absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer transition`}
        >
          <NavLink to={"/cart"} className={`inline-block pe-2`}>
            <div className="relative w-8">
              <span className="icon shopicon- text-[28px] text-black"></span>
              {totals ? (
                <span className="absolute block top-1 right-0 rounded-full size-4 text-xs text-center bg-red-700 text-slate-50">
                  {totals}
                </span>
              ) : (
                ""
              )}
            </div>
          </NavLink>
          <span className="icon menuicon- text-2xl active:scale-90" ref={hamburgerRef} onClick={()=> (setShowNav(!showNav), toggleFocus())} onBlur={()=> setShowNav(false)} tabIndex={-1}></span>
        </div>
        <div ref={navRef} onBlur={()=> setShowNav(false)} tabIndex={-1}
          className={`user flex items-center justify-end gap-4 z-10 xmd:flex xmd:justify-between xmd:flex-row xmd:bg-transparent xmd:relative xmd:top-0 xs:${showNav?"flex":"hidden"} xs:flex-col xs:bg-slate-100 xs:absolute xs:right-[5px] xs:top-10 transition-all`}
        >
          <NavLink to={"/cart"} className={`xs:hidden xmd:block`}>
            <div className="relative w-8">
              <span className="icon shopicon- text-[28px] text-black"></span>
              {totals ? (
                <span className="absolute block top-1 right-0 rounded-full size-4 text-xs text-center bg-red-700 text-slate-50">
                  {totals}
                </span>
              ) : (
                ""
              )}
            </div>
          </NavLink>
          <NavLink to={"/admin"}>
            {commonLocalizer("MODULE_COMMON_NAVBAR_ADMINISTRATION")}
          </NavLink>
          <NavLink to={"/shop"}>
            {commonLocalizer("MODULE_COMMON_NAVBAR_SHOP")}
          </NavLink>
          <NavLink to={"/account/login"}>
            {commonLocalizer("MODULE_COMMON_NAVBAR_LOGIN")}
          </NavLink>
          <NavLink to={"/account/register"}>
            {commonLocalizer("MODULE_COMMON_NAVBAR_REGISTER")}
          </NavLink>
          <NavLink to={"/contact"}>
            {commonLocalizer("MODULE_COMMON_NAVBAR_CONTACT")}
          </NavLink>
          <LanguageSelector className="languages mx-2 py-2" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
