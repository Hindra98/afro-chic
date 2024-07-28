import { useState } from "react";
import "src/app/styles/components/_file-input.scss";

const FileInput = props => {
  const [file, setFile] = useState(null);

  const handleFileChange = e => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  return (
    <div className={`file-input flex flex-row justify-between items-center gap-4`}>
      <label
        className={`flex items-center ${props?.error ? "border-red-400" : "border-white"
          } border w-full cursor-pointer`}
      >
        <span className={`flex-grow pl-4 ${props?.error ? "text-red-700" : ""}`}>
          Télécharger une image
        </span>
        <input type="file"
          name={props?.name}
          id={props?.id}
          accept={props?.accept}
          capture='user'
          hidden onChange={handleFileChange} />
        <input
          type="text"
          placeholder={file ? file?.name?.toString() : props?.placeholder}
          disabled
          readOnly
          className={`border ${props?.error ? "border-none text-red-600" : "border-gray-400"
            } bg-white px-3 ms-4 flex-grow text-file `}
        />
      </label>
    </div>
  );
};

export default FileInput;