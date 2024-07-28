
import { technicalSupportEmail } from "../../core/constants/errors-contants";
import MailTo from "./mail-to";
import "../../styles/_error-handling.scss"

type Props = {
  error: ServerErrorMessageItem;
};

function ErrorServer({ error }: Props) {
  const returnLoginPage = (e) => {
    e.preventDefault();
    window.location.href = "/";
  }
  return (
    <>
      <div className="form-base flex flex-col justify-center w-full">
        <div className="flex flex-col gap-6 justify-center min-h-[490px]">
          <div className="flex flex-col gap-6 justify-center min-h-[490px]">
            <div className="h-center gfont">
              <h1>{error.title || "Erreur lors de cette operation"} 😢</h1>
              <div className="fs-16 line-gap">
                {error.message && (
                  <p>
                    <span>Message: </span>
                    {error.message}
                  </p>
                )}
                {error.status && (
                  <p>
                    <span>Status: </span>
                    {error.status}
                  </p>
                )}
                {error.type && (
                  <p>
                    <span>Type: </span>
                    {error.type}
                  </p>
                )}
                {error.instance && (
                  <p>
                    <span>Instance: </span>
                    {error.instance}
                  </p>
                )}
                {error.detail && (
                  <p>
                    <span>Details: </span>
                    {error.detail}
                  </p>
                )}
                <div className="go-a-head">
                  <div className="">
                    <h2>
                      N'hésitez pas à nous envoyer un e-mail si vous pensez
                      qu'il s'agit d'une erreur.
                    </h2>
                    <div className="e-link">
                      <MailTo email={technicalSupportEmail} />
                    </div>
                  </div>
                </div>
              </div>
              <button className="go-back mx-auto w-max py-2 px-4 rounded-lg cursor-pointer" onClick={returnLoginPage}>
                Retourner a la page d'authentification
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorServer;
