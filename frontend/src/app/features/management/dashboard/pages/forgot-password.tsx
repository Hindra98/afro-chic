import * as Yup from "yup";

import ImageLight from "../../../../assets/images/admin/auth/login-office.jpeg";
import ImageDark from "../../../../assets/images/admin/auth/login-office-dark.jpeg";
import InputWithIcon from "../../../../components/form/Input";
import { isEmail } from "../../../../core/text/regex";
import { useState } from "react";
import Button from "../../../../components/form/Button";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    email: Yup.string(),
  });

  const [loginViewModel, setLoginViewModel] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });

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
    setErrors({ email: "" });

    // const values = loginViewModel;
    const values = await schema.validate(loginViewModel);

    if (!isEmail(values.email as string) || values.email === "") {
      let email = "";
      if (!isEmail(values.email as string))
        email = t(
          "MODULE_COMMON_EDIT_PROFILE_THIS_EMAIl_IS_NOT_VALID"
        );
      if (values.email === "")
        email = t(
          "MODULES_Common_User_Validate_Command_Email_Required"
        );

      setErrors({ email: email });
    } else {
      console.log("Login data: ", loginViewModel);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Forgot Password
              </h1>

              <form onSubmit={handleSubmit}>
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
                    className="mt-1"
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

                <Button
                  param={{
                    type: "submit",
                    name: "Envoyer",
                    css: "mx-auto text-center shrink-0 rounded-md w-full okBtn my-4",
                  }}
                />
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
