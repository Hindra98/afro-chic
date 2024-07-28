import { useLocalizer } from "../../../core/Localization";
import { FooterBuilder } from "./footer-builder";

const OutSideFooterComponent = () => {

  const commonLocalizer = useLocalizer("Common-ResCommon");
  const footerData: FooterItemData[] = [
    {
      name:  commonLocalizer("MODULE_COMMON_AUTHENTICATION_LAYOUT_TERMS_OF_USE"),
      position: 'right',
      to: "/terms-of-use"
    },
    {
      name: commonLocalizer("MODULE_COMMON_AUTHENTICATION_LAYOUT_PRIVACY_AND_COOKIES"),
      position: 'right',
      to: "/privacy-and-cookies"
    }
  ]

  const footerElements = FooterBuilder.Create(footerData)
                              .AddPart({ position: 'right' })
                              .Build();
  return footerElements;
};

export default OutSideFooterComponent;
