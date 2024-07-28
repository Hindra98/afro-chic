import { PropsWithChildren, useEffect, useState } from "react";

import imgVerifyEmail from "../../../../../assets/images/confirm-email.svg";
import imgVerifyNumber from "../../../../../assets/images/confirm-phone.svg";

import logoHeaderCard from "../../../../../assets/images/";
import { useLocalizer } from "../../../../../core/Localization";
import { useAppDispatch, useAppSelector } from "../../../../../core/hooks/core-hooks";
import { useGlobalAppContext } from "../../../../../core/hooks/use-app-context";
import { sendPinCode, verifyNewContactMedia } from "../../../../../store-management/actions/accounts/accounts-actions";
import { VerificationTypeEnum } from "../../../../../core/enums/enums-core";
import cardHeader from "../../../../../components/shared/card/card-header";
import cardFooter from "../../../../../components/shared/card/card-footer";
import Card from "../../../../../components/shared/card/card-component";
import { ClasseName } from "../../../../../core/constants/class-name";
import Button from "../../../../../components/form/Button";

type Props = PropsWithChildren<{
  contactMediaKey: "email" | "SMS";
  closeDialog?: () => void;
  returnPrevious?: () => void;
}>;

const VerifyUserIdentityByPinCodeComponent = ({
  contactMediaKey,
  closeDialog,
  returnPrevious,
}: Props) => {
  const commonLocalizer = useLocalizer("Common-ResCommon");

  const dispatch = useAppDispatch();

  const verifNewContactMediaErrorMessages = useAppSelector((state) => state.verifyNewContactMedia.Errors);
  const verifNewContactPending = useAppSelector((state) => state.verifyNewContactMedia.pending);
  const newContactMedia = useAppSelector((state) => state.sendPinCode.value.contactMedia);
  const getUserData = useAppSelector((state) => state.myProfileGetData);

  const initialValues = ["", "", "", "", "", ""];
  const [confirmationKey, setConfirmationKey] = useState(initialValues);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const { claims } = useGlobalAppContext();

  useEffect(() => {
    let cpt: number = 0;
    confirmationKey.forEach((value) => {
      if (!value) cpt += 1;
    });
    cpt === 0 ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [confirmationKey]);

  if(error && verifNewContactMediaErrorMessages.length > 0) {
    setConfirmationKey(initialValues)
    setError(false)
    document.getElementById("pin_code_0".toString())?.focus();
  }

  const name = claims?.get("name");
  const handleSubmitVerify2fa = (e) => {
    e.preventDefault();
    const pin = confirmationKey.join("");
    if (btnDisabled) {
      setError(true);
      handleErrorMessages([commonLocalizer("MODULE_COMMON_AUTHENTICATION_PIN_CODE_INCORRECT")]);
    } else {
      setError(true);
      dispatch(
        verifyNewContactMedia({
          pin: pin,
          verificationType: VerificationTypeEnum.FOR_INSTANT_VERIFICATION,
          NewContactMedia: newContactMedia,
          contactMediaKey: contactMediaKey,
        } as VerifyNewContactMediaCommand)
      );
    }
  };

  const handleSendPinCode = (e) => {
    e.preventDefault();
    let cpt = 30;
    const handleSendPinCodeEvent = setInterval(() => {
      setMsg(
        `${commonLocalizer("MODULE_COMMON_VERIFY_USER_IDENTITY_IN")} ${cpt}s`
      );
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
        contactMedia: (contactMediaKey === "SMS" ? getUserData.value.country.dialingCode : '')+newContactMedia,
        verificationType: VerificationTypeEnum.FOR_INSTANT_VERIFICATION,
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
          if (key < 5)
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
      if (key >= 0 && key <= 5) {
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
          <div className="error text-base -mt-2 mb-2" key={key}>
            {message}
          </div>
        )
      );
    return messageArray;
  };

  const verifyIdentityFooterLink = {
    name: commonLocalizer("MODULE_COMMON_MY_PROFILE_PRIVACY_AND_COOKIES"),
    css: "",
    disabled: false,
    href: "/privacy-cookies",
    target: "_blank",
  };
  const hVerifyIdentity = new cardHeader(
    "",
    logoHeaderCard,
    returnPrevious,
    closeDialog
  );
  const fVerifyIdentity = new cardFooter("", verifyIdentityFooterLink, null);

  return (
    <>
      <Card header={hVerifyIdentity} footer={fVerifyIdentity}>
        <div className="verify-contact w-2/3 mx-auto">
          {contactMediaKey === "SMS" ? (
            <img
              src={imgVerifyNumber}
              alt={commonLocalizer("MODULE_COMMON_MY_PROFILE_VERIFY_YOUR_PHONE_NUMBER")}
              className="mx-auto text-center"
            />
          ) : (
            <img
              src={imgVerifyEmail}
              alt={commonLocalizer("MODULE_COMMON_MY_PROFILE_VERIFY_YOUR_EMAIL_ADDRESS")}
              className="mx-auto text-center"
            />
          )}
        </div>
        <div className="description text-center w-8/12 mx-auto">
          <h2 className="text-center font-bold text-xl mb-2">
            {contactMediaKey === "SMS"
              ? commonLocalizer("MODULE_COMMON_MY_PROFILE_VERIFY_YOUR_PHONE_NUMBER")
              : commonLocalizer("MODULE_COMMON_MY_PROFILE_VERIFY_YOUR_EMAIL_ADDRESS")}
          </h2>
          <p className="text-sm text-gray-500">
            {commonLocalizer("MODULE_COMMON_MY_PROFILE_WELL_ONLY_USE_YOUR_PART_1")}{" "}
            {contactMediaKey === "SMS" ? commonLocalizer("MODULE_COMMON_MY_PROFILE_PHONE_NUMBER") : commonLocalizer("MODULE_COMMON_MY_PROFILE_EMAIL_ADDRESS")}{" "}
            {commonLocalizer("MODULE_COMMON_MY_PROFILE_WELL_ONLY_USE_YOUR_PART_2")}
          </p>
        </div>
        <hr className="mt-4" />
        <div className="form-fields w-full mx-auto h-full">
          <form className="flex flex-col justify-between gap-3 w-full mx-auto h-full">
            <div className="input-notify w-full">
              <p className={`font-bold text-base ${ClasseName.CARD_CODE}`}>
                {commonLocalizer("MODULE_COMMON_MY_PROFILE_CODE")}
              </p>
              <div className={`flex justify-between items-stretch my-2 ${ClasseName.CARD_CODE} lg:gap-3 xmd:gap-1 xl:w-1/2 lg:w-7/12 xmd:w-2/3 md:w-4/5 sm:w-11/12 xxs:w-full xxs:gap-0 `}>
                {initialValues.map((value, key) => {
                  return (
                    <div key={key}>
                      <input
                        type="password"
                        autoFocus={key === 0 && true}
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
                        onChange={() => {}}
                        onKeyDown={invalidChar}
                        placeholder={""}
                        onKeyUp={(e) => changeFocus(e, key)}
                        className="pincode-input rounded-lg text-center py-2"
                      />
                    </div>
                  );
                })}
              </div>

              <p className={`"text-sm mt-4 text-gray-500 ${ClasseName.CARD_CODE} me-2"`}>
              {verifNewContactMediaErrorMessages &&
                verifNewContactMediaErrorMessages.length > 0 &&
                handleErrorMessages(verifNewContactMediaErrorMessages)}

                {contactMediaKey === "email"
                  ? commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_EMAIL_SET_PIN_CODE_HELP")+" "
                  : commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_PHONE_NUMBER_SET_PIN_CODE_HELP") +
                    " +" + getUserData.value.country.dialingCode}{newContactMedia}
              </p>
              <p className={`text-sm my-1 text-gray-500 ${ClasseName.CARD_CODE}`}>
                {contactMediaKey === "email"
                  ? commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_EMAIL_SET_PIN_CODE_RESEND_1")
                  : commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_PHONE_NUMBER_SET_PIN_CODE_RESEND_1")}{" "}
                <a href="." className={`link p-0 m-0 get-code-again underline ${msg === "" ? "" : "disabled"}`} onClick={handleSendPinCode}>
                  {commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_EMAIL_SET_PIN_CODE_RESEND_2")}{" "}{msg}
                </a>
              </p>
            </div>
            <Button
              param={{
                type: "submit",
                disabled: btnDisabled || verifNewContactPending,
                css: ((btnDisabled || verifNewContactPending) && "disabled") + " okBtn px-5 py-3 mx-auto w-11/12 btn-verify my-2 h-12",
                name: commonLocalizer("MODULE_COMMON_VERIFY_USER_IDENTITY_VERIFY"),
                handleClick: handleSubmitVerify2fa,
              }}
            />
          </form>
        </div>
      </Card>
    </>
  );
};

export default VerifyUserIdentityByPinCodeComponent;
