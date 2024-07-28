import { ComponentRoot } from '../../core/web-component';

/***
 * Renders the specified icon
 * @param props The icon specifications
 */
export function Icon(props: {

    svg: string,
    className?: string,

    /** Tooltip of icon */
    title?: string
}) {
    // Rendering the component  
    return <ComponentRoot elementName="x-icon" className={"app-icon " + props.className}
      title={props.title} dangerouslySetInnerHTML={{__html: props.svg}} />;
}
