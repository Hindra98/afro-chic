import { PositionDataModel } from '@syncfusion/ej2-popups';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../core/hooks/core-hooks';
import { RootState } from '../../../store-management/store-creation';
import { ModelShape } from '../../../store-management/actions/server-notifications';
import { removeNotification } from '../../../store-management/actions/server-notifications/server-notifications-action';



const notificationExpirationMs = 10000;

export const Toaster = () => {

    const state = useAppSelector((state: RootState) => state.serverNotifications);
    let toastObj: ToastComponent;
    const position: PositionDataModel = { X: 'Right', Y: 'Bottom' };

    const dispatch = useAppDispatch();

    const close = useCallback((time: number) => dispatch(removeNotification({command: {
        time
    } as ServerNotification} as ModelShape)), [dispatch]);

    function create(): void {
        setTimeout(function () {
            toastObj.show({
                title: 'Adaptive Tiles Meeting', content: 'Conference Room 01 / Building 135 10:00 AM',
                icon: 'e-meeting',
            });
        }.bind(this), 200);
    }

    function onclose(e): void {
        // if (e.toastContainer.childElementCount === 0) {
        //     toastBtnHide.element.style.display = 'none';
        // }
    }

    function onbeforeOpen(): void {
        //toastBtnHide.element.style.display = 'inline-block';
    }

    // function rendereComplete(): void{
    //     // document.addEventListener('click', function (e: Event): void {
    //     //     if (!isNullOrUndefined(toastObj) && e.target !== toastBtnShow.element) {
    //     //         toastObj.hide('All');
    //     //     }
    //     // }.bind(this));
    // }

    // Handles next toast closure registration
    useEffect(() => {

        if (state.value.length) {

            const nextNotificationToClose = state.value.sort(notification => notification.time)[0];
            const pastMs = +new Date() - +new Date(nextNotificationToClose.time);
            const msDelay = notificationExpirationMs - pastMs;
            const token = setTimeout(() => close(nextNotificationToClose.time), msDelay);

            return () => clearTimeout(token);
        }

    }, [state, close]);

    if (!state.value?.length) return null;

    // Rendering the notifications as toasts
    return <>
        <ul>
            {state.value.map(() => (
                //  <li className={notification.type} key={`${notification.time}_${index}`}>
                //     <span>{notification.message}</span>
                // </li>
                <ToastComponent ref={(toast) => { toastObj = toast as ToastComponent  }} id='toast_type' position={position} created={create.bind(this)} close={onclose.bind(this)} beforeOpen={onbeforeOpen.bind(this)} ></ToastComponent>
                ))}
        </ul>
    </>
}
