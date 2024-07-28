import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Button from "../../form/Button";
import { DropDownButtonComponent, ItemModel } from "@syncfusion/ej2-react-splitbuttons";
import { useLocalizer } from "../../../core/Localization";

type Props = {
  checkAll: boolean;
  checkedLength: number;
  filter?: number;
  checkAllNotification: () => void;
  deleteNotifications: () => void;
  markAsReadNotifications: () => void;
  selectItems: (e) => void;
  close: (value: boolean) => void;
};

const PermanentNotificationComponentToolsbar = (props: Props) => {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  const FilterNotificationMenu: ItemModel[] = [
    {
      text: commonLocalizer("MODULE_COMMON_NOTIFICATIONS_FILTER_ALL"),
      iconCss: (props.filter === 0 ? "ok-circledicon-" : "circleicon-") + " icon ",
      id: "all",
    },
    {
      text: commonLocalizer("MODULE_COMMON_NOTIFICATIONS_FILTER_READ"),
      iconCss: (props.filter === 1 ? "ok-circledicon-" : "circleicon-") + " icon ",
      id: "read",
    },
    {
      text: commonLocalizer("MODULE_COMMON_NOTIFICATIONS_FILTER_UNREAD"),
      iconCss: (props.filter === 2 ? "ok-circledicon-" : "circleicon-") + " icon ",
      id: "unread",
    },
  ];

  const dropdownMenuNotificationEvent = () => {
    document.getElementById("all")?.addEventListener("click", () => {
      props.selectItems(0)
    });
    document.getElementById("read")?.addEventListener("click", () => {
      props.selectItems(1)
    });
    document.getElementById("unread")?.addEventListener("click", () => {
      props.selectItems(2)
    });
  };
  return (
    <div className="flex justify-between items-center py-2 px-3 header-notification">
      <div className="flex flex-row gap-2 items-center ">
        <div
          className="pl-2 cursor-pointer close"
          onClick={() => props.close(false)}
        >
          <span className="icon up-openicon-"></span>
        </div>
        <div className="font-bold text-base title-notif">{commonLocalizer("MODULE_COMMON_NOTIFICATIONS_TITLE")}</div>
      </div>

      <div className="flex justify-end pl-3 gap-2 items-center">
        <DropDownButtonComponent
          open={dropdownMenuNotificationEvent}
          cssClass={"e-appbar-notification p-0 m-0 toolsbar-notif"}
          items={FilterNotificationMenu}
        >
          <i className={"e-icons icon filtericon-"}></i>
        </DropDownButtonComponent>


        <TooltipComponent
          id="select-all"
          content={props.checkAll
            ? commonLocalizer("MODULE_COMMON_NOTIFICATIONS_ACTIONS_UNSELECT_ALL")
            : commonLocalizer("MODULE_COMMON_NOTIFICATIONS_ACTIONS_SELECT_ALL")}
        >
          <Button
            param={{
              type: "button",
              css: (props.checkAll ? "" : "") + " toolsbar-notif select-all",
              name: props.checkAll
                ? <span className="icon checkicon-"></span>
                : <span className="icon check-emptyicon-"></span>,
              handleClick: props.checkAllNotification,
            }}
          />
        </TooltipComponent>
        <TooltipComponent
          id="mark-read"
          content={commonLocalizer("MODULE_COMMON_NOTIFICATIONS_ACTIONS_MARK_AS_READ")}
        >
          <Button
            param={{
              type: "button",
              disabled: !(props.checkedLength > 0),
              css: (!(props.checkedLength > 0) ? "disabled" : "") + " toolsbar-notif mark-read",
              name: <span className="icon ok-circledicon-"></span>,
              handleClick: props.markAsReadNotifications,
            }}
          />
        </TooltipComponent>
        <TooltipComponent
          id="delete-notification"
          content={commonLocalizer("MODULE_COMMON_NOTIFICATIONS_ACTIONS_DELETE")}
        >
          <Button
            param={{
              type: "button",
              disabled: !(props.checkedLength > 0),
              css: (!(props.checkedLength > 0) ? "disabled" : "") + " toolsbar-notif delete-notification",
              name: <span className="icon trashicon-"></span>,
              handleClick: props.deleteNotifications,
            }}
          />
        </TooltipComponent>
      </div>
    </div>
  );
};

export default PermanentNotificationComponentToolsbar;
