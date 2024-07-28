import { PropsWithChildren, useState } from "react";
import * as Yup from "yup";
import InputWithIcon, { InputWithoutIcon } from "../../form/Input";
import Card from "../card/card-component";
import cardHeader from "../card/card-header";
import cardFooter from "../card/card-footer";
import logoHeaderCard from '../../../assets/images/orebiLogo.png'
import imgVerifyEmail from '../../../assets/images/confirm-email.svg'
import imgVerifyNumber from '../../../assets/images/confirm-phone.svg'
import { useLocalizer } from "../../../core/Localization";
import { useGlobalAppContext } from "../../../core/hooks/use-app-context";
import { useAppDispatch, useAppSelector } from "../../../core/hooks/core-hooks";
import { isEmail } from "../../../core/text/regex";
import { sendPinCode } from "../../../store-management/actions/accounts/accounts-actions";
import { VerificationTypeEnum } from "../../../core/enums/enums-core";

type Props = PropsWithChildren<{
  description?: JSX.Element | string;
  name: string;
  closeDialog?: ()=>void;
}>;

function ChangeContactMediaComponent({ description="", name, closeDialog }: Props) {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  const { claims } = useGlobalAppContext();
  const username = claims?.get("name");
  const dispatch = useAppDispatch();
  const getUserData = useAppSelector((state) => state.myProfileGetData);
  const sendPinCodeFailure: string[] = useAppSelector(state=>state.sendPinCode.Errors)
  const [userContactViewModel, setUserContactViewModel] = useState(name === 'SMS'? getUserData.value.payload.phoneNumber : getUserData.value.payload.email);
  const [errorsUserContact, setErrorsUserContact] = useState("");
  const [actu, setActu] = useState(false);
  
  const schemaContact = Yup.object().shape({
    contact: Yup.string(),
  });
  if((getUserData.value.payload.email && getUserData.value.payload.phoneNumber) && !getUserData.pending && !actu) {
    setActu(true);
    setUserContactViewModel(name === 'SMS' ? getUserData.value.payload.phoneNumber : getUserData.value.payload.email)
  }

  const handleChangeInputUserContact = (event) => {
    setErrorsUserContact("");
    const { value } = event.target;
    setUserContactViewModel(value);
  };
  
  const acceptChangeContactDone = async () => {
    setErrorsUserContact("");

    const values = await schemaContact.validate({ contact: userContactViewModel });

    if (
      values.contact === "" ||
      (name === "email" && !isEmail(values?.contact as string))
    ) {
      let contactError = "";
      if (name === "email" && !isEmail(values?.contact as string))
        contactError = commonLocalizer("MODULE_COMMON_EDIT_PROFILE_THIS_EMAIl_IS_NOT_VALID");
      if (values.contact === "") {
        if (name === "email") contactError = commonLocalizer("MODULE_COMMON_MY_PROFILE_MESSAGE_ERROR_EMAIL_REQUIRED");
        else contactError = commonLocalizer("MODULE_COMMON_MY_PROFILE_MESSAGE_ERROR_SMS_REQUIRED");
      }
      setErrorsUserContact(contactError);
    } else {
      dispatch(sendPinCode({ userName: username, contactMedia: userContactViewModel, dialingCode: getUserData.value.country.dialingCode, verificationType: VerificationTypeEnum.FOR_INSTANT_VERIFICATION } as SendPinCodeCommand));
    }
  };
  
  const handleErrorMessages = (error: string[]) => {
    const messageArray: React.ReactElement[] = [];
    error.length > 0 &&
      error.map((message, key) =>
        messageArray.push(
          <div className="error" key={key}>{message}</div>
        )
      );
    return messageArray;
  };
  
  const contactMediaFooterBtns = [
    {
      name: commonLocalizer("MODULE_COMMON_GET_PROFILE_CANCEL"),
      css: "cancelBtn",
      disabled: false,
      type: "button" as "submit" | "reset" | "button",
      handleClick: closeDialog,
    },
    {
      name: commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_EMAIL_GET_PIN_CODE"),
      css: "okBtn px-2 me-[4%]",
      disabled: false,
      type: "button" as "submit" | "reset" | "button",
      handleClick: acceptChangeContactDone,
    },
  ];
  const headerContactMedia = new cardHeader("", logoHeaderCard, null, closeDialog);
  const footerContactMedia = new cardFooter("", null, contactMediaFooterBtns);


  return (
    <Card header={headerContactMedia} footer={footerContactMedia}>
      <div className="verify-contact w-2/3 mx-auto">{name === 'SMS' ? <img src={imgVerifyNumber} alt={commonLocalizer("MODULE_COMMON_MY_PROFILE_VERIFY_YOUR_PHONE_NUMBER_IMG_ALT")} className="mx-auto text-center" /> : <img src={imgVerifyEmail} alt={commonLocalizer("MODULE_COMMON_MY_PROFILE_VERIFY_YOUR_EMAIL_ADDRESS_IMG_ALT")} className="mx-auto text-center" /> }</div>
      <div className="-mt-12 mb-5">
        <div className="user-mid-help w-11/12 mx-auto flex flex-col gap-3">{description}</div>
        <hr className="mb-8 w-11/12 mx-auto" />
        {name === 'email' ? (
          <>
          <p className="w-11/12 mx-auto flex flex-col gap-3 mb-2 text-gray-500">{commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_EMAIL_USER_MID_HELP_3")}</p>
          <InputWithIcon
            type="text"
            id='email'
            name='email'
            icon={`mail-alticon- pb-1 text-xl`}
            placeholder={commonLocalizer("MODULE_COMMON_EDIT_PROFILE_EMAIL")}
            className="w-11/12 mx-auto"
            value={userContactViewModel}
            onChange={handleChangeInputUserContact}
            eye={false}
          /></>
        ) : (
          <>
        <p className="w-11/12 mx-auto flex flex-col gap-3 mb-2">{commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_PHONE_NUMBER_USER_MID_HELP_3")}</p>
          <InputWithoutIcon
            type="text"
            id="SMS"
            name="SMS"
            textIn={"+" + getUserData.value.country.dialingCode}
            placeholder={commonLocalizer("MODULE_COMMON_EDIT_PROFILE_MY_PHONE_NUMBER")}
            className="w-11/12 mx-auto"
            value={userContactViewModel}
            onChange={handleChangeInputUserContact}
            eye={false}
          /></>
        )}
        <div className="error">
          {errorsUserContact && errorsUserContact.toString()}
        </div>
        {sendPinCodeFailure.length > 0 && handleErrorMessages(sendPinCodeFailure)}
      </div>
    </Card>
  );
}

export default ChangeContactMediaComponent;
