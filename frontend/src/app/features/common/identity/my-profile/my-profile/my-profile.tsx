
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { MessageComponent } from "@syncfusion/ej2-react-notifications";
import EditPicture from "./edit-picture";
import { useLocalizer } from "../../../../../core/Localization";
import { useAppDispatch, useAppSelector } from "../../../../../core/hooks/core-hooks";
import { getMyProfile, updateMyProfile } from "../../../../../store-management/actions/myprofile/my-profil-actions";
import { useGlobalAppContext } from "../../../../../core/hooks/use-app-context";
import { isEmpty } from "../../../../../core/text/is-empty";
import { WasPinCodeSent } from "../../../../../core/constants/common-constants";
import { getStorage } from "../../../../../core/storage/storage";
import { ContactType } from "../../../../../core/enums/enums-core";
import OperationResultComponent from "../../../../../components/shared/operation-result-component";
import Breadcrumb from "../../../../../components/shared/breadcrumb";
import { ClasseName } from "../../../../../core/constants/class-name";
import { ShimmerBox, ShimmerText } from "../../../../../components/shared/shimmer";
import InputWithIcon from "../../../../../components/form/Input";
import ContactMediaVerificationDialog from "../../../../../components/shared/dialog-components/contact-media-verification-dialog";
import Button from "../../../../../components/form/Button";
import "../../../../../styles/_user-profile.scss";

