import { MessageComponent } from '@syncfusion/ej2-react-notifications';
import { useState } from 'react'
import * as Yup from "yup";
import { useLocalizer } from '../../../../../core/Localization';
import { useAppDispatch, useAppSelector } from '../../../../../core/hooks/core-hooks';
import { useGlobalAppContext } from '../../../../../core/hooks/use-app-context';
import { changePassword } from '../../../../../store-management/actions/accounts/accounts-actions';
import InputWithIcon from '../../../../../components/form/Input';
import Button from '../../../../../components/form/Button';

const ChangePasswordStep = () => {
  
  const commonLocalizer = useLocalizer("Common-ResCommon");
  const dispatch = useAppDispatch();
  
  const changePasswordErrorMessages = useAppSelector((state) => state.changePassword.Errors);
  const changePasswordSuccessMessage: string = useAppSelector((state) => state.changePassword.value.message);
  const changePasswordPending = useAppSelector((state) => state.changePassword.pending)
  
  const { claims } = useGlobalAppContext();

  const nameIdentifier = claims?.get("nameidentifier");

  const schema = Yup.object().shape({
    currentPassword: Yup.string(),
    newPassword: Yup.string(),
    newPasswordConfirmation: Yup.string(),
  });

  const [changePasswordViewModel, setChangePasswordViewModel] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [errorsChangePassword, setErrorsChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  
  const handleChangeInputChangePassword = (event) => {
    const { name, value } = event.target;

    setChangePasswordViewModel({
      ...changePasswordViewModel,
      [name]: value,
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrorsChangePassword({
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    });

    const values = await schema.validate(changePasswordViewModel);

    if (
      values.currentPassword === "" ||
      values.newPassword === "" ||
      values.newPassword !== values.newPasswordConfirmation
    ) {
      let currentPassword = "", newPassword = "", passwordConfirmation = "";
      if (values.currentPassword === "")
        currentPassword = commonLocalizer("MODULES_Common_User_Validate_Command_Password_Required");
      if (values.newPassword === "")
        newPassword = commonLocalizer("MODULES_Common_User_Validate_Command_Password_Required");
      if (values.newPassword !== values.newPasswordConfirmation)
        passwordConfirmation = commonLocalizer("MODULES_Common_User_Validate_Command_Password_No_Match");

      setErrorsChangePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
        newPasswordConfirmation: passwordConfirmation,
      });
    } else {
      dispatch(
        await changePassword({
          ...changePasswordViewModel,
          key: nameIdentifier,
        } as ChangePasswordCommand)
      );
    }
  };



  return (
    <>
      <div className="user-mid-help mx-auto text-left flex flex-col gap-5 w-full card-componen">
      {changePasswordErrorMessages &&
        changePasswordErrorMessages.length > 0 &&
        changePasswordSuccessMessage.length === 0 &&
        changePasswordErrorMessages.map((message, key) => {
          return (
            <div className="w-full mx-auto mb-4">
              <MessageComponent
                showCloseIcon
                id="msg_error"
                className="errorServer m-1"
                content={message}
                key={key}
                severity="Error"
              ></MessageComponent>
            </div>
          );
        })}
        <div className="user-mid-help w-full text-left flex flex-col gap-5">
          <p className='font-bold'>{commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_CHOOSE_A_SECURE_PASSWORD")}</p>
          <p>{commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_YOU_MAY_BE_DISCONNECTED")}</p>
          <p>
            <b>{commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_PASSWORD_SECURITY_LEVEL")}:{" "}</b>
            {commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_DO_NOT_CHOOSE_USED_PASSWORD")}
          </p>
        </div>

        <form className="flex flex-col justify-center w-full items-stretch gap-4 mx-auto mt-4 mb-2">
          <div className="password flex flex-col gap-2 justify-between">
            <label htmlFor="currentPassword">
              {commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_CURRENT_PASSWORD")}
            </label>
            <InputWithIcon
              type="password"
              id="currentPassword"
              name="currentPassword"
              icon={"e-lock"}
              placeholder={commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_CURRENT_PASSWORD")}
              className=""
              value={changePasswordViewModel.currentPassword}
              onChange={handleChangeInputChangePassword}
              eye={true}
            />
            {errorsChangePassword.currentPassword && (<div className="error">{errorsChangePassword.currentPassword.toString()}</div>)}
          </div>
          <div className="password flex flex-col gap-2 justify-between">
            <label htmlFor="newPassword">
              {commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_NEW_PASSWORD")}
            </label>
            <InputWithIcon
              type="password"
              id="newPassword"
              name="newPassword"
              icon={"e-lock"}
              placeholder={commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_NEW_PASSWORD")}
              className=""
              value={changePasswordViewModel.newPassword}
              onChange={handleChangeInputChangePassword}
              eye={true}
            />
            {errorsChangePassword.newPassword && (<div className="error">{errorsChangePassword.newPassword.toString()}</div>)}
          </div>
          <div className="confirm-password flex flex-col gap-2 justify-between">
            <label htmlFor="newPasswordConfirmation">
              {commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_CONFIRM_NEW_PASSWORD")}
            </label>
            <InputWithIcon
              type="password"
              id="newPasswordConfirmation"
              name="newPasswordConfirmation"
              icon={"e-lock"}
              placeholder={commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_CONFIRM_NEW_PASSWORD")}
              className=""
              value={changePasswordViewModel.newPasswordConfirmation}
              onChange={handleChangeInputChangePassword}
              eye={true}
            />
            {errorsChangePassword.newPasswordConfirmation && (<div className="error">{errorsChangePassword.newPasswordConfirmation.toString()}</div>)}
          </div>

          <div className="btns flex flex-col gap-2 pt-6 justify-between mt-auto">
            <Button
              param={{
                type: "button",
                css: (changePasswordPending&&"disabled") + " okBtn px-5 py-1 mb- col-span-2 min-h-12 rounded-md mx-auto text-ellipsis overflow-hidden xxs:w-full",
                name: commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_BTN_MODIFY_PASSWORD_TEXT"),
                disabled: changePasswordPending,
                handleClick: handleChangePassword,
              }}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default ChangePasswordStep