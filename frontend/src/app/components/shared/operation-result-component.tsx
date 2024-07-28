import cardFooter from "./card/card-footer";
import cardHeader from "./card/card-header";
import logoHeaderCard from '../../assets/images/orebiLogo.png'
import Card from "./card/card-component";
import { PropsWithChildren } from "react";
import { useLocalizer } from "../../core/Localization";

type ParamsChild = {
  picture: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  closeDialog?: () => void;
  changeDone?: () => void;
}

type Props = PropsWithChildren<{
  message?: string;
  title?: string;
  titleButton?: string;
  linkButton?: string;
  param?: ParamsChild;
  failed?: boolean;
}>;
export default function OperationResultComponent({
  param = null,
  message = "",
  title = "",
  titleButton = "",
  linkButton = "",
  failed = false,
}: Props) {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  
  const changeSuccessfullFooterBtns = [
    {
      name: "Done",
      css: "okBtn",
      disabled: false,
      type: "button" as "submit" | "reset" | "button",
      handleClick: param?.changeDone,
    },
  ];
  const changeSuccessfullFooterLink = {
    name: "Privacy and Cookies",
    css: "py-0 mt-2",
    disabled: false,
    href: "/privacy-cookies",
    target: "_blank",
  };
  const hChangeSuccessfull = param !== null ? new cardHeader("", logoHeaderCard, null, param?.closeDialog) : null;
  const fChangeSuccessfull = param !== null ? new cardFooter("", changeSuccessfullFooterLink, changeSuccessfullFooterBtns) : null;

  return (
    <>
      <Card header={hChangeSuccessfull} footer={fChangeSuccessfull}>
        <div className="flex flex-col justify-center items-stretch gap-5 mx-auto my-4 operationsuccess ">
          {param !== null ? (
            <>
              <div className="text-center mb-3 w-2/3 mx-auto">
                <div className="img w-1/2 mx-auto borde rounded-full mb-2">
                  <img
                    src={param?.picture}
                    alt="profil"
                    className="rounded-full w-full h-full bg-gray-50"
                  />
                </div>
                <h1 className="font-bold text-2xl">
                  {failed ? "Sorry" : "Thanks"} {param?.username}
                </h1>
                {!failed ? (
                  <p className="text-base mx-16 text-gray-500">
                    {commonLocalizer("MODULE_COMMON_MESSAGES_ACCOUNT_UPDATED_SUCCESSFULLY")} {commonLocalizer("MODULE_COMMON_MESSAGES_RECOVER_METHODS_UPDATED")}
                  </p>
                ) : (
                  <p className="text-center my-3 text-red-600">{message}</p>
                )}
              </div>

              <div className="mt-1">
                <h2 className="text-center font-bold pb-3">
                {commonLocalizer("MODULE_COMMON_MESSAGES_YOUR_RECOVERY_INFORMATIONS")} :
                </h2>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center gap-4 pb-2 mx-14 mb-2">
                    <span
                      className={`icon text-lg ${
                        param.name !== "SMS"
                          ? failed
                            ? "text-red-700 cancel-circledicon-"
                            : "text-blue-700 ok-circledicon-"
                          : "ok-circledicon- text-gray-700"
                      }`}
                    ></span>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{commonLocalizer("MODULE_COMMON_MY_PROFILE_RECOVERY_EMAIL")}</span>
                      <span className="text-gray-500 text-sm">
                        {param.email}
                      </span>
                    </div>
                  </div>
                  <hr className="w-11/12 mx-auto" />
                  <div className="flex flex-row items-center gap-4 pt-2 mx-14">
                    <span
                      className={`icon text-lg ${
                        param.name === "SMS"
                          ? failed
                            ? "text-red-700 cancel-circledicon-"
                            : "text-blue-700 ok-circledicon-"
                          : "ok-circledicon- text-gray-700"
                      }`}
                    ></span>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{commonLocalizer("MODULE_COMMON_MY_PROFILE_RECOVERY_PHONE")}</span>
                      <span className="text-gray-500 text-sm">
                        {param.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            message !== "" && (
              <div className="py-4 h-full w-full">
                {title !== "" && (<h1 className="text-3xl align-top text-center py-5">{title}</h1>)}
                <div className={`text-center my-3 ${failed && "text-red-700"}`}>
                  {message}
                  <br />
                  <p className="py-5">
                    {linkButton !== "" ? (<a href={linkButton}>{titleButton}</a>) : (titleButton)}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </Card>
    </>
  );
}
