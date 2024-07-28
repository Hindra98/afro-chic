
interface LinkBredcrumb {
  title?: string;
  link?: string;
}

type Props = {
  items?: LinkBredcrumb[];
  css?: string;
}

const Breadcrumb = (props: Props) => {
  return (
    <p className={`text-base -mt-3 ms-2 breadcrumb font-normal ${props.css}`}>
      {props?.items.map((item, key) => (
        <span key={key}>
          {props.items.length - 1 === key ? <b>{item.title}</b> : <a href={item?.link} >{item?.title}</a>}
          {props.items.length - 1 > key && <span className="icon angle-righticon- mx-2"></span>}
        </span>
      ))}
    </p>
  )
}

export default Breadcrumb