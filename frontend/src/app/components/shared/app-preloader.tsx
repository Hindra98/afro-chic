import Image from "../form/Image";
import afrochic from "../../assets/images/logoLight.png";
import UILoader from "./ui-loader";

export default function AppPreloader() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col gap-6 justify-center">
        <div className="logo mx-auto py-4">
          <Image src={afrochic} alt="AFROCHIC" title="" className="" />
        </div>
        <div className="child flex justify-center items-center">
          <UILoader />
        </div>
      </div>
    </div>
  );
}
