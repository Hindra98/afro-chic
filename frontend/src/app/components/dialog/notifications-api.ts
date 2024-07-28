import { createNotificationService } from './notifications/service';

let store;
export const injectStoreInDialogApi = _store => {
    store = _store;
}

export class NotificationsApi {

    private notificationApi: ReturnType<typeof createNotificationService>;

    private getNotificationApi() {
        return this.notificationApi
            || (this.notificationApi = createNotificationService({ store: store }));
    }

    public get notifyInformation() { return this.getNotificationApi().notifyInformation }

    public get notifyWarning() { return this.getNotificationApi().notifyWarning }

    public get notifyError() { return this.getNotificationApi().notifyError }

    public get notifySuccess() { return this.getNotificationApi().notifySuccess }
}
