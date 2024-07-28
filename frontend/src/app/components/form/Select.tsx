import "../../styles/components/_select-input.scss";

type ParamsSelect = {
  name?: string;
  value?: string;
  img?: string;
};

type Props = {
  name?: string;
  css?: string;
  defaultOption?: string;
  icon?: string;
  handleChange?: (e) => void;
  param?: ParamsSelect[];
};

export default function Select({ name = "", css = "", defaultOption = "", icon = "", handleChange = null, param = [] }: Props) {
  const iconeSelect = icon !== "" && (<i className={"e-icons icon " + icon}></i>);
  return (
    <div className={`select-dashboard group cursor-pointer h-min ps-1 bg-gray-50 text-gray-900 text-sm rounded-lg border m-0 ${css}`}>
      {iconeSelect}
      <select
        title={""}
        name={name}
        className={`select-input text-gray-900 text-sm cursor-pointer outline-none border-none bg-transparent ps-6 m-0 py-1 pe-7`}
        onChange={handleChange}
      >
        <option disabled>{defaultOption}</option>
        {param.map((option, key) => (
          <option value={option.value} key={key}>
            {option?.img ? <img src={option.img} alt={option.name} /> : null}
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
