import "../../styles/components/_button.scss"
type Props = {
  param?: ParamsButton;
};

export default function Button({ param = null }: Props) {
  return (
    <>
      <button
        type={param.type}
        className={`p-2 rounded-md w-full bg-primary text-secondary hover:bg-primary_pl hover:text-secondary hover:font-bold transition ${param?.css}`}
        disabled={param?.disabled}
        onClick={param.handleClick}
      >
        {param.name}
      </button>
    </>
  );
}
