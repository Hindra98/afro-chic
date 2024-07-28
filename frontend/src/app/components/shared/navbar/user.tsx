import { MenuComponent, MenuItemModel, MenuEventArgs } from "@syncfusion/ej2-react-navigations";
import { DropDownButtonComponent, ItemModel } from "@syncfusion/ej2-react-splitbuttons";
import { ReactElement, useState } from "react";
import ConfirmActionsDialog from "../dialog-components/confirm-actions-dialog";
import { useLocalizer } from "../../../core/Localization";
import { useGlobalAppContext } from "../../../core/hooks/use-app-context";
import { isEmpty } from "../../../core/text/is-empty";
import { useAppDispatch } from "../../../core/hooks/core-hooks";

const User = (prop: { colorClass: string }) => {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  const { claims } = useGlobalAppContext();
  const fullName = claims?.get("fullname");
  const userProfileName = !isEmpty(fullName as string) ? fullName : claims?.get("name");
  
  const openDialog = useState(false);
  const [titleDialog, setTiltleDialog] = useState("");
  const [btnDialog, setBtnDialog] = useState([]);
  const [messageDialog, setMessageDialog] = useState<ReactElement>(null);

  const dispatch = useAppDispatch();

  const dropdownMenuEvent = () => {
    document.getElementById("logout")?.addEventListener("click", () => {

      setTiltleDialog(`Déconnexion`);
        setMessageDialog(
          <p>
            Voulez-vous vraiment vous déconnecter: <b>{userProfileName}</b> ?{" "}
          </p>
        );
        setBtnDialog([
          {
            type: "button",
            name: "Annuler",
            css: "cancelBtn",
            handleClick: () => openDialog[1](false),
          },
          {
            type: "button",
            name: "Confirmer",
            css: "okBtn",
            handleClick: () => { dispatch(signOut()); openDialog[1](false) }
          },
        ]);
        openDialog[1](true);
    });
  };

  const userDropDownButtonItems: ItemModel[] = [
    {
      text: commonLocalizer("MODULE_COMMON_NAVBAR_MY_PROFILE"),
      url: "/my-profile",
      iconCss: "e-icons e-user",
      id: "profile",
    },
    {
      text: commonLocalizer("MODULE_COMMON_NAVBAR_CHANGE_PASSWORD"),
      url: "/change-password",
      iconCss: "e-icons e-lock",
    },
    { separator: true },
    {
      text: commonLocalizer("MODULE_COMMON_NAVBAR_SETTINGS"),
      url: "/my-settings",
      iconCss: "e-icons e-settings",
    },
    { separator: true },
    {
      text: commonLocalizer("MODULE_COMMON_NAVBAR_HELP"),
      url: "/help",
      iconCss: "helpicon-",
    },
    {
      text: commonLocalizer("MODULE_COMMON_NAVBAR_LOGOUT"),
      iconCss: "e-icons e-export",
      id: "logout",
    },
  ];

  const verticalMenuItems: MenuItemModel[] = [
    {
      iconCss: "e-icons e-menu",
      items: [
        {
          text: userProfileName,
          items: userDropDownButtonItems,
          id: "user",
        },
      ],
    },
  ];

  const beforeItemRender = (args: MenuEventArgs): void => {
    if (
      args.element.children.length > 0 &&
      args.element.children[0].classList.contains("e-menu")
    ) {
      args.element.setAttribute("aria-label", "more vertical");
    }
  };

  return (
    <>
      <DropDownButtonComponent
        open={dropdownMenuEvent}
        iconCss={"e-icons user-8icon- text-2xl font-medium"}
        cssClass={"e-inherit e-appbar-menu " + prop.colorClass}
        items={userDropDownButtonItems}
      >
        {userProfileName}
      </DropDownButtonComponent>
      <MenuComponent
        cssClass={"e-inherit e-appbar-icon-menu text-black"}
        onOpen={dropdownMenuEvent}
        items={verticalMenuItems}
        beforeItemRender={beforeItemRender}
      ></MenuComponent>
      
      <ConfirmActionsDialog
        openDialog={openDialog}
        title={titleDialog}
        button={btnDialog}
      >
        {messageDialog}
      </ConfirmActionsDialog>
      
    </>
  );
};

export default User;
