import Button from "../../../../components/form/Button";
import InputWithIcon from "../../../../components/form/Input";
import * as Yup from "yup";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import appStore from "../../../../assets/appstore.png";
import HelpText from "./help-text";
import { isEmail } from "../../../../core/text/regex";
import "../../../../styles/login.scss";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../core/hooks/core-hooks";
import { register } from "../../../../store-management/actions/oauth/oauth-actions";

const Register = () => {
  const { t } = useTranslation();
  
  const userConnected = useAppSelector(state=> state.getUser);
  const registerState = useAppSelector(state=> state.registerUser)
  const dispatch = useAppDispatch()

  const schema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string(),
    passwordRepeat: Yup.string(),
  });

  const [registerViewModel, setLoginViewModel] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors({ ...errors, [name]: "" });

    setLoginViewModel({
      ...registerViewModel,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({
      password: "",
      passwordRepeat: "",
      email: "",
    });

    // const values = registerViewModel;
    const values = await schema.validate(registerViewModel);

    if (
      values.password === "" ||
      values.password !== values.passwordRepeat ||
      !isEmail(values.email as string) ||
      (values.password as string).length < 8
    ) {
      let password = "",
        passwordRepeat = "",
        email = "";
      if (values.password === "")
        password = t(
          "MODULES_Common_User_Validate_Command_Password_Required"
        );
      if ((values.password as string).length < 8)
        password = t(
          "MODULES_Common_User_Validate_Command_Password_Minimum_Length"
        );
      if (!isEmail(values.email as string))
        email = t(
          "MODULE_COMMON_EDIT_PROFILE_THIS_EMAIl_IS_NOT_VALID"
        );
      if (values.email === "")
        email = t(
          "MODULES_Common_User_Validate_Command_Email_Required"
        );
      if (values.password !== values.passwordRepeat)
        passwordRepeat = t(
          "MODULES_Common_User_Validate_Command_Password_No_Match"
        );

      setErrors({
        ...errors,
        password: password,
        email: email,
        passwordRepeat: passwordRepeat,
      });
    } else {
      console.log("Login data: ", registerViewModel);
      dispatch(register({email: registerViewModel.email, password:registerViewModel.password} as RegisterCommand))
      // registerWithEmailAndPassword(registerViewModel.email, registerViewModel.password);
    }
  };

  if (userConnected.user !== null) {
    return <Navigate to={"/home"} replace />;
  }

  window.document.title = t("MODULE_COMMON_AUTHENTICATION_SCREEN_REGISTER");

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
              action="#"
              className="mt-8 grid grid-cols-6 gap-6 form-login"
              onSubmit={handleSubmit}
            >

              <div className="col-span-6">
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
                  value={registerViewModel.email}
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

              <div className="col-span-6 md:col-span-3">
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
                  value={registerViewModel.password}
                  icon="lock-1icon-"
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

              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor="passwordRepeat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmation de mot de passe
                </label>
                <InputWithIcon
                  type={"password"}
                  name={"passwordRepeat"}
                  id={"passwordRepeat"}
                  value={registerViewModel.passwordRepeat}
                  icon="lock-1icon-"
                  placeholder="Repeter le mot de passe"
                  onChange={handleChange}
                  eye
                />
                {errors.passwordRepeat && (
                  <div className="error">
                    {errors.passwordRepeat.toString()}
                  </div>
                )}
              </div>

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    {t(
                      "MODULE_COMMON_AUTHENTICATION_SCREEN_REGISTER_RECEIVE_MAILS"
                    )}
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  {t(
                    "MODULE_COMMON_AUTHENTICATION_SCREEN_REGISTER_TERMS_OF_USE_HELP"
                  )}{" "}
                  <Link to={""} className="text-gray-700 underline">
                    {t(
                      "MODULE_COMMON_AUTHENTICATION_SCREEN_REGISTER_TERMS_OF_USE"
                    )}
                  </Link>{" "}
                  {t(
                    "MODULE_COMMON_AUTHENTICATION_SCREEN_REGISTER_OF"
                  )}{" "}
                  <Link to={""} className="text-gray-700 underline">
                    {t(
                      "MODULE_COMMON_AUTHENTICATION_SCREEN_REGISTER_TERMS_OF_USE"
                    )}
                  </Link>
                </p>
              </div>

              <div className="col-span-6 flex flex-col gap-4">
                <Button
                  param={{
                    type: "submit",
                    name: t(
                      "MODULE_COMMON_AUTHENTICATION_SCREEN_REGISTER_LINK"
                    ),
                    css: (registerState.pending ? "disabled":"") +" mx-auto register-btn shrink-0 rounded-md",
                    disabled: registerState.pending
                  }}
                />

                <p className="text-sm text-gray-500">
                  {t(
                    "MODULE_COMMON_AUTHENTICATION_SCREEN_HAS_ACCOUNT"
                  )}{" "}
                  <Link to={"/account/login"} className="text-gray-700 underline">
                    {t(
                      "MODULE_COMMON_AUTHENTICATION_SCREEN_LOGIN_LINK"
                    )}
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
