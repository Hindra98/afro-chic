import { useState } from "react";

type Props = {
  type?: string;
  name?: string
  id?: string
  placeholder?: string
  className?: string
  eye?: boolean
  readOnly?: boolean
  value?: string
  defaultValue?: string
  icon?: string;
  textIn?: string;
  onChange?
  onBlur?
  onInput?
  disabled?: boolean
}
export default function InputWithIcon({
  type,
  name,
  id = "",
  placeholder,
  className = "",
  eye = false,
  readOnly = false,
  value,
  defaultValue,
  icon = "",
  onChange,
  onBlur,
  onInput,
  disabled = false
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const iconeInput = icon !== "" && (
    <span className={"text-xl font-medium icon me-2 " + icon}></span>
  );
  return (
    <>
      <div className={`text-md flex flex-row gap-0 items-center border px-2 py-1 input-dashboard ` + className}>
        {iconeInput}
        <input
          type={!eye ? type : showPassword ? "text" : "password"}
          id={id}
          name={name}
          placeholder={placeholder}
          className={"login-input w-full outline-none border-none bg-transparent"}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onInput={onInput}
          onBlur={onBlur}
          autoComplete="off"
          readOnly={readOnly}
          disabled={disabled}
        />
        {eye && <span
          className={`e-icons cursor-pointer text-xl font-medium ms-2 ${showPassword ? "e-eye-slash" : "e-eye"}`}
          onClick={() => setShowPassword(!showPassword)}
        ></span>}
      </div>
    </>
  );
}

export const InputWithoutIcon = ({
  type,
  name,
  id,
  placeholder,
  className,
  eye,
  value,
  textIn,
  onChange,
  disabled = false
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const iconeInput = textIn !== "" && (
    <div className={"px-1 text-in-input h-full py-2"}>{textIn}</div>
  );
  return (
    <>
      <div className={`text-md flex flex-row gap-0 items-center border input-dashboard py-0 pe-2 ` + className}>
        {iconeInput}
        <input
          type={!eye ? type : showPassword ? "text" : "password"}
          id={id}
          name={name}
          placeholder={placeholder}
          className={"login-input w-full outline-none border-none bg-transparent h-full"}
          value={value}
          onChange={onChange}
          autoComplete="off"
          disabled={disabled}
        />
        {eye &&
          (showPassword ? (
            <span
              className="e-icons e-eye-slash cursor-pointer text-2xl font-medium"
              onClick={() => setShowPassword(!showPassword)}
            ></span>
          ) : (
            <span
              className="e-icons e-eye cursor-pointer text-2xl font-medium"
              onClick={() => setShowPassword(!showPassword)}
            ></span>
          ))}
      </div>
    </>
  );
}
