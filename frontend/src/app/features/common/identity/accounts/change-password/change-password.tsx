import { useEffect, useState } from "react";
import "../../../../../styles/_change-password.scss";
import VerifyUserIdentityByPinCode from "./verify-user-identity";
import DemandPinCodeStep from "./demand-pin-code";
import ChangePasswordStep from "./change-password-step";
import { useLocalizer } from "../../../../../core/Localization";
import { useAppSelector } from "../../../../../core/hooks/core-hooks";
import { getStorage } from "../../../../../core/storage/storage";
import { WasPinCodeSent } from "../../../../../core/constants/common-constants";
import { ClasseName } from "../../../../../core/constants/class-name";
import Breadcrumb from "../../../../../components/shared/breadcrumb";
import OperationResultComponent from "../../../../../components/shared/operation-result-component";
import { MultiStepForm } from "../../../../../components/shared/multi-step";
import "../../../../../styles/_confirm-pin-code.scss";

function ChangePassword() {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  const changePasswordErrorMessages = useAppSelector((state) => state.changePassword.Errors);
  const changePasswordSuccessMessage: string = useAppSelector((state) => state.changePassword.value.message);
  const verifyPin = useAppSelector((state) => state.verifyPinCode);
  const sendPinCodeResult = useAppSelector((state) => state.sendPinCode);

  const [isAcceptChangePasswordDone, setIsAcceptChangePasswordDone] = useState<boolean>(JSON.parse(getStorage<string>(WasPinCodeSent.FOR_PASSWORD_CHANGE)));
  const [isVerifiedDone, setIsVerifiedDone] = useState(JSON.parse(getStorage<string>("is_verified")));
  useEffect(() => {
    setIsVerifiedDone(JSON.parse(getStorage<string>("is_verified")));
  }, [verifyPin.pending]);

  useEffect(() => {
    setIsAcceptChangePasswordDone(
      JSON.parse(getStorage<string>(WasPinCodeSent.FOR_PASSWORD_CHANGE))
    );
  }, [sendPinCodeResult.pending]);

  window.document.title = commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_TITLE");

  return (
    <div className="h-full flex flex-col justify-between change-password w-full">
      <div className={` ${ClasseName.TITLE} `}>
        <h1 className="">{commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_TITLE")}</h1>
        <Breadcrumb items={[{ title: commonLocalizer("MODULE_COMMON_SIDEBAR_DASHBOARD"), link: "/dashboard" }, { title: commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_TITLE") }]} />
      </div>
      {changePasswordSuccessMessage && changePasswordErrorMessages.length === 0 ? (
      <div className="user-mid-help change-password-result mx-auto xl:w-2/5 lg:w-3/5 xmd:w-3/5 sm:w-4/5 xxs:w-full">
        <OperationResultComponent
          message={changePasswordSuccessMessage}
          title={commonLocalizer("MODULES_Common_Change_Password_success")}
          titleButton={commonLocalizer("MODULE_COMMON_PAGE_NOT_FOUND_BACK_TO_HOME")}
          linkButton="/dashboard"
        />
      </div>
      ) : (
      <div className={` ${ClasseName.CARD_COMPONENT_FORM} pb-10 `}>
        <div className={` ${ClasseName.CARD_COMPONENT} `}>
          <MultiStepForm
            param={[
              {
                title: commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_SENDIND_PIN_CODE_TITLE"),
                component: (<DemandPinCodeStep />),
                isActive: !isVerifiedDone && (!isAcceptChangePasswordDone || (sendPinCodeResult.Errors && sendPinCodeResult.Errors.length > 0))
              },
              {
                title: commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_VERIFY_TITLE"),
                component: (<VerifyUserIdentityByPinCode focus={!isVerifiedDone && !(!isAcceptChangePasswordDone || (sendPinCodeResult.Errors && sendPinCodeResult.Errors.length > 0))} />),
                isActive: !isVerifiedDone && !(!isAcceptChangePasswordDone || (sendPinCodeResult.Errors && sendPinCodeResult.Errors.length > 0))
              },
              {
                title: commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_CHANGE_TITLE"),
                component: (<ChangePasswordStep />),
                isActive: isVerifiedDone
              },
            ]}
          />
        </div>
      </div>
      )}

    </div>
  );
}

export default ChangePassword;
