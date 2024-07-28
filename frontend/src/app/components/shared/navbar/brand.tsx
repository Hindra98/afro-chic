import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import Image from "../../form/Image";
import afrochic from "../../../assets/images/orebiLogo.png";

const Brand = () => {
  const goToHome = () => {
    window.location.href = "/dashboard";
  }
  return (
    <ButtonComponent cssClass="e-inherit logo e-appbar-menu h-full" onClick={goToHome} title="Aller à l'acueil">
      <Image
        src={afrochic}
        alt="AFROCHIC"
        title=""
        className="w-44 p-0 m-0"
      />
    </ButtonComponent>
  );
};

export default Brand;
