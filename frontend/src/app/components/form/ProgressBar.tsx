import { useState } from "react";
const ProgressBar = (props) => {
  const { progress, fin } = props;
  const [className, setClassName] = useState("");
  const contStyle = {
    width: `${progress}%`,
  };
  if (fin) {
    setTimeout(() => {
      setClassName("hidden");
    }, 1000);
  }
  return (
    <div className={"containerStyle h-1 w-full rounded-none bg-lime-100 " + className}>
      <div className="fillerStyles h-full text-transparent" style={contStyle}>
        <span className="p-5 h-3">
          {progress}
        </span>
      </div>
    </div>
  );
};
export default ProgressBar;