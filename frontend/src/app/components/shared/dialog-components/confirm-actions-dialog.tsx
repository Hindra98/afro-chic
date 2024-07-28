import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { PropsWithChildren } from "react";
import Button from "../../form/Button";

type Props = PropsWithChildren<{
  title?: string;
  button: ParamsButton[];
  openDialog?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}>;

const ConfirmActionsDialog = (props: Props) => {
  const [visibility, setDialogVisibility] = props?.openDialog;

  function dialogClose() {
    setDialogVisibility(false);
  }

  return (
    <DialogComponent
      width="35%"
      className="mx-auto"
      id="dialogModalConfirmActionsDialog"
      isModal={true}
      target="#maintext"
      cssClass="mx-auto"
      close={dialogClose}
      visible={visibility}
      showCloseIcon={false}
      closeOnEscape={true}
    >
      <div className="flex flex-col justify-between items-start px-6 mx-auto py-4 text-black w-full bg-white modal">
        <div className="title flex flex-row justify-between bordr-b border-b-black pb-1 mt-2 w-full">
          {props?.title && (
            <h2 className="h2 text-xl font-bold text-[#312783]">
              {props?.title}
            </h2>
          )}
          <span
            className="icon ms-auto cancelicon- cursor-pointer"
            onClick={dialogClose}
          ></span>
        </div>
        <div className="content pb-16 pt-10 text-lg">{props?.children}</div>
        {props?.button?.length < 2 && (
          <div className="buttons flex gap-2 w-full justify-end mb-2">
            {props?.button &&
              props?.button.map((btn, idx) => <Button key={idx} param={btn} />)}
          </div>
        )}
      </div>
    </DialogComponent>
  );
};

export default ConfirmActionsDialog;
