type Props = { src: string; alt: string; title: string; className: string };

export default function Image({ src, alt, title, className = "" }: Props) {
  return (
    <>
      <img src={src} alt={alt} title={title} className={className} />
    </>
  );
}
