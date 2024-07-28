import "../../styles/components/_shimmer.scss";

type Props = {classe: string}

export const ShimmerText = () => {
  return (
    <div id="container">
      <div id="content">
        <div id="content-desc">
          <div className="line shimmer"></div>
          <div className="line shimmer"></div>
          <div className="line shimmer"></div>
          <div className="line shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export const ShimmerTitle = () => {
  return (
    <div id="container">
      <div id="content">
        <div id="content-title" className="shimmer"></div>
      </div>
    </div>
  );
};

export const ShimmerBox = ({classe=""}: Props) => {
  return (
    <div id="container">
      <div id="square" className={`shimmer ${classe}`}></div>
    </div>
  );
};

export const ShimmerTextTest = ({n}: {n: number}) => {
  return (
    <div id="container">
      <div id="content">
        <div id="content-desc">
          {[...Array(n)].map((e,i) => <div className="line shimmer" key={i}></div>)}
        </div>
      </div>
    </div>
  );
};