function MyProfile() {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  const navigate = useNavigate();
  
  const [picture, setPicture] = useState<File>(null);
  
  const dispatch = useAppDispatch();
  const updateDataMyProfile = useAppSelector((state) => state.myProfile);
  const getUserData = useAppSelector((state) => state.myProfileGetData);
  const changeEmailResult = useAppSelector(state=> state.changeEmail)
  const changePhoneNumberResult = useAppSelector(state=> state.changePhoneNumber);

  
  const [getUne, setGetUne] = useState(false);

  const getDataUser = () => {
    dispatch(getMyProfile(""));
  };

  if (!getUne && !getUserData.pending && getUserData.Errors.length === 0) {
    getDataUser();
    setGetUne(true);
  }

  
  const { claims } = useGlobalAppContext();
  const fullName = claims?.get("fullname");

  const username = !isEmpty(fullName as string) ? fullName : claims?.get("name");

  
  const sendPinCodeMessages = useAppSelector(state => state.sendPinCode);
  
  const schema = Yup.object().shape({
    firstName: Yup.string(),
    middleName: Yup.string().nullable(),
    lastName: Yup.string(),
    idCardNumber: Yup.string(),
    isUserConsentEmailNotification: Yup.boolean(),
    isUserConsentSmsNotification: Yup.boolean(),
    choosenNotificationChannel: Yup.string(),
  });

  const [actu, setActu] = useState(false);
  const [isAcceptChangeEmailDone, setIsAcceptChangeEmailDone] = useState(JSON.parse(getStorage<string>(WasPinCodeSent.FOR_EMAIL_CHANGE)));
  const [isAcceptChangePhoneDone, setIsAcceptChangePhoneDone] = useState(JSON.parse(getStorage<string>(WasPinCodeSent.FOR_PHONE_NUMBER_CHANGE)));

  const paramsForEmail = {
    value: getUserData.value.payload.email,
    dialogLabel: commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_EMAIL_ADDRESS"),
  }
  const inputParamsForEmail = {
    name: ContactType.EMAIL,
  }
  const dialogComponentForEmail = {
    description: <><p className="font-bold text-2xl text-center text-black">{commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_EMAIL_USER_MID_HELP_1")}</p>
        <p className="text-sm text-center pb-5 ">{commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_EMAIL_USER_MID_HELP_2")}</p>
      </>,
    isAcceptChangeDone: isAcceptChangeEmailDone,
    changeIsAcceptChangeDone: setIsAcceptChangeEmailDone,
    changeContactResult: changeEmailResult,
    sendPinCodeMessages: sendPinCodeMessages
  }

  
  const paramsForPhoneNumber = {
    value: getUserData.value.country.dialingCode + getUserData.value.payload.phoneNumber,
    dialogLabel: commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_PHONE_NUMBER"),
  }
  const inputParamsForPhoneNumber = {
    name: ContactType.SMS,
    dialingCode: getUserData.value.country.dialingCode
  }
  const dialogComponentForPhoneNumber = {
    description: <>
        <p className="font-bold text-2xl text-center text-black">{commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_PHONE_NUMBER_USER_MID_HELP_1")}</p>
        <p className="text-sm text-center pb-5 ">{commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_PHONE_NUMBER_USER_MID_HELP_2")}</p>
      </>,
    isAcceptChangeDone: isAcceptChangePhoneDone,
    changeIsAcceptChangeDone: setIsAcceptChangePhoneDone,
    changeContactResult: changePhoneNumberResult,
    sendPinCodeMessages: sendPinCodeMessages,
    getProfil: getUserData.value
  }

  const [userProfileViewModel, setUserProfileViewModel] = useState({
    firstName: getUserData.value.payload.firstName,
    middleName: getUserData.value.payload.middleName,
    lastName: getUserData.value.payload.lastName,
    idCardNumber: "",
    isUserConsentEmailNotification: true,
    isUserConsentSmsNotification: true,
    choosenNotificationChannel: "sms",
  });
  const [errorsUserProfile, setErrorsUserProfile] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    idCardNumber: "",
    choosenNotificationChannel: "",
  });
  
  const [userContactViewModel, setUserContactViewModel] = useState({
    email: getUserData.value.payload.email || "",
    phoneNumber: getUserData.value.payload.phoneNumber || ""
  });

  if((getUserData.value.payload.firstName || getUserData.value.payload.middleName || getUserData.value.payload.lastName) && !getUserData.pending && !actu) {
    setActu(true);
    setUserProfileViewModel({...userProfileViewModel, firstName: getUserData.value.payload.firstName, middleName: getUserData.value.payload.middleName, lastName: getUserData.value.payload.lastName})
  }
  if((getUserData.value.payload.email && getUserData.value.payload.phoneNumber) && !getUserData.pending && !actu) {
    setActu(true);
    setUserContactViewModel({...userContactViewModel, email: getUserData.value.payload.email, phoneNumber: getUserData.value.payload.phoneNumber})
  }
  
  const returnPreviousPage = () => {
    navigate(-1);
  };
  
  const handleChangeInputUserProfile = (event) => {
    const { name, value } = event.target;

    setUserProfileViewModel({
      ...userProfileViewModel,
      [name]: value
    });
  };

  const handleUserProfile = async (e) => {
    e.preventDefault();
    setErrorsUserProfile({
      firstName: "",
      middleName: "",
      lastName: "",
      idCardNumber: "",
      choosenNotificationChannel: "",
    });
    const values = await schema.validate({...userProfileViewModel,
      isUserConsentSmsNotification: e.target['isUserConsentSmsNotification'].checked,
      isUserConsentEmailNotification: e.target['isUserConsentEmailNotification'].checked
    });

    if (values.firstName === "" || values.lastName === "") {
      let firstNameError = "", lastNameError = "", idCardNumberError = "", middleNameError = "", choosenNotificationChannelError = "";
      if (values.firstName === "") firstNameError = commonLocalizer("MODULE_COMMON_EDIT_PROFILE_FIRSTNAME_IS_REQUIRED");
      if (values.lastName === "") lastNameError = commonLocalizer("MODULE_COMMON_EDIT_PROFILE_LASTNAME_IS_REQUIRED");

      setErrorsUserProfile({
        firstName: firstNameError,
        lastName: lastNameError,
        idCardNumber: idCardNumberError,
        middleName: middleNameError,
        choosenNotificationChannel: choosenNotificationChannelError
      });
    } else {
      const formProfil = document.querySelector('form')
      const postDataUser = new FormData(formProfil as HTMLFormElement);
      
    const consentSms = postDataUser?.get('isUserConsentSmsNotification')
    const consentEmail = postDataUser?.get('isUserConsentEmailNotification')
    if(!consentEmail) postDataUser.append("isUserConsentEmailNotification", 'false');
    if(!consentSms) postDataUser.append("isUserConsentSmsNotification", 'false');
      postDataUser.delete("picture");
      postDataUser.append("picture", picture);
      dispatch( updateMyProfile( postDataUser ));
    }
  };
  
  window.document.title = commonLocalizer("MODULE_COMMON_EDIT_PROFILE_TITLE");

  return (
    <div className="h-full flex flex-col justify-between user-profile">
      {updateDataMyProfile.Errors &&
        updateDataMyProfile.Errors.length > 0 &&
        !updateDataMyProfile.pending &&
        updateDataMyProfile.Errors.map((message, key) => {
          return (
            <div className="w-full mx-auto mb-auto" key={key}>
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
      {getUserData.Errors &&
        getUserData.Errors.length > 0 &&
        !getUserData.pending &&
        getUserData.Errors.map((message, key) => {
          return (
            <div className="w-full mx-auto mb-auto" key={key}>
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

      {updateDataMyProfile.value && !updateDataMyProfile.pending ? (
        <div className="absolute left-[35%] top-[35%] w-1/2 mx-auto">
          <OperationResultComponent
            message={"Vous avez modifié avec success vos données"}
            title={commonLocalizer("MODULE_COMMON_GET_PROFILE_TITLE")}
            titleButton={commonLocalizer(
              "MODULE_COMMON_EDIT_PROFILE_CHANGE_MY_EMAIL_SUCCESS_RETURN"
            )}
            linkButton="/my-profile"
          />
        </div>
      ) : (
        <>
          <div className={` ${ClasseName.TITLE} `}>
            <h1 className="">{commonLocalizer("MODULE_COMMON_MY_PROFILE_UPDATE_PROFILE")}</h1>
            <Breadcrumb items={[{ title: commonLocalizer("MODULE_COMMON_SIDEBAR_DASHBOARD"), link: "/dashboard" }, { title: commonLocalizer("MODULE_COMMON_MY_PROFILE_UPDATE_PROFILE") }]} />
          </div>

          <form
            className="grid grid-cols-2 h-full content-between justify-between items-stretch lg:gap-14 xmd:gap-5 xxs:gap-1 mx-auto my-2 xl:px-8 xmd:px-0 xxs:px-4 w-11/12"
            onSubmit={handleUserProfile}
            encType="multipart/form-data"
          >
            <div className="xmd:col-span-1 xxs:col-span-2 px-2 flex flex-col justify-evenly xxs:gap-4 card-component">
              {getUserData.pending ? (
                <div className="flex flex-col w-full gap-0">
                  <div className="pe-2 me-auto">
                    <ShimmerBox classe="rounded-full" />
                  </div>
                  <div className="username w-full mx-auto">
                    <ShimmerText />
                  </div>
                  <div className="username w-full mx-auto">
                    <ShimmerText />
                  </div>
                </div>
              ) : (
                <>
                  <div className="col-span-1 flex flex-row justify-start items-center gap-2 mb-3">
                    <div className="pe-2">
                      <EditPicture
                        targetImage={getUserData.value.payload.pictureUrl.toString()}
                        setPicture={setPicture}
                      />
                    </div>
                    <div className="username flex flex-col">
                      <span className="font-bold">{username}</span>
                      <span className="text-gray-600 font-bold">
                        {getUserData.value.payload.userName}
                      </span>
                    </div>
                  </div>
                  {getUserData.value.payload.isUserNameDisplayable && (
                    <div className="userName flex flex-col gap-2 justify-between">
                      <label htmlFor="userName">
                        {commonLocalizer(
                          "MODULE_COMMON_EDIT_PROFILE_USER_NAME"
                        )}
                      </label>
                      <InputWithIcon
                        type="text"
                        id="userName"
                        name="userName"
                        icon={"user-8icon- text-lg"}
                        placeholder={
                          getUserData.value.payload.userName ||
                          commonLocalizer(
                            "MODULE_COMMON_EDIT_PROFILE_USER_NAME"
                          )
                        }
                        className="bg-gray-300"
                        value={getUserData.value.payload.userName}
                        onChange={handleChangeInputUserProfile}
                        disabled={true}
                        eye={false}
                      />
                      <input
                        type="hidden"
                        name="userName"
                        value={getUserData.value.payload.userName}
                      />
                    </div>
                  )}

                  <div className="firstName flex flex-col gap-2 justify-between">
                    <label htmlFor="firstName">
                      {commonLocalizer("MODULE_COMMON_EDIT_PROFILE_FIRSTNAME")}
                    </label>
                    <InputWithIcon
                      type="text"
                      id="firstName"
                      name="firstName"
                      icon={"user-8icon- text-lg"}
                      placeholder={commonLocalizer(
                        "MODULE_COMMON_EDIT_PROFILE_FIRSTNAME"
                      )}
                      className=""
                      value={userProfileViewModel.firstName}
                      onChange={handleChangeInputUserProfile}
                      eye={false}
                    />
                    {errorsUserProfile.firstName && (
                      <div className="error">
                        {errorsUserProfile.firstName.toString()}
                      </div>
                    )}
                  </div>
                  <div className="middleName flex flex-col gap-2 justify-between">
                    <label htmlFor="middleName">
                      {commonLocalizer(
                        "MODULE_COMMON_EDIT_PROFILE_MIDDLE_NAME"
                      )}
                    </label>
                    <InputWithIcon
                      type="text"
                      id="middleName"
                      name="middleName"
                      icon={"user-8icon- text-lg"}
                      placeholder={commonLocalizer(
                        "MODULE_COMMON_EDIT_PROFILE_MIDDLE_NAME"
                      )}
                      className=""
                      value={userProfileViewModel.middleName}
                      onChange={handleChangeInputUserProfile}
                      eye={false}
                    />
                    {errorsUserProfile.middleName && (
                      <div className="error">
                        {errorsUserProfile.middleName.toString()}
                      </div>
                    )}
                  </div>
                  <div className="lastName flex flex-col gap-2 justify-between">
                    <label htmlFor="lastName">
                      {commonLocalizer("MODULE_COMMON_EDIT_PROFILE_NAMES")}
                    </label>
                    <InputWithIcon
                      type="text"
                      id="lastName"
                      name="lastName"
                      icon={"user-8icon- text-lg"}
                      placeholder={commonLocalizer(
                        "MODULE_COMMON_EDIT_PROFILE_NAMES"
                      )}
                      className=""
                      value={userProfileViewModel.lastName}
                      onChange={handleChangeInputUserProfile}
                      eye={false}
                    />
                    {errorsUserProfile.lastName && (
                      <div className="error">
                        {errorsUserProfile.lastName.toString()}
                      </div>
                    )}
                  </div>
                  <div className="idCardNumber flex flex-col gap-2 justify-between">
                    <label htmlFor="idCardNumber">
                      {commonLocalizer(
                        "MODULE_COMMON_EDIT_PROFILE_ID_CARD_NUMBER"
                      )}
                    </label>
                    <InputWithIcon
                      type="text"
                      id="idCardNumber"
                      name="idCardNumber"
                      icon={"id-card-oicon- text-lg"}
                      placeholder={commonLocalizer(
                        "MODULE_COMMON_EDIT_PROFILE_ID_CARD_NUMBER"
                      )}
                      className=""
                      value={userProfileViewModel.idCardNumber}
                      onChange={handleChangeInputUserProfile}
                      eye={false}
                    />
                    {errorsUserProfile.idCardNumber && (
                      <div className="error">
                        {errorsUserProfile.idCardNumber.toString()}
                      </div>
                    )}
                  </div>
                  <div className="role flex flex-col gap-2 justify-between mb-5">
                    <label htmlFor="role">
                      {commonLocalizer(
                        "MODULE_COMMON_MY_PROFILE_ROLE_DESCRIPTION"
                      )}
                    </label>
                    <textarea
                      id="role"
                      className="rounded-md border-none"
                      rows={4}
                    ></textarea>
                    {errorsUserProfile.idCardNumber && (
                      <div className="error">
                        {errorsUserProfile.idCardNumber.toString()}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="xmd:col-span-1 xxs:col-span-2 xmd:py-4 flex flex-col justify-start xxs:gap-8 card-component">
              {getUserData.pending ? (
                <div className="flex flex-col w-full gap-0 mx-auto">
                  <div className="username w-full mx-auto">
                    <ShimmerText />
                  </div>
                  <div className="username w-full mx-auto">
                    <ShimmerText />
                  </div>
                  <div className="username w-full mx-auto">
                    <ShimmerText />
                  </div>
                </div>
              ) : (
                <>
                  <>
                    <div className="isUserConsentEmailNotification flex flex-row justify-between pt-10">
                      <label htmlFor="isUserConsentEmailNotification">
                        {commonLocalizer(
                          "MODULE_COMMON_EDIT_PROFILE_I_CONSENT_EMAIL_NOTIFICATIONS"
                        )}
                      </label>
                      <SwitchComponent
                        id="isUserConsentEmailNotification"
                        checked={getUserData.value.payload.isUserConsentEmailNotification}
                        value="true"
                        name="isUserConsentEmailNotification"
                        cssClass=""
                      ></SwitchComponent>
                    </div>

                    <div className="isUserConsentSmsNotification flex flex-row justify-between">
                      <label htmlFor="isUserConsentSmsNotification">
                        {commonLocalizer(
                          "MODULE_COMMON_EDIT_PROFILE_I_CONSENT_SMS_NOTIFICATIONS"
                        )}
                      </label>
                      <SwitchComponent
                        id="isUserConsentSmsNotification"
                        checked={getUserData.value.payload.isUserConsentSmsNotification}
                        value="true"
                        name={"isUserConsentSmsNotification"}
                      ></SwitchComponent>
                    </div>
                    <div className="isTwoFactorEnabled col-span-2 grid grid-cols-2 gap-5">
                      <div className="isTwoFactorEnabled flex flex-row justify-between md:col-span-2 xxs:col-span-2">
                        <label
                          className="disabled"
                          htmlFor="isTwoFactorEnabled"
                        >
                          {commonLocalizer(
                            "MODULE_COMMON_EDIT_PROFILE_TWO_FACTOR_AUTHENTICATION"
                          )}
                        </label>
                        <SwitchComponent
                          id="isTwoFactorEnabled"
                          checked={getUserData.value.payload.isTwoFactorAuthenticationEnabled}
                          disabled={!getUserData.value.payload.canUserSetTwoFactorAuthentication}
                          name="isTwoFactorEnabled"
                        ></SwitchComponent>
                      </div>
                    </div>
                  </>

                  <div className="emial flex flex-col gap-2 justify-between">
                    <div className="flex flex-row justify-between gap-3">
                      <label htmlFor="email">
                        {commonLocalizer("MODULE_COMMON_MY_PROFILE_YOUR_EMAIL")}
                      </label>
                      <ContactMediaVerificationDialog
                        params={paramsForEmail}
                        input={inputParamsForEmail}
                        dialog={dialogComponentForEmail}
                      />
                    </div>
                    <InputWithIcon
                      type="text"
                      id="email"
                      name="email"
                      icon={"mail-1icon-"}
                      placeholder={commonLocalizer(
                        "MODULE_COMMON_MY_PROFILE_YOUR_EMAIL"
                      )}
                      className=""
                      value={getUserData.value.payload.email}
                      disabled={true}
                      onChange={null}
                      eye={false}
                    />
                  </div>
                  <div className="phoneNumber flex flex-col gap-2 justify-between -mt-4">
                    <div className="flex flex-row justify-between gap-3">
                      <label htmlFor="phoneNumber">
                        {commonLocalizer(
                          "MODULE_COMMON_MY_PROFILE_YOUR_PHONE_NUMBER"
                        )}
                      </label>
                      <ContactMediaVerificationDialog
                        params={paramsForPhoneNumber}
                        input={inputParamsForPhoneNumber}
                        dialog={dialogComponentForPhoneNumber}
                      />
                    </div>
                    <InputWithIcon
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      icon={"phoneicon-"}
                      placeholder={commonLocalizer(
                        "MODULE_COMMON_MY_PROFILE_YOUR_PHONE_NUMBER"
                      )}
                      className=""
                      value={getUserData.value.payload.phoneNumber}
                      disabled={true}
                      onChange={null}
                      eye={false}
                    />
                  </div>
                  <div className="btns flex flex-col gap-2 justify-between mt-auto">
                    <Button
                      param={{
                        type: "button",
                        css: (updateDataMyProfile.pending&&"disabled")+" cancelBtn px-5 py-1 mt-5 col-span-2 h-12 rounded-md mx-auto xxs:w-full",
                        name: commonLocalizer("MODULE_COMMON_MY_PROFILE_DISCARD"),
                        disabled: updateDataMyProfile.pending,
                        handleClick: returnPreviousPage,
                      }}
                    />
                    <Button
                      param={{
                        type: "submit",
                        css: (updateDataMyProfile.pending&&"disabled")+" okBtn px-5 py-1 mb-5 col-span-2 h-12 rounded-md mx-auto xxs:w-full",
                        name: commonLocalizer("MODULE_COMMON_EDIT_PROFILE_SAVE_CHANGE"),
                        disabled: updateDataMyProfile.pending
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default MyProfile;
