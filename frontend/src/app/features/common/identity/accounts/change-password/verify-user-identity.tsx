import { useEffect, useState } from "react";
import { MessageComponent } from "@syncfusion/ej2-react-notifications";
import { useLocalizer } from "../../../../../core/Localization";
import { useAppDispatch, useAppSelector } from "../../../../../core/hooks/core-hooks";
import { useGlobalAppContext } from "../../../../../core/hooks/use-app-context";
import { getStorage } from "../../../../../core/storage/storage";
import { verifyPinCode } from "../../../../../store-management/actions/oauth/oauth-actions";
import { VerificationTypeEnum } from "../../../../../core/enums/enums-core";
import { sendPinCode } from "../../../../../store-management/actions/accounts/accounts-actions";
import { FormatString } from "../../../../../core/text";
import Button from "../../../../../components/form/Button";
import "../../../../../styles/_confirm-pin-code.scss";

const VerifyUserIdentityByPinCode = ({focus}: {focus: boolean}) => {
  const commonLocalizer = useLocalizer("Common-ResCommon");

  const dispatch = useAppDispatch();

  const authResultSuccess = useAppSelector((state) => state.authenticatedUser.value);
  const verifPinCodeState = useAppSelector((state) => state.verifyPinCode);

  const initialValues: string[] = [];
  const [confirmationKey, setConfirmationKey] = useState(initialValues);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const { claims } = useGlobalAppContext();
  const pin_length = parseInt(getStorage<string>("pin_length"));

  if(initialValues.length !== pin_length) {
    for(let i = 0; i < pin_length; i++) {
      initialValues.push("")
    }
  }

  useEffect(() => {
    let cpt: number = 0;
    confirmationKey.forEach((value) => {
      if (!value) cpt += 1;
    });
    cpt === 0 ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [confirmationKey]);

  if(error && verifPinCodeState.Errors.length > 0) {
    setConfirmationKey(initialValues)
    setError(false)
    document.getElementById("pin_code_0".toString())?.focus();
  }

  const contactMedia = claims?.get("contactmedia");
  const name = claims?.get("name");

  const handleSubmitVerify2fa = (e) => {
    e.preventDefault();
    const pin = confirmationKey.join("");
    if (pin === "") {
      setError(true);
      handleErrorMessages([commonLocalizer("MODULE_COMMON_AUTHENTICATION_PIN_CODE_INCORRECT")]);
    } else {
      setError(true);
      dispatch(
        verifyPinCode({
          pin: pin,
          auth: authResultSuccess,
          verificationType: VerificationTypeEnum.FOR_IDENTITY_VERIFICATION,
        } as VerifyIdentityCommand)
      );
    }
  };

  const handleSendPinCode = (e) => {
    e.preventDefault();
    let cpt = 30;
    const handleSendPinCodeEvent = setInterval(() => {
      setMsg(`${commonLocalizer("MODULES_COMMON_Authentication_In")} ${cpt}s`);
      cpt -= 1;
      if (cpt === -1) {
        clearInterval(handleSendPinCodeEvent);
        setMsg("");
      }
    }, 1000);
    setConfirmationKey(initialValues);
    dispatch(
      sendPinCode({
        userName: name,
        contactMedia: contactMedia,
        verificationType: VerificationTypeEnum.FOR_IDENTITY_VERIFICATION,
      } as SendPinCodeCommand)
    );
  };

  const invalidChar = (e) => {
    if (
      e.keyCode === 69 ||
      e.keyCode === 107 ||
      e.keyCode === 109 ||
      e.keyCode === 110 ||
      e.keyCode === 229 ||
      e.keyCode === 187 ||
      e.keyCode === 188 ||
      e.keyCode === 189 ||
      e.keyCode === 190
    ) {
      e.target.value = e.target.value.replace(/[e+-,.]/, "");
      e.key = "";
      e.preventDefault();
      return false;
    }
  };

  const changeFocus = (e, key: number) => {
    setError(false);
    if (
      (e.keyCode > 95 && e.keyCode < 106) ||
      (e.keyCode > 47 && e.keyCode < 58) ||
      e.keyCode === 8
    ) {
      let tab = [];
      confirmationKey.map((value) => tab.push(value));

      if (
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58)
      ) {
        if (e.key >= 0 && e.key < 10) {
          tab[key] = e.key;
          setConfirmationKey(tab);
          if (key < confirmationKey.length)
            document
              .getElementById("pin_code_" + (key + 1).toString())
              ?.focus();
        }
      } else {
        tab[key] = "";
        setConfirmationKey(tab);
        if (key > 0)
          document.getElementById("pin_code_" + (key - 1).toString())?.focus();
      }
    } else if (e.keyCode === 37 || e.keyCode === 39) {
      if (key >= 0 && key <= confirmationKey.length) {
        if (e.keyCode === 37)
          document.getElementById("pin_code_" + (key - 1).toString())?.focus();
        else
          document.getElementById("pin_code_" + (key + 1).toString())?.focus();
      }
    } else e.keyCode === 13 && !btnDisabled && handleSubmitVerify2fa(e);
  };

  const handleErrorMessages = (error: string[]) => {
    const messageArray: React.ReactElement[] = [];
    error.length > 0 &&
      error.map((message, key) =>
        messageArray.push(
          <div className="error text-center w-full" key={key}>
            {message}
          </div>
        )
      );
    return messageArray;
  };
  useEffect(() => {
    focus && document.getElementById("pin_code_0")?.focus();
  }, [focus])

  window.document.title = commonLocalizer("MODULE_COMMON_AUTHENTICATION_VERIFY_PIN_CODE");

  return (
    <div className="h-full flex flex-col justify-between w-full">
      <div className="user-mid-help w-full mx-auto text-left flex flex-col gap-5">
        {verifPinCodeState.Errors &&
          verifPinCodeState.Errors.length > 0 &&
          verifPinCodeState.Errors.map((message, key) => {
            return (
              <MessageComponent
                showCloseIcon
                id="msg_error"
                className="errorServer m-1"
                content={message}
                key={key}
                severity="Error"
              ></MessageComponent>
            );
          })}
        <form className="flex flex-col justify-center items-stretch gap-3 w-full h-min mx-auto">
          <div className="input w-full">
          <p className="font-bold text-base py-2">{commonLocalizer("MODULE_COMMON_MY_PROFILE_CODE")}</p>
            <div className="flex flex-row justify-start gap-2 items-stretch my-2 flex-wrap">
              {initialValues?.map((value, key) => {
                return (
                  <div key={key}>
                    <input
                      type="password"
                      autoFocus={key === 0 && focus && true}
                      id={"pin_code_" + key.toString()}
                      name={"conf" + value.toString()}
                      key={key}
                      value={confirmationKey[key] ? confirmationKey[key] : ""}
                      minLength={0}
                      maxLength={1}
                      min={0}
                      max={9}
                      size={1}
                      autoComplete="off"
                      placeholder={''}
                      onChange={() => {}}
                      onKeyDown={invalidChar}
                      onKeyUp={(e) => changeFocus(e, key)}
                      className="pincode-input rounded-lg text-center py-2"
                    />
                  </div>
                );
              })}
            </div>

            {error &&
              verifPinCodeState.Errors &&
              verifPinCodeState.Errors.length > 0 &&
              handleErrorMessages(verifPinCodeState.Errors)}
              <p className="text-sm mt-4 text-gray-500 text-ellipsis overflow-hidden">
              {FormatString(commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_VERIFY_HELP_1"),
              contactMedia?.includes('@')?commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_VERIFY_HELP_12"):commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_VERIFY_HELP_11"),
              contactMedia?.includes('@')?commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_VERIFY_HELP_13"):commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_VERIFY_HELP_14")
              )}
              <span className="contact-media">{contactMedia}.</span><br/>{commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_VERYFY_HELP_2")}.
              </p>
              <p className="text-sm mb-1 mt-4 text-gray-500 resend_code">
              {FormatString(commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_VERYFY_PIN_CODE_Question"),
              contactMedia?.includes('@')?commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_VERYFY_PIN_CODE_Question_12"):commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_VERYFY_PIN_CODE_Question_11"))}
                <a href="." className={`link p-0 m-0 border-none ${ msg === "" ? "" : "disabled" }`} onClick={handleSendPinCode}>
                  {" "} {commonLocalizer("MODULE_COMMON_CHANGE_PASSWORD_VERYFY_TRY_AGAIN")} {msg}
                </a>
              </p>

          </div>
          <div className="btns flex flex-col gap-2 justify-between mt-auto">
            <Button
              param={{
                type: "button",
                disabled: btnDisabled || verifPinCodeState.pending,
                css: ((btnDisabled || verifPinCodeState.pending) && "disabled") + " okBtn px-5 py-1 mb- col-span-2 min-h-12 rounded-md mx-auto xxs:w-full",
                name: commonLocalizer("MODULE_COMMON_AUTHENTICATION_VERIFY"),
                handleClick: handleSubmitVerify2fa,
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyUserIdentityByPinCode;
