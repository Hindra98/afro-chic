import { Link } from "react-router-dom";
import Image from "../form/Image";

interface Props {
    to: string;
    src: string;
    alt?: string;
    title: string;
    className: string;
}

const ImageLink = (props: Partial<Props>) => {
    return(
        <Link to={props.to as string}>
            <Image src={props.src as string} alt={props.alt as string} title={ props.title as string } className={props.className as string}/>
       </Link>
    )
}

export default ImageLink;