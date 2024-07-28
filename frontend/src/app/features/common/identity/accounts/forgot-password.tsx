import "../../../../styles/login.scss";
import * as Yup from "yup";
import { useState } from "react";
import { MessageComponent } from "@syncfusion/ej2-react-notifications";
import { Navigate } from "react-router-dom";
import { useLocalizer } from "../../../../core/Localization";
import { AuthenticationConstants } from "../../../../core/constants/authentication-contants";
import { useAppDispatch, useAppSelector } from "../../../../core/hooks/core-hooks";
import { getStorage } from "../../../../core/storage/storage";
import { isEmail } from "../../../../core/text/regex";
import { forgotPassword } from "../../../../store-management/actions/accounts/accounts-actions";
import OperationResultComponent from "../../../../components/shared/operation-result-component";
import Text from "../../../../components/form/Text";
import Button from "../../../../components/form/Button";

function ForgotPassword() {
  
  const commonLocalizer = useLocalizer("Common-ResCommon");
  const token = getStorage<string>(AuthenticationConstants.ACCESS_TOKEN);
  const dispatch = useAppDispatch();
  const forgotPasswordState = useAppSelector((state) => state.forgotPassword);
  const origin = window.location.origin;

  const schema = Yup.object().shape({
    subscriptionKey: Yup.string(),
    email: Yup.string(),
  });

  const [forgotPasswordViewModel, setForgotPasswordViewModel] = useState({
    subscriptionKey: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    subscriptionKey: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForgotPasswordViewModel({
      ...forgotPasswordViewModel,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ subscriptionKey: "", email: "" });

    const values = await schema.validate(forgotPasswordViewModel);

    if (values.email === "" || values.subscriptionKey === "" || !isEmail(values.email as string)) {
      let subscriptionKey = "", email = "";
      if (values.subscriptionKey === "") subscriptionKey = commonLocalizer("MODULES_Common_User_Validate_Command_Tenant_Required");
      if (!isEmail(values.email as string)) email = commonLocalizer("MODULES_Common_User_Validate_Command_Inavlid_Email");
      if (values.email === "") email = commonLocalizer("MODULES_Common_User_Validate_Command_Email_Required");

      setErrors({ subscriptionKey: subscriptionKey, email: email });
    } else {
      dispatch(await forgotPassword({...forgotPasswordViewModel, origin: origin} as ForgotPasswordCommand));
    }
  };

  if(token) { return <Navigate to={"/dashboard"} replace /> }
  
  window.document.title = commonLocalizer("MODULE_COMMON_FORGOT_PASSWORD_SCREEN_TITLE");

  return (
    <>
      {(forgotPasswordState.value.message && forgotPasswordState.value.message.length > 0 && forgotPasswordState.Errors.length === 0) ? (
        <div className="form-login bg-transparent rounded-xl h-full min-h-[200px] xl:w-1/4 lg:w-1/3 xl:px-12 xmd:w-2/5 xmd:px-8 md:w-1/2 sm:w-3/5 sm:px-5 xxs:w-5/6">
          <OperationResultComponent message={forgotPasswordState.value.message} title={commonLocalizer("MODULE_COMMON_FORGOT_PASSWORD_SCREEN_TITLE")} titleButton={commonLocalizer("MODULES_COMMON_Authentication_Passord_Reset_Check_Your_Email")} linkButton="" />
        </div>
      ) : (
        <div className="form-login return-login-page py-4 bg-white rounded-xl h-full min-h-[300px] xl:w-1/4 lg:w-1/3 xl:px-12 xmd:w-2/5 xmd:px-8 md:w-1/2 sm:w-3/5 sm:px-5 xxs:w-5/6">
          <h1 className="text-3xl align-top text-center py-4">{commonLocalizer("MODULE_COMMON_FORGOT_PASSWORD_SCREEN_TITLE")}</h1>

          {forgotPasswordState.Errors && forgotPasswordState.Errors.length > 0 && forgotPasswordState.value.message.length === 0 && (
              <div className="w-5/6 mx-auto mb-2">
                {forgotPasswordState.Errors.map((message, key) => {
                  return ( message.includes("401") ?
                    <MessageComponent id="msg_error" className="errorServer" content={"Le subscription key est errone"} key={key} severity="Error"></MessageComponent>
                    :
                    <MessageComponent id="msg_error" className="errorServer" content={message} key={key} severity="Error"></MessageComponent>
                  );
                })}
              </div>
            )}

          <form className="flex flex-col justify-center items-stretch gap-3 h-full w-5/6 mx-auto py-4" onSubmit={handleSubmit}>
            <div className="tenant flex-auto">
              <Text
                type="text"
                id="subscriptionKey"
                name="subscriptionKey"
                icon={"keyicon-"}
                placeholder={commonLocalizer("MODULE_COMMON_FORGOT_PASSWORD_SCREEN_SUBSCRPTION_KEY")}
                className="login-input w-full outline-none border-none"
                value={forgotPasswordViewModel.subscriptionKey}
                onChange={handleChange}
                eye={false}
              />
              {errors.subscriptionKey && (<div className="error">{errors.subscriptionKey.toString()}</div>)}
            </div>
            <div className="flex-auto">
              <Text
                type="email"
                id="email"
                name="email"
                icon={"e-user"}
                placeholder={commonLocalizer("MODULE_COMMON_FORGOT_PASSWORD_SCREEN_EMAIL")}
                className="login-input w-full outline-none border-none text-black"
                value={forgotPasswordViewModel.email}
                onChange={handleChange}
                eye={false}
              />
              {errors.email && (<div className="error">{errors.email.toString()}</div>)}
            </div>

            <div className="text-center my-3">
              {commonLocalizer("MODULE_COMMON_FORGOT_PASSWORD_SCREEN_YOU_WILL_RECEIVED_AN_EMAIL")}
            </div>
              
            <div className="accept-change-passwo flex flex-row justify-end gap-3 mt-auto">
              <Button param={{type: "submit", css: (forgotPasswordState.pending?"disabled":"")+" px-5 w-full rounded-md okBtn h-12", name: commonLocalizer("MODULE_COMMON_FORGOT_PASSWORD_SCREEN_SEND"), disabled: forgotPasswordState.pending}} />
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ForgotPassword;
