import { Link, Navigate } from "react-router-dom";
import Button from "../../../../components/form/Button";
import "../../../../styles/login.scss";
import * as Yup from "yup";
import { useState } from "react";

import InputWithIcon from "../../../../components/form/Input";
import appStore from "../../../../assets/appstore.png";
import HelpText from "./help-text";
import { isEmail } from "../../../../core/text/regex";
import { AuthenticationConstants } from "../../../../core/constants/authentication-contants";
import { getStorage } from "../../../../core/storage/storage";
import { useTranslation } from "react-i18next";
import { loginWithEmailAndPassword, loginWithGoogleAuth } from "../../../../http/firebase/users/oauth/login";
import { useAppSelector } from "../../../../core/hooks/core-hooks";

const Authentication = () => {
  const { t } = useTranslation();
  const userConnected = useAppSelector(state=> state.getUser);

  const schema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string(),
  });

  const [loginViewModel, setLoginViewModel] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [errorCredential, setErrorCredential] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors({ ...errors, [name]: "" });

    setLoginViewModel({
      ...loginViewModel,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({ email: "", password: "" });
    setErrorCredential("");

    // const values = loginViewModel;
    const values = await schema.validate(loginViewModel);

    if (
      values.password === "" ||
      !isEmail(values.email as string) ||
      values.email === ""
    ) {
      let password = "",
        email = "";
      if (values.password === "")
        password = t(
          "MODULES_Common_User_Validate_Command_Password_Required"
        );
      if (!isEmail(values.email as string))
        email = t(
          "MODULE_COMMON_EDIT_PROFILE_THIS_EMAIl_IS_NOT_VALID"
        );
      if (values.email === "")
        email = t(
          "MODULES_Common_User_Validate_Command_Email_Required"
        );

      setErrors({ email: email, password: password });
    } else {
      const serverResponse = await loginWithEmailAndPassword(loginViewModel.email, loginViewModel.password);
      if (!serverResponse.connected) {
        setErrorCredential("Nom d'utilisateur ou mot de passe erroné");
      } else {
        setErrorCredential("");
      }
    }
  };

  if (userConnected.user !== null) {
    return <Navigate to={"/home"} replace />;
  }

  window.document.title = t(
    "MODULE_COMMON_AUTHENTICATION_SCREEN_LOGIN"
  );

  return (
    <section className="min-h-full">
      <div className="lg:grid lg:min-h-[calc(100vh-41px)] lg:grid-cols-12">
        <HelpText />

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <Link
                to={"/"}
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
              >
                <span className="sr-only">Home</span>
                <img
                  alt="App Store Logo"
                  className="h-8 sm:h-10"
                  src={appStore}
                />
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                {t(
                  "MODULE_COMMON_AUTHENTICATION_SCREEN_LOGIN_TITLE"
                )}
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                {t(
                  "MODULE_COMMON_AUTHENTICATION_SCREEN_LOGIN_HELP_TEXT"
                )}{" "}
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </div>

            <form
              className="mt-8 grid grid-cols-6 gap-6 form-login"
              onSubmit={handleSubmit}
            >
              <div className="col-span-12">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t(
                    "MODULE_COMMON_AUTHENTICATION_SCREEN_EMAIL_ADDRESS"
                  )}
                </label>

                <InputWithIcon
                  type={"email"}
                  name={"email"}
                  id={"email"}
                  value={loginViewModel.email}
                  icon="mail-alticon-"
                  placeholder={t(
                    "MODULE_COMMON_AUTHENTICATION_SCREEN_EMAIL_ADDRESS_PLACEHOLDER"
                  )}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="error">{errors.email.toString()}</div>
                )}
              </div>

              <div className="col-span-12">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t(
                    "MODULE_COMMON_AUTHENTICATION_SCREEN_PASSWORD"
                  )}
                </label>

                <InputWithIcon
                  type={"password"}
                  name={"password"}
                  id={"password"}
                  // className="mt-1"
                  value={loginViewModel.password}
                  icon="icon lock-1icon-"
                  placeholder={t(
                    "MODULE_COMMON_AUTHENTICATION_SCREEN_PASSWORD_PLACEHOLDER"
                  )}
                  onChange={handleChange}
                  eye
                />
                {errors.password && (
                  <div className="error">{errors.password.toString()}</div>
                )}
              </div>
              {errorCredential !== '' && (
                  <div className="error w-full col-span-12">{errorCredential?.toString()}</div>
                )}

              <div className="col-span-12 flex flex-col gap-4">
                <Button
                  param={{
                    type: "submit",
                    name: t(
                      "MODULE_COMMON_AUTHENTICATION_SCREEN_SIGNIN"
                    ),
                    css: "mx-auto text-center shrink-0 rounded-md",
                  }}
                />

                <p className="text-sm text-gray-500">
                  <Link
                    to={"/account/forgot-password"}
                    className="text-gray-700 underline"
                  >
                    {t(
                      "MODULE_COMMON_AUTHENTICATION_SCREEN_I_FORGOT_MY_PASSWORD"
                    )}
                  </Link>
                  .
                </p>
              </div>

              <div className="col-span-12 text-center">
                <p className="mt-4 text-sm text-gray-500 sm:mt-0 mx-auto">
                  {t(
                    "MODULE_COMMON_AUTHENTICATION_SCREEN_NO_ACCOUNT"
                  )}{" "}
                  <Link
                    to={"/account/register"}
                    className="text-gray-700 underline"
                  >
                    {t(
                      "MODULE_COMMON_AUTHENTICATION_SCREEN_REGISTER_LINK"
                    )}
                  </Link>
                  .
                </p>
              </div>
              
              <div className="col-span-12 flex flex-col gap-4">
                <Button
                  param={{
                    type: "button",
                    name: "Google",
                    css: "mx-auto text-center shrink-0 rounded-md okBtn",
                    handleClick: loginWithGoogleAuth
                  }}
                />
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Authentication;
