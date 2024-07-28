import content from "./card-content";

type Props = { content: content | null };

const CardContent = ({ content }: Props) => {
  return (
    <>
      {content?.getContent() !== null && (
        <div className="flex flex-col justify-center gap-2 card-content px-5">
          {content?.getContent()}
        </div>
      )}
    </>
  );
};

export default CardContent;
