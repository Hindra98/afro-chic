
type Props = { clicked: () => void };

export default function Hamburger({ clicked }: Props) {
  return (
    <span
      className={
        "e-icons e-menu text-3xl text-black font-black e-inherit logo e-appbar-menu cursor-pointer px-2"
      }
      onClick={clicked}
    ></span>
  );
}
