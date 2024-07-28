import { useState } from "react";

export default function Text({
  type,
  name,
  id,
  placeholder,
  className,
  eye,
  value,
  icon,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const iconeInput = icon !== "" && (
    <i className={"e-icons text-2xl font-medium " + icon}></i>
  );
  return (
    <>
      <div className="text-md flex flex-row gap-0 items-center border-b border-black">
        {iconeInput}
        <input
          type={!eye ? type : showPassword ? "text" : "password"}
          id={id}
          name={name}
          placeholder={placeholder}
          className={className}
          value={value}
          onChange={onChange}
          autoComplete="off"
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
