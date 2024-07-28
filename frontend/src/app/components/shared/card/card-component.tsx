import React from "react"
import "../../../styles/components/_card.scss"
import CardHeader from "./card-header-component";
import cardHeader from './card-header';
import cardFooter from "./card-footer";
import CardFooter from "./card-footer-component";
import content from "./card-content";
import CardContent from "./card-content-component";

type Props = {
  className?: string;
  children: React.ReactNode;
  header?: cardHeader;
  footer?: cardFooter;
}

const Card = ({ children, header=null, footer=null, className="" }: Props) => {

  const c = new content(children)
  
  return (<>
      <div className={`card form-fields flex flex-col justify-between px-2 rounded-lg w-full h-full ${className}`}>
        <CardHeader header={header}/>
        <CardContent content={c}/>
        <div className="flex flex-col justify-start mb-5"><CardFooter footer={footer}/></div>
      </div>
  </>)
}

export default Card