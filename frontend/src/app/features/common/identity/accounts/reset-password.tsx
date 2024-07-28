
import "../../../../styles/login.scss";
import * as Yup from "yup";
import { useState } from "react";
import { MessageComponent } from "@syncfusion/ej2-react-notifications";
import { Navigate, useLocation } from "react-router-dom";
import { useLocalizer } from "../../../../core/Localization";
import { getStorage } from "../../../../core/storage/storage";
import { useAppDispatch, useAppSelector } from "../../../../core/hooks/core-hooks";
import { extractParamsUrl } from "../../../../core/text/regex";
import { AuthenticationConstants } from "../../../../core/constants/authentication-contants";
import { resetPassword } from "../../../../store-management/actions/accounts/accounts-actions";
import Text from "../../../../components/form/Text";
import Button from "../../../../components/form/Button";
import OperationResultComponent from "../../../../components/shared/operation-result-component";

const ResetPassword = () => {
  
  const commonLocalizer = useLocalizer("Common-ResCommon");
  const token = getStorage<string>(AuthenticationConstants.ACCESS_TOKEN);
  const dispatch = useAppDispatch();
  const resetPasswordState = useAppSelector((state) => state.resetPassword);

  const { search } = useLocation();

  const params = extractParamsUrl(search);

  const schema = Yup.object().shape({
    password: Yup.string(),
    passwordConfirmation: Yup.string(),
  });

  const [resetPasswordViewModel, setResetPasswordViewModel] = useState({
    token: params["token"],
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState({
    passwordConfirmation: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setResetPasswordViewModel({
      ...resetPasswordViewModel,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ password: "", passwordConfirmation: "" });

    const values = await schema.validate(resetPasswordViewModel);

    if (values.password === "" || values.passwordConfirmation !== values.password) {
      let password = "", passwordConfirmation = "";
      if (values.password === "") password = commonLocalizer("MODULES_Common_User_Validate_Command_Password_Required");
      if (values.passwordConfirmation !== values.password) passwordConfirmation = commonLocalizer("MODULES_Common_User_Validate_Command_Password_No_Match");

      setErrors({
        passwordConfirmation: passwordConfirmation,
        password: password,
      });
    } else {
      dispatch(await resetPassword({...resetPasswordViewModel, tenantId: params["tenantId"]} as ResetPasswordCommand));
    }
  };
  if(token) {
    return <Navigate to={"/dashboard"} replace />
  }
  
  window.document.title = commonLocalizer("MODULE_COMMON_RESET_PASSWORD_SCREEN_TITLE");

  return (
    <>
        { (resetPasswordState.value.message && resetPasswordState.value.message.length > 0 && resetPasswordState.Errors.length === 0) ? (
          <div className="form-login bg-transparent rounded-xl h-full min-h-[200px] xl:w-1/4 lg:w-1/3 xl:px-12 xmd:w-2/5 xmd:px-8 md:w-1/2 sm:w-3/5 sm:px-5 xxs:w-5/6">
            <OperationResultComponent message={resetPasswordState.value.message} title={commonLocalizer("MODULES_COMMON_Authentication_Passord_Reset_Successful")} titleButton={commonLocalizer("MODULES_COMMON_Authentication_Passord_Reset_Go_To_Login_Page")} linkButton="/" />
          </div>
        ) : (
          <div  className="form-login bg-white rounded-xl py-4 h-full min-h-[300px] xl:w-1/4 lg:w-1/3 xl:px-12 xmd:w-2/5 xmd:px-8 md:w-1/2 sm:w-3/5 sm:px-5 xxs:w-5/6">
            <h1 className="text-3xl align-top text-center my-4 py-2">
              {commonLocalizer("MODULE_COMMON_RESET_PASSWORD_SCREEN_TITLE")}
            </h1>

            {resetPasswordState.Errors && resetPasswordState.Errors.length > 0 && resetPasswordState.value.message.length === 0 && (
                <div className="w-5/6 mx-auto mb-2">
                  {resetPasswordState.Errors.map((message, key) => {
                    return (
                      <MessageComponent id="msg_error" className="errorServer" content={message} key={key} severity="Error"></MessageComponent>
                    );
                  })}
                </div>
              )}

            <form className="flex flex-col justify-center items-stretch gap-3 w-5/6 mx-auto my-4" onSubmit={handleSubmit}>
              <div className="password flex-auto">
                <Text
                  type="password"
                  id="password"
                  name="password"
                  icon={"e-lock"}
                  placeholder={commonLocalizer("MODULE_COMMON_RESET_PASSWORD_SCREEN_NEW_PASSWORD")}
                  className="login-input w-full outline-none border-none"
                  value={resetPasswordViewModel.password}
                  onChange={handleChange}
                  eye={true}
                />
                {errors.password && (<div className="error">{errors.password.toString()}</div>)}
              </div>
              <div className="confirm-password flex-auto">
                <Text
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  icon={"e-lock"}
                  placeholder={commonLocalizer("MODULE_COMMON_RESET_PASSWORD_SCREEN_CONFIRM_NEW_PASSWORD")}
                  className="login-input w-full outline-none border-none"
                  value={resetPasswordViewModel.passwordConfirmation}
                  onChange={handleChange}
                  eye={true}
                />
                {errors.passwordConfirmation && (<div className="error">{errors.passwordConfirmation.toString()}</div>)}
              </div>

              <div className="text-center my-3">
                {commonLocalizer("MODULE_COMMON_RESET_PASSWORD_SCREEN_YOU_WILL_RECEIVED_AN_EMAIL")}.
              </div>

              <Button param={{type: "submit", css: (resetPasswordState.pending?"disabled":"")+" px-5 py-3 rounded-md mx-auto  w-full", name: commonLocalizer("MODULE_COMMON_RESET_PASSWORD_SCREEN_SEND"), disabled: resetPasswordState.pending}} />
                
            </form>
          </div>
        )}
      </>
  );
};

export default ResetPassword;
