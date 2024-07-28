import { useLocalizer } from "../../../core/Localization";
import { FooterBuilder } from "./footer-builder";

const InSideFooterComponent = () => {

  const commonLocalizer = useLocalizer("Common-ResCommon");
  const footerData: FooterItemData[] = [
    {
      name:  commonLocalizer("MODULE_COMMON_AUTHENTICATION_LAYOUT_TERMS_OF_USE"),
      position: 'left',
      to: "/terms-of-use"
    },
  ]

  const footerElements = FooterBuilder.Create(footerData)
                              .AddPart({ position: 'left' })
                              .Build();
  return footerElements;
};

export default InSideFooterComponent;
