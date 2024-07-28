import { MessageComponent } from "@syncfusion/ej2-react-notifications";
import { useLocalizer } from "../../../../../core/Localization";
import { useAppDispatch, useAppSelector } from "../../../../../core/hooks/core-hooks";
import { useGlobalAppContext } from "../../../../../core/hooks/use-app-context";
import { sendPinCode } from "../../../../../store-management/actions/accounts/accounts-actions";
import { VerificationTypeEnum } from "../../../../../core/enums/enums-core";
import Button from "../../../../../components/form/Button";

const DemandPinCodeStep = () => {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  
  const dispatch = useAppDispatch();
  const sendPin = useAppSelector(state=>state.sendPinCode)
  const { claims } = useGlobalAppContext();

  const name = claims?.get("name");
  
  const SendPinCode = () => {
    dispatch(
      sendPinCode({
        userName: name,
        verificationType: VerificationTypeEnum.FOR_IDENTITY_VERIFICATION,
      } as SendPinCodeCommand)
    );
  };
  return (
    <>
      <div className="user-mid-help mx-auto my-auto text-left flex flex-col gap-5 w-full card-componen">
        {sendPin.Errors &&
          sendPin.Errors.length > 0 &&
          sendPin.Errors.map((message, key) => {
            return (
              <MessageComponent
                showCloseIcon
                id="msg_error"
                className="errorServer"
                content={message}
                key={key}
                severity="Error"
              ></MessageComponent>
            );
          })}
        <p className="text-lg">{commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_SENDIND_HELP")}</p>
        <div className="btns flex flex-col gap-2 justify-between mt-auto">
          <Button
            param={{
              type: "button",
              css: (sendPin.pending&&"disabled") + " okBtn px-5 py-1 mt-14 col-span-2 min-h-12 rounded-md mx-auto xxs:w-full",
              name: commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_SENDIND_PIN_CODE_GET_THE_CODE"),
              disabled: sendPin.pending,
              handleClick: SendPinCode,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DemandPinCodeStep;
