import {
  DropDownButtonComponent,
  ItemModel,
} from "@syncfusion/ej2-react-splitbuttons";
import "../../../styles/components/_grid-toolsbar.scss";
import SearchBox from "./search-box";
import Pagination from "./pagination";

const ToolsbarOptions = (props: ToolsbarOptions) => {
  const FilterExportPDFToolsbarMenu: ItemModel[] = props?.allowExportPdf
    ? [
        {
          text: "PDF",
          iconCss: "e-icons icon file-pdficon- ",
          id: "pdf",
        },
      ]
    : [];
  const FilterExportExcelToolsbarMenu: ItemModel[] = props?.allowExportExcel
    ? [
        {
          text: "Excel",
          iconCss: "e-icons icon file-excelicon- ",
          id: "excel",
        },
      ]
    : [];
  const FilterExportCsvToolsbarMenu: ItemModel[] = props?.allowExportCsv
    ? [
        {
          text: "CSV",
          iconCss: "e-icons e-export-csv ",
          id: "csv",
        },
      ]
    : [];

  const dropdownMenuToolsbarExportEvent = () => {
    document.getElementById("pdf")?.addEventListener("click", () => {
      props?.handleExportPdf();
    });
    document.getElementById("excel")?.addEventListener("click", () => {
      props.handleExportExcel();
    });
    document.getElementById("csv")?.addEventListener("click", () => {
      props.handleExportCsv();
    });
  };

  const dropdownMenuToolsbarMoreEvent = () => {
    props?.moreActions?.map((moreAction) => (
      document.getElementById(moreAction.id)?.addEventListener("click", () => {
        moreAction.handleClick();
      })
    ))

    
  };

  return (
    <>
      {props?.enablePager && (
        <p
          className={`text-left px-3 grid-size-details ${props?.pager?.css} ${
            {
              left: "me-auto",
              right: "ms-auto",
            }[props?.pager?.align] || "ms-auto"
          } `}
        >
          {props?.pagination?.rowsPerPage * props?.pagination?.currentPage > props?.pagination?.totalPages
            ? props?.pagination?.totalPages
            : props?.pagination?.rowsPerPage * props?.pagination?.currentPage}{" "}
          élement(s) / {props?.pagination?.totalPages}
        </p>
      )}

      <div className="flex flex-row justify-between items-center toolsbar-grid mb-2 mx-2 px-3">
        <div className="flex flex-row gap-3 actions">
          {props?.ToolsbarActionItem?.map((item, key) => (
            <div className={`flex flex-row gap-3`} key={key}>
              <div
                className={`flex items-center gap-0 py-1 item ${item.disabled? 'disabled': ''} ${
                  {
                    top: "flex-col",
                    left: "flex-row",
                    bottom: "flex-col-reverse",
                    right: "flex-row-reverse",
                  }[item?.iconAlign] || "flex-col"
                }`}
                title={item?.name}
                onClick={item.disabled? null : item?.handleClick}
              >
                <span className={`icon ${item?.icon}`}></span>
                <span className="xmd:block xxs:hidden">{item?.name}</span>
              </div>
              {props?.ToolsbarActionItem?.length > key + 1 && (
                <div className="separate "></div>
              )}
            </div>
          ))}
          {(props?.allowExportCsv ||
            props?.allowExportExcel ||
            props?.allowExportPdf) && (
            <>
              <div className="separate "></div>
              <DropDownButtonComponent
                open={dropdownMenuToolsbarExportEvent}
                id="export-toolsbar-menu"
                iconCss="hi"
                cssClass={"p-0 m-0 bg-transparent border-transparent flex flex-row"}
                title="Exporter"
                items={[
                  ...FilterExportPDFToolsbarMenu,
                  ...FilterExportExcelToolsbarMenu,
                  ...FilterExportCsvToolsbarMenu,
                ]}
              >
                <div className="flex flex-col items-center gap-0 py-1 item"><span className={"icon export-1icon-"}></span><span className="xmd:block xxs:hidden">Exporter</span></div>
                
              </DropDownButtonComponent>
            </>
          )}
          {props?.enableMoreActions && (
            <>
              <div className="separate "></div>
              <DropDownButtonComponent
                open={dropdownMenuToolsbarMoreEvent}
                id="export-toolsbar-menu"
                iconCss="hi"
                cssClass={"p-0 m-0 bg-transparent border-transparent flex flex-row mt-auto"}
                title="More actions"
                items={props?.moreActions}
              >
                <span className={"icon dot-3icon-"}></span>
                
              </DropDownButtonComponent>
            </>
          )}
        </div>

        <div className="flex flex-row items-center gap-5">
          {props?.enableSearch && (
            <SearchBox
              icon={props?.search?.icon}
              handleSearch={props?.search?.handleSearch}
            />
          )}

          {props?.enablePagination && (
            <>
              <Pagination
                currentPage={props?.pagination?.currentPage ?? 1}
                totalPages={props?.pagination?.totalPages ?? 0}
                rowsPerPage={props?.pagination?.rowsPerPage}
                isText={props?.pagination?.isText ?? false}
                handleChangePage={props?.pagination?.handleChangePage}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ToolsbarOptions;
