interface ErrorMessageItem {

    memberNames: string[];
    errorMessage: string;
}

interface ServerErrorMessageItem {
  detail: string;
  instance: string;
  message: string;
  status: number;
  title: string;
  type: string;
}

// Define the structure of a retry queue item
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

type ServerNotificationTypes = 'Success' | 'Error' | 'Warning' | 'Info'

interface ServerNotification {
  time: number,
  type: ServerNotificationTypes;
  message: string;
}

interface SetServerNotificationAction {
  type: string;
  payload: ServerNotification;
}

type ParamsButton = {
  name?: React.JSX.Element | string;
  css?: string;
  disabled?: boolean;
  handleClick?: (e) => void;
  type: "submit" | "reset" | "button";
};

type ParamsLink = {
  name?: React.JSX.Element | string;
  css?: string;
  disabled?: boolean;
  handleClick?: (e) => void;
  href: string;
  target: string;
};

type FooterItemData = {
  name: string;
  position: FooterItemPosition;
  to: string;
};
type FooterItemPosition = 'left' | 'center' | 'right';