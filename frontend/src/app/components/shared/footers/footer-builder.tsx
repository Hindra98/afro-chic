import { Link } from "react-router-dom";

interface PartOptions{
    position: FooterItemPosition;
    textUnderline: boolean;
    isLink: boolean;
    linkPath: string | null;
}

const positionModality = { CENTER:'mx-auto', RIGHT: 'ms-auto', LEFT: 'me-auto'}

export class FooterBuilder {

    private _data: FooterItemData[] = [];
    private _elements : JSX.Element[] = [];

    private constructor(data: FooterItemData[]){
        this._data = data;
    }

    private Add(params: {dataSlice: FooterItemData[], options: Partial<PartOptions>}) : JSX.Element {

        const positionClassName = params.options.position === 'center' ? positionModality.CENTER : (params.options.position === 'left' ? positionModality.LEFT : positionModality.RIGHT);

        return(
            <div className={`flex flex-row justify-start gap-2 items-center ms-auto ${ positionClassName }`} key={ positionClassName }>
                { 
                   params.dataSlice.map((item, index) => (<Link to={item.to} key={`${index}-${item.name}`}>{ item.name }</Link>
                ))}
            </div>
    )}

    public static Create(data: FooterItemData[]) : FooterBuilder {
        return new FooterBuilder(data);
    }

    public AddPart(options: Partial<PartOptions>): FooterBuilder {

        const itemsToAdd = this._data.filter(i => i.position === options.position);
        this._elements.push(this.Add({dataSlice: itemsToAdd, options: options}))

      return this;
    }

    public Build() : JSX.Element {
        return (<>{this._elements.length > 0 ?
                <footer className = {"footerauth flex flex-row gap-2 w-full px-5 py-3"}>
                    { 
                     this._elements.map((element) => (element))
                    }
                 </footer>  : <></>}</>)
    }
}