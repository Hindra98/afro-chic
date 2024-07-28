import { Navigate } from "react-router-dom";
import "../../../../styles/_confirm-pin-code.scss";
import { useEffect, useState } from "react";
import { MessageComponent } from "@syncfusion/ej2-react-notifications";
import { AuthenticationConstants } from "../../../../core/constants/authentication-contants";
import { useLocalizer } from "../../../../core/Localization";
import { getStorage } from "../../../../core/storage/storage";
import { useAppDispatch, useAppSelector } from "../../../../core/hooks/core-hooks";
import { useGlobalAppContext } from "../../../../core/hooks/use-app-context";
import { verifyPinCode } from "../../../../store-management/actions/oauth/oauth-actions";
import { VerificationTypeEnum } from "../../../../core/enums/enums-core";
import { sendPinCode } from "../../../../store-management/actions/accounts/accounts-actions";
import Button from "../../../../components/form/Button";

const VerifyIdentity = () => {
  const token = getStorage<string>(AuthenticationConstants.ACCESS_TOKEN);

  const commonLocalizer = useLocalizer("Common-ResCommon");

  const dispatch = useAppDispatch();
  const authResultSuccess = useAppSelector((state) => state.authenticatedUser.value);
  const verifyPinCodeState = useAppSelector(state => state.verifyPinCode);
  const isVerified = useAppSelector(state => state.verifyPinCode.value.isVerified);
  const initialValues: string[] = [];
  if(initialValues.length !== authResultSuccess.pinLength) {
    for(let i = 0; i < authResultSuccess.pinLength; i++) {
      initialValues.push("")
    }
  }
  
  const [confirmationKey, setConfirmationKey] = useState(initialValues);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const { claims } = useGlobalAppContext();

  useEffect(() => {
    let cpt: number = 0;
    confirmationKey.forEach((value) => {
      if (!value) cpt += 1;
    });
    setBtnDisabled(!(cpt === 0))
  }, [confirmationKey]);

  if(error && verifyPinCodeState.Errors.length > 0) {
    setConfirmationKey(initialValues)
    setError(false)
    document.getElementById("pin_code_0".toString())?.focus();
  }

  if (token || isVerified) return <Navigate to={"/dashboard"} replace />;
  else if (!authResultSuccess.token) return <Navigate to={"/"} replace />;

  const name = claims?.get("name");
  const contactMedia = claims?.get("contactmedia");

  const handleSubmit = (e) => {
    e.preventDefault();
    const pin = confirmationKey.join("");
    if (pin.length === authResultSuccess.pinLength) {
      setError(true);
      dispatch(verifyPinCode({ pin: pin, auth: authResultSuccess, verificationType: VerificationTypeEnum["FOR_IDENTITY_VERIFICATION"] } as VerifyIdentityCommand));
    }
  };

  const handleSendPinCode = (e) => {
    e.preventDefault();
    let cpt = 30;
    const handleSendPinCodeEvent = setInterval(() => {
      setMsg(`${commonLocalizer("MODULES_COMMON_Authentication_In")} ${cpt}s`); cpt -= 1;
      if (cpt === -1) { clearInterval(handleSendPinCodeEvent); setMsg(""); }
    }, 1000);

    dispatch(sendPinCode({ userName: name, verificationType: VerificationTypeEnum["FOR_IDENTITY_VERIFICATION"] } as SendPinCodeCommand));
  };

  const invalidChar = (e) => {
    if ( e.keyCode === 69 || e.keyCode === 107 || e.keyCode === 109 || e.keyCode === 110 || e.keyCode === 229 || e.keyCode === 187 || e.keyCode === 188 || e.keyCode === 189 || e.keyCode === 190) {
        e.target.value = e.target.value.replace(/[e+-,.]/, "");
        e.key=""
        e.preventDefault();
        return false;
    }
  }

  const changeFocus = (e, key: number) => {
    if ((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8) {
      let tab = [];
      confirmationKey.map((value) => tab.push(value));

      if ((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58)) {
        if (e.key >= 0 && e.key < 10) {
          tab[key] = e.key;
          setConfirmationKey(tab);
          if (key < confirmationKey.length-1)
            document.getElementById("pin_code_" + (key + 1).toString())?.focus();
        }
      } else {
        tab[key] = "";
        setConfirmationKey(tab);
        if (key > 0)
          document.getElementById("pin_code_" + (key - 1).toString())?.focus();
      }
    } else if (e.keyCode === 37 || e.keyCode === 39) {
        if (key >= 0 && key <= confirmationKey.length-1) {
            if (e.keyCode === 37)
              document.getElementById("pin_code_" + (key - 1).toString())?.focus();
            else document.getElementById("pin_code_" + (key + 1).toString())?.focus();
        }
    } else e.keyCode === 13 && !btnDisabled && handleSubmit(e);
  };
  
  window.document.title = commonLocalizer("MODULE_COMMON_AUTHENTICATION_VERIFY_PIN_CODE");
  return (
    <>
      <div className="form-confirmation return-login-page bg-white rounded-xl py-4 h-full min-h-[300px] xl:w-1/4 lg:w-1/3 xl:px-12 xmd:w-2/5 xmd:px-8 md:w-1/2 sm:w-3/5 sm:px-5 xxs:w-5/6 text-center">
        <h1 className="text-3xl align-top text-center my-4">{commonLocalizer("MODULE_COMMON_AUTHENTICATION_VERIFY_PIN_CODE")}</h1>
        
       {verifyPinCodeState.Errors && verifyPinCodeState.Errors.length > 0 && (
         <div className="w-5/6 mx-auto mb-2">
           {verifyPinCodeState.Errors.map((message, key) => {
              return (<MessageComponent id="msg_error" className="errorServer" content={message} key={key} severity="Error"></MessageComponent>);
           })}
         </div>
       )}
       
        <form className="flex flex-col justify-center items-stretch gap-3 h-full w-full mx-auto my-4">
          <div className="emial text-center">
            <p>{commonLocalizer("MODULE_COMMON_AUTHENTICATION_ENTER_CODE_YOU_RECEIVED_AT")}</p>
            <p className="border rounded-lg py-2 w-3/5 mx-auto my-3 border-gray-700 opacity-50">
              {contactMedia}
            </p>
          </div>
          <div className="input w-full mx-auto">
            <div className="grid grid-flow-col justify-stretch my-5 w-3/4 mx-auto">
              {initialValues?.map((value, key) => {
                return (
                  <div key={key}>
                    <input
                      type="password"
                      autoFocus={key === 0}
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
                      placeholder={(key + 1).toString()}
                      onChange={() => {}}
                      onKeyDown={invalidChar}
                      onKeyUp={(e) => changeFocus(e, key)}
                      className="pincode-input rounded-lg text-center py-2"
                    />
                  </div>
                );
              })}
            </div>

            <div className="resend_code text-center mt-6 my-2">
              <a href="."
                className={msg === "" ? "link p-0 m-0 border-none" : "link p-0 m-0 border-none disabled"}
                onClick={handleSendPinCode}
              >
                {commonLocalizer("MODULE_COMMON_AUTHENTICATION_RESEND_PIN_CODE")} {msg}
              </a>
            </div>
          </div>
          <Button
            param={{
              type: "submit",
              disabled: btnDisabled || verifyPinCodeState.pending,
              css:
                ((btnDisabled || verifyPinCodeState.pending) && "disabled") + " okBtn px-5 py-3 mx-auto w-full h-12",
              name: commonLocalizer("MODULE_COMMON_AUTHENTICATION_VERIFY"),
              handleClick: handleSubmit,
            }}
          />
        </form>
      </div>
    </>
  );
};

export default VerifyIdentity;
