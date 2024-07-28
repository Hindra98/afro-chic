import "../../styles/components/_mail-to.scss";

interface Props{
    email: string;
}

const MailTo: React.FC<Props> = (props: Props) => {

    return (
        <>
           <a href={`mailto:${props.email}`} className="email">
           {props.email}
            </a>
        </>
    )
}

export default MailTo;