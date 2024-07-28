
import { Dispatch, SetStateAction } from "react";
import { useRef } from "react";
import { createElement } from "@syncfusion/ej2-base";
import { ImageEditorComponent } from "@syncfusion/ej2-react-image-editor";
import {
  DialogComponent,
  ButtonPropsModel,
  AnimationSettingsModel,
} from "@syncfusion/ej2-react-popups";
import pro from "../../../../../assets/images/person.png";
import { useLocalizer } from "../../../../../core/Localization";

import "../../../../../styles/_edit-picture.scss";

type Props = {targetImage: string, setPicture: Dispatch<SetStateAction<File>>}
const EditPicture = ({targetImage, setPicture}: Props) => {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  let animationSettings: AnimationSettingsModel = { effect: "None" };
  let dialogInstance = useRef<DialogComponent>(null);
  let imageEditorInstance = useRef<ImageEditorComponent>(null);
  let imageUpload = useRef<HTMLInputElement>(null);
  let imageCanvas = useRef<HTMLCanvasElement>(null);
  let customImage = useRef<HTMLImageElement>(null);
  let profile = useRef<HTMLDivElement>(null);
  let imgSrc: string = "";
  let imgFinal: File;
  const fileChanged = (args: any): void => {
    const URL = window.URL;
    const url = URL?.createObjectURL((args?.target as any)?.files[0]);
    imageEditorInstance?.current?.open(url?.toString());
    imageUpload.current.value = null;
    imgSrc = url.toString();
  };
  const handleImageLoaded = (): void => {
    if (imgSrc === "") {
      let ctx: CanvasRenderingContext2D = imageCanvas?.current?.getContext("2d");
      imageCanvas.current.width =
        customImage?.current?.width < customImage?.current?.height
          ? customImage?.current?.width
          : customImage?.current?.height;
      imageCanvas.current.height = imageCanvas?.current?.width;
      ctx.drawImage(
        customImage?.current,
        0,
        0,
        imageCanvas?.current?.width,
        imageCanvas?.current?.height
      );
      document.querySelector(".e-profile").classList.remove("e-hide");
    }
  };
  const dlgOpenButtonClick = (): void => {
    imageUpload?.current?.click();
  };

  const dlgResetButtonClick = (): void => {
    imageEditorInstance?.current?.reset();
  };
  const dlgRotateButtonClick = (): void => {
    imageEditorInstance?.current?.rotate(-90);
  };

  const dlgDoneButtonClick = (): void => {
    imageEditorInstance?.current?.crop();
    let croppedData: ImageData = imageEditorInstance?.current?.getImageData();
    let ctx: CanvasRenderingContext2D = imageCanvas?.current.getContext("2d");
    let tempCanvas: HTMLCanvasElement = profile?.current?.appendChild(createElement("canvas") as HTMLCanvasElement);
    let tempContext: CanvasRenderingContext2D = tempCanvas.getContext("2d");
    tempCanvas.width = croppedData.width;
    tempCanvas.height = croppedData.height;
    tempContext.putImageData(croppedData, 0, 0);
    ctx.clearRect(0, 0, imageCanvas?.current.width, imageCanvas?.current.height);
    ctx.drawImage(
      tempCanvas,
      0,
      0,
      imageCanvas?.current.width,
      imageCanvas?.current.height
    );
    
    const dataUrl = tempCanvas.toDataURL();
    const typeImage = dataUrl.split(',')[0].split(';')[0].split(':')[1];
    tempCanvas.toBlob((blob) => {
      imgFinal = new File([blob], "updated", { type: typeImage });
      setPicture(imgFinal);
    }, typeImage);

    tempCanvas.remove();
    profile.current.style.borderRadius = "100%";
    imageCanvas.current.style.backgroundColor = "transparent";

    dialogInstance?.current?.hide();
    if (imgSrc !== "") {
      customImage.current.src = imgSrc;
    }
  };
  
  const fileOpened = () => {
    imageEditorInstance?.current?.select("square");
  };
  const created = () => {
    if (imageEditorInstance?.current?.theme && window.location.href.split("#")[1]) {
      imageEditorInstance.current.theme = window.location.href
        .split("#")[1]
        .split("/")[1];
    }
  };

  const contentTemplate = () => {
    return (<>
    {/*
      <ImageEditorComponent
        ref={imageEditorInstance}
        toolbar={[]}
        fileOpened={fileOpened}
        created={created}
      ></ImageEditorComponent>
      */}
    </>);
  };
  const editClicked = () => {
    dialogInstance?.current?.show();
    imageEditorInstance?.current?.open(customImage?.current?.src);
  };
  const buttons: ButtonPropsModel[] = [
    {
      click: dlgOpenButtonClick,
      buttonModel: {
        content: commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_EDIT_MY_PICTURE_OPEN"),
        cssClass: "e-custom-img-btn e-img-custom-open",
      },
    },
    {
      click: dlgResetButtonClick,
      buttonModel: {
        content: commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_EDIT_MY_PICTURE_RESET"),
        cssClass: "e-custom-img-btn e-img-custom-reset",
      },
    },
    {
      click: dlgRotateButtonClick,
      buttonModel: {
        content: commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_EDIT_MY_PICTURE_ROTATE"),
        cssClass: "e-custom-img-btn e-img-custom-rotate",
      },
    },
    {
      click: dlgDoneButtonClick,
      buttonModel: {
        content: commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_EDIT_MY_PICTURE_APPLY"),
        cssClass: "e-custom-img-btn e-img-custom-apply okBtn",
        isPrimary: true,
      },
    },
  ];

  return (
    <div className="control-pane">
      <div className="col-lg-12 control-section e-img-editor-profile w-full">
        <div className="e-profile e-hide" ref={profile}>
          <div className="e-custom-wrapper">
            <canvas id="img-canvas" className="bg-gray-600" ref={imageCanvas}></canvas>
            <img
              alt="Profil"
              className="e-custom-img w-full"
              id="custom-img"
              onLoad={handleImageLoaded}
              src={targetImage??pro}
              ref={customImage}
            />
            <input
              type="file"
              placeholder="Profile picture"
              id="img-upload"
              className="e-custom-file"
              name="picture"
              onChange={fileChanged}
              ref={imageUpload}
              accept="image/*"
            />
            {/*
            <span
              id="custom-edit"
              className="e-custom-edit e-edit"
              onClick={editClicked}
            >
              <span className="e-custom-icon e-icons pencil-4icon-"></span>
            </span>
            */}
          </div>
        </div>
      </div>
      <div id="profile-dialog">
        <DialogComponent
          id="profile-dialog"
          showCloseIcon={true}
          animationSettings={animationSettings}
          closeOnEscape={true}
          isModal={true}
          visible={false}
          width={"450px"}
          height={"480px"}
          ref={dialogInstance}
          target="#maintext"
          header={commonLocalizer("MODULE_COMMON_EDIT_PROFILE_CHANGE_EDIT_MY_PICTURE_TITLE")}
          buttons={buttons}
          content={contentTemplate}
          position={{ X: "center", Y: 100 }}
        ></DialogComponent>
      </div>
    </div>
  );
};
export default EditPicture;
