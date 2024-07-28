import { useAppSelector } from "../../../core/hooks/core-hooks";
import { useLocalizer } from "../../../core/Localization";



  export default function PermanentNotificationItem(data: { [key: string]: PermanentNotificationItem }) {

    const commonLocalizer = useLocalizer("Common-ResCommon");
  const key = Object.keys(data)[0]
  const checked = useAppSelector(state => state.serverNotifications)
  const date = data[key].creationDate

  return (
    <div className={"item-notification w-full flex grid-flow-col justify-stretch items-center gap-4 py-4 px-2"}>
      <div className="input-check cursor-pointer ps-2" id={`input-${data[key].id}`}>
        <span className={`icon ${checked? "checkicon-": "check-emptyicon-"}`}></span>
      </div>
      <div className="flex flex-col gap-2 overflow-hidden w-full">
        <h5 className={`${data[key].isRead ? "is-read":"is-not-read"} w-full truncate`}>{data[key].subject}</h5>
        <p className="e-list-content e-text-overflow text-sm me-auto">
          {data[key].message}
        </p>
        <div className="text-xs italic py-1 notification-date flex justify-between px-2">
          <div className="text-xs italic py-1 notification-date">{date}</div>
          <a href={`/notifications`}>{commonLocalizer("MODULE_COMMON_NOTIFICATIONS_NOTIFICATION_ITEM_VIEW_DETAIL")}</a>
          </div>
      </div>
    </div>
  );
}
