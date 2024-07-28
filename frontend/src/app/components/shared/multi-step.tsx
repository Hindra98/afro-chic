import "../../styles/components/_multi-step-form.scss";

type params = {
  title?: string
  component?: React.ReactNode;
  isActive?: boolean;
};

type Props = {
  param?: params[];
};

export function MultiStepForm({ param = [] }: Props) {
  return (
    <div className="flex flex-col justify-between items-center w-full gap-10 h-full multi-step-form">
      {param?.map((param, key) => (
        <div className={`${param.isActive ? "active" : "inactive"} step flex flex-row gap-1 items-start w-full`} key={key}>
          <div className="w-full">
            <StepTitle title={param?.title} stepKey={key} active={param.isActive} />
            <div className={`step-form ${param.isActive ? "active" : "inactive"} ms-10 w-11/12`}>
              {param.component}
              {!param.isActive && <div className="overlay"></div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const StepTitle = ({ title="baba", stepKey=0, active=false }) => {
  return (
    <div className="flex flex-row pb-4">
      <div className={`circle border border-black rounded-full ${active ? "active" : "opacity-30"} `}>
        {stepKey + 1}
      </div>
      <h2 className={`text-xl font-bold ${active ? "" : "opacity-50"} `}>{title}</h2>
    </div>
  );
};
