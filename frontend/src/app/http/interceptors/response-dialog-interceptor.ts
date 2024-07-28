import { AxiosResponse } from 'axios';
import { navigateHeaderKey } from './response-navigate-directive-interceptor';
import { NotificationsApi } from '../../components/dialog/notifications-api';

const notificationApi = new NotificationsApi();

/**
 * Intercepts http responses to handle server validation data.
 * @param response The axios current configuration.
 */
export const responseDialogInterceptor = (response: AxiosResponse<unknown>) => {

    if(response === undefined)
      return response;
   

    // Gathering dialog notifications.
    const notifications = Object.keys(response.headers)
        .filter(key => key.toLowerCase().startsWith('x-notifications-'))
        .map(key => ({
            messages: (response.headers[key]?.split(';').map(decodeURIComponent) || []) as string[],
            type: key.split('-').pop()
        }));

    // Displays serveur notificatinos
    notifications?.forEach(notification =>
        notification.messages.forEach(notificationMessage => {
            switch (notification.type) {
                case 'info':
                    notificationApi.notifyInformation(notificationMessage);
                    break;
                case 'success': 
                      notificationApi.notifySuccess(notificationMessage);
                break;
                case 'error':
                    notificationApi.notifyError(notificationMessage);
                    break;
                case 'warning':
                    notificationApi.notifyWarning(notificationMessage);
                    break;
            }
        }));

     // If a navigation is requested, no need to display the notifications
    // the correlation mechanism will provide it on target page
    if (response.headers[navigateHeaderKey]) return response;

    // Returning the unchanged config.
    return response
};