
interface PermanentNotificationUser {
  userId: string;
  notificationCount: number;
  payload: PermanentNotificationItem[]
}
interface CountPermanentNotification {
  unreadNotificationsCount: number
}

interface PermanentNotificationItem {
  id: string;
  subject: string;
  message: string;
  isRead: boolean;
  imgSrc: string;
  creationDate: string;
  readDate: string;
  creationDateWording: string;
}
interface UpdatePermanentNotificationCommand {
  notificationMessagesIds: string[];
}

interface PermanentNotificationUpdateResult {
  payload: PermanentNotificationUpdateSuccessPayload;
  hasSucceeded: boolean;
  errorMessages: ErrorMessageItem[];
}

interface UpdatePermanentNotificationSuccessPayload {
  isCompleted: boolean;
}

interface SetNotificationStatusCommand { id: string, checked: boolean }