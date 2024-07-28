import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { useState } from "react";
import PermanentNotificationsComponent from "../permanent-notification-components/permanent-notifications-component";
import { useAppSelector } from "../../../core/hooks/core-hooks";
import { useLocalizer } from "../../../core/Localization";


const NotificationBell = () => {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  // const dispatch = useAppDispatch();
  const permanentnotificationState = useAppSelector(state => state.authenticatedUser.value.unReadNotificationsCount)
  const [visibilityDialogNotification, setVisibilityDialogNotification] = useState(false);

  function dialogClose() { setVisibilityDialogNotification(false); }
  function handleViewNotification(e) {
    e.preventDefault();
    // dispatch(permanentNotificationMessages())
    setVisibilityDialogNotification(!visibilityDialogNotification);
  }

  return (
    <>
      <div className="badge-block p-0 m-0 mx-5" onClick={handleViewNotification}>
        <span
          className={"e-icons bell-alticon- text-xl font-medium p-0 m-0 cursor-pointer"}
          title={commonLocalizer("MODULE_COMMON_NAVBAR_NOTIFICATIONS")}
        ></span>
        {permanentnotificationState > 0 && <span className="badge-content">{permanentnotificationState > 9 ? "9+" : permanentnotificationState.toString()}</span>}
      </div>

      <DialogComponent
        width={400}
        className=""
        position={{ X: "right", Y: "top" }}
        id="dialogModalNotifications"
        isModal={true}
        target="#maintext"
        close={dialogClose}
        visible={visibilityDialogNotification}
      >
        <PermanentNotificationsComponent close={setVisibilityDialogNotification} />
      </DialogComponent>
    </>
  );
};

export default NotificationBell;
