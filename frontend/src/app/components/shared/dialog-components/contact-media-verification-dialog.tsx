import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { useEffect, useState } from "react";
import OperationResultComponent from "../operation-result-component";

import userSuccess from "../../../assets/images/person.png";
import ChangeContactMediaComponent from "./change-contact-media-dialog";
import { ChangeEmailStoreShape } from "../../../store-management/actions/accounts";
import { useLocalizer } from "../../../core/Localization";
import { useAppSelector } from "../../../core/hooks/core-hooks";
import { useGlobalAppContext } from "../../../core/hooks/use-app-context";
import { WasPinCodeSent } from "../../../core/constants/common-constants";
import { getStorage } from "../../../core/storage/storage";
import VerifyUserIdentityByPinCodeComponent from "../../../features/common/identity/my-profile/my-profile/verify-user-identity";

type DialogModalComponent = {
  description: string | JSX.Element;
  isAcceptChangeDone: boolean;
  changeIsAcceptChangeDone: (val: boolean) => void;
  changeContactResult: ChangeEmailStoreShape;
};
type InputComponent = {
  name: "email" | "SMS";
  dialingCode?: string;
};
type Params = {
  value: string;
  dialogLabel: string;
};

type Props = {
  params: Params;
  dialog: DialogModalComponent;
  input: InputComponent;
};

function ContactMediaVerificationDialog({
  params,
  dialog,
  input,
}: Props) {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  const getProfil = useAppSelector((state) => state.myProfileGetData);
  const sendPinCodeMessages = useAppSelector(state => state.sendPinCode);
  
  const [visibility, setDialogVisibility] = useState(false);
  
  const { claims } = useGlobalAppContext();
  const username = claims?.get("name");
  function handleChangeClick(e) {
    e.preventDefault();
    // setDialogVisibility(true)
    if(getProfil.Errors.length>0) alert(commonLocalizer("MODULE_COMMON_MY_PROFILE_UNABLE_LOAD_DATA"))
    else setDialogVisibility(true)
  }
  function dialogClose() {
    setDialogVisibility(false);
  }
  function changeDone() {
    if (input.name === 'SMS') getStorage<string>(WasPinCodeSent.FOR_PHONE_NUMBER_CHANGE, true)
    else getStorage<string>(WasPinCodeSent.FOR_EMAIL_CHANGE, true)
    dialog.changeIsAcceptChangeDone(false);
    setDialogVisibility(false);
  }

  const returnPreviousInVerifyContactMedia = () => {
    dialog.changeIsAcceptChangeDone(false);
  };
  
  useEffect(() => {
    if (input.name === 'SMS') dialog.changeIsAcceptChangeDone(JSON.parse(getStorage<string>(WasPinCodeSent.FOR_PHONE_NUMBER_CHANGE)));
    else dialog.changeIsAcceptChangeDone(JSON.parse(getStorage<string>(WasPinCodeSent.FOR_EMAIL_CHANGE)));
  }, [dialog, input]);

  return (
    <>
      <span className="underline font-bold cursor-pointer" onClick={handleChangeClick}>
        {params.dialogLabel}
      </span>
      <DialogComponent
        width="35%"
        className="l"
        id="dialogModalUserProfile"
        isModal={true}
        target="#maintext"
        cssClass="mx-auto"
        close={dialogClose}
        visible={visibility}
        showCloseIcon={false}
        closeOnEscape={true}
      >
        <div>
        {!dialog?.isAcceptChangeDone ? (
          <ChangeContactMediaComponent
            name={input.name}
            description={dialog.description}
            closeDialog={dialogClose}
          ></ChangeContactMediaComponent>
        ) : dialog?.changeContactResult?.Errors?.length === 0 &&
          sendPinCodeMessages?.value?.contactMedia &&
          dialog?.changeContactResult?.value?.message?.length === 0 ? (
          <VerifyUserIdentityByPinCodeComponent
            contactMediaKey={input.name}
            closeDialog={dialogClose}
            returnPrevious={returnPreviousInVerifyContactMedia}
          ></VerifyUserIdentityByPinCodeComponent>
        ) : dialog?.changeContactResult?.Errors?.length === 0 && dialog?.changeContactResult?.value?.message?.length > 0 ? (
          <OperationResultComponent
            param={{
              username: username as string,
              changeDone: changeDone,
              closeDialog: dialogClose,
              picture: getProfil.value.payload?.pictureUrl?.toString() ? getProfil.value.payload?.pictureUrl?.toString() : userSuccess,
              name: input.name,
              email:
                input.name === "SMS" ? getProfil.value.payload.email : sendPinCodeMessages.value.contactMedia,
              phoneNumber:
                input.name === "SMS" ? "+" + sendPinCodeMessages.value.dialingCode + " " +sendPinCodeMessages.value.contactMedia : "+" + getProfil.value.country.dialingCode + " " + getProfil.value.payload.phoneNumber,
            }}
          ></OperationResultComponent>
        ) : (
          <OperationResultComponent
            failed={true}
            message={dialog.changeContactResult.Errors[0]}
            param={{
              username: username as string,
              changeDone: changeDone,
              closeDialog: dialogClose,
              picture: getProfil.value.payload?.pictureUrl?.toString() ? getProfil.value.payload?.pictureUrl?.toString() : userSuccess,
              name: input.name,
              email:
                input.name === "SMS" ? getProfil.value.payload.email : sendPinCodeMessages.value.contactMedia,
              phoneNumber:
                input.name === "SMS" ? "+" + sendPinCodeMessages.value.dialingCode + " " +sendPinCodeMessages.value.contactMedia : "+" + getProfil.value.country.dialingCode + " " + getProfil.value.payload.phoneNumber,
            }}
          ></OperationResultComponent>
        )}
        </div>
      </DialogComponent>
    </>
  );

}

export default ContactMediaVerificationDialog;
