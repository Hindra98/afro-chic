import {
  ColumnDirective,
  ColumnsDirective,
  Edit,
  ExcelExport,
  ExcelExportProperties,
  Filter,
  Sort,
  GridComponent,
  Inject,
  Page,
  PdfExport,
  PdfExportProperties,
  Resize,
  Selection,
  RecordClickEventArgs,
} from "@syncfusion/ej2-react-grids";
import { ReactElement, useEffect, useRef, useState } from "react";
import "../../../styles/_notifications.scss";
import iconUser from "../../../assets/images/user.png";
import { useAppDispatch, useAppSelector } from "../../../core/hooks/core-hooks";
import { useLocalizer } from "../../../core/Localization";
import { deleteUser, getUser, getUsers, lockUser } from "../../../store-management/actions/users/users-actions";
import Breadcrumb from "../../../components/shared/breadcrumb";
import ToolsbarOptions from "../../../components/shared/grid-components/toolsbar-options";
import emptyrecords from "../../../components/shared/grid-components/empty-records";
import { GridConstants } from "../../../core/constants/data-grid";

function statusTemplate(props: UserRowData) {
  return (
    <span
      className={`status rounded-xl text-center py-1 px-3 ${props.isLockedout ? "active" : "inactive"
        } `}
    >
      {props.isLockedout ? "active" : "inactive"}
    </span>
  );
}
function nameTemplate(props: UserRowData) {
  return (
    <span
      className={`name-link cursor-pointer hover:text-blue-900 hover:underline hover:font-bold`}
    >
      {props.userName}
    </span>
  );
}
function fullNameTemplate(props: UserRowData) {
  return (
    <span
      className={`name-link cursor-pointer hover:text-blue-900 hover:underline hover:font-bold`}
    >
      {props.fullName}
    </span>
  );
}

const UsersDataGrid = () => {
  const commonLocalizer = useLocalizer("Common-ResCommon");
  // const [isShowBackdrop, setShowBackdrop] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // const [userId, setUserId] = useState<string>("");
  // const [emailUser, setEmailUser] = useState<string>("");
  // const [fullnameUser, setFullnameUser] = useState<string>("");
  // const [usernameUser, setUsernameUser] = useState<string>("");
  // const sidebarInstance = useRef<SidebarComponent>(null);
  // const resetPasswordSidebarInstance = useRef<SidebarComponent>(null);
  const grid = useRef<GridComponent>(null);
  const dispatch = useAppDispatch();

  const getAllUsers = useAppSelector((state) => state.getUsers);

  const [getRefresh, setGetRefresh] = useState(false);
  const [checkRow, setCheckRow] = useState(false);
  const [checkUniqueRow, setCheckUniqueRow] = useState(false);
  const openDialog = useState(false);
  const [titleDialog, setTiltleDialog] = useState("");
  const [btnDialog, setBtnDialog] = useState<{ type: string; name: string; css: string; handleClick: () => void; }[]>([]);
  const [messageDialog, setMessageDialog] = useState<ReactElement>(null);
  const [getUserLock, setGetUserLock] = useState<UserRowData>(null);
  const exportFilename = "utilisateur";
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const getUsersData = () => {
    dispatch(getUsers());
  };
  const getUserInfos = (id: string) => {
    dispatch(getUser({ key: id } as UserCommand));
  };
  const lockOutUser = (id: string, enabled: boolean) => {
    dispatch(lockUser({ userId: id, enabled: enabled } as LockUserCommand));
  };
  function CheckRowsTemplate() {
    const [check, setCheck] = useState(false)
    const handleSelectAllRows = () => {
      const tabs: number[] = [];
      for (let key = 0; key < rowsPerPage; key++) { tabs.push(key) }
      if ((grid?.current?.getAllDataRows().length ?? 0 ) > 0) {
        (check) ? grid?.current?.selectRows([]) : grid?.current?.selectRows(tabs);
        setCheck(!check);
        setCheckRow(!check);
        setCheckUniqueRow(false);
      }
    }
    return (
      <div className="ms-[8px]" onClick={handleSelectAllRows}>
        <span className={`cursor-pointer icon ${check ? "checkicon- text-blue-900" : "check-emptyicon-"} text-[19px]`}></span>
      </div>
    );
  }

  useEffect(() => {
    setCheckRow((grid?.current as GridComponent)?.getSelectedRecords()?.length > 0);
    setCheckUniqueRow(grid?.current?.getSelectedRecords()?.length === 1);
  }, [grid]);

  if (
    !getRefresh &&
    !getAllUsers?.pending &&
    getAllUsers?.errors?.length === 0
  ) {
    getUsersData();
    setGetRefresh(true);
  }

  const [tenantViewModel, setUserViewModel] = useState<any>({});

  // const handleActionBegin = (args: any) => {
  //   if (args.requestType === "add" || args.requestType === "beginEdit") {
  //     sidebarInstance?.current?.toggle();
  //     setShowBackdrop(true);
  //     args.cancel = true;
  //   }
  // };

  // const handleResetPassword = () => {
  //   if (grid?.current) {
  //     const selectedRecords =
  //       grid?.current?.getSelectedRecords() as UserRowData[];
  //     if (selectedRecords?.length === 1) {
  //       setUserId(selectedRecords[0]?.key);
  //       console?.log("selectedRecords: ", selectedRecords);
  //       setEmailUser(selectedRecords[0]?.email);
  //       setFullnameUser(selectedRecords[0]?.fullName);
  //       setUsernameUser(selectedRecords[0]?.userName);
  //       resetPasswordSidebarInstance?.current?.toggle();
  //       setShowBackdrop(true);
  //     } else {
  //       setTiltleDialog(`Erreur!!!`);
  //       setMessageDialog(<p>Vous devez selectionner au moins un utilisateur pour cette opération</p>);
  //       setBtnDialog([
  //         {
  //           type: "button",
  //           name: "Ok",
  //           css: "okBtn",
  //           handleClick: () => openDialog[1](false),
  //         }
  //       ]);
  //       openDialog[1](true);
  //     }
  //   }
  // };

  const handleLockOutUser = () => {
    if (grid?.current) {
      const selectedRecords =
        grid?.current?.getSelectedRecords() as UserRowData[];
      if (selectedRecords?.length === 1) {
        setGetUserLock(selectedRecords[0]);
        setTiltleDialog(
          `${selectedRecords[0]?.isLockedout ? "Désactiver" : "Activer"
          } l'utilisateur`
        );
        setMessageDialog(
          <p>
            Voulez-vous vraiment{" "}
            {selectedRecords[0]?.isLockedout ? "désactiver" : "activer"} cet
            utilisateur : <b>{selectedRecords[0]?.fullName}</b> ?{" "}
          </p>
        );
        setBtnDialog([
          {
            type: "button",
            name: "Annuler",
            css: "cancelBtn",
            handleClick: () => openDialog[1](false),
          },
          {
            type: "button",
            name: "Confirmer",
            css: "okBtn",
            handleClick: () => { lockOutUser(getUserLock?.key, getUserLock?.isLockedout); openDialog[1](false) }
          },
        ]);
        openDialog[1](true);
      } else {
        setTiltleDialog(`Erreur!!!`);
        setMessageDialog(<p>Vous devez selectionner au moins un utilisateur pour cette opération</p>);
        setBtnDialog([
          {
            type: "button",
            name: "Ok",
            css: "okBtn",
            handleClick: () => openDialog[1](false),
          }
        ]);
        openDialog[1](true);
      }
    }
  };

  const handleAdd = () => {
    if (grid.current) {
      setIsEditing(false);
      getUserInfos("");
      grid.current.addRecord();
    }
  };

  const handleClickRecord = (e: RecordClickEventArgs) => {
    if (grid.current) {
      const index = e.cellIndex as number;
      const keyRecord = e.rowData as UserRowData;

      const selectedRecordsLength =
        grid.current.getSelectedRecords() as UserRowData[];
      if (
        selectedRecordsLength.length > 1 ||
        selectedRecordsLength.length === 0
      )
        setCheckRow(true);
      else {
        if (selectedRecordsLength[0].key === keyRecord.key)
          setCheckRow(false);
        else setCheckRow(true);
      }
      if (index > 0) {
        getUserInfos(keyRecord.key);
        setIsEditing(true);
        setUserViewModel({ ...tenantViewModel, key: keyRecord.key });
        grid.current.addRecord();
      }
    }
  };

  const handleDelete = () => {
    if (grid.current) {
      const selectedRecords =
        grid.current.getSelectedRecords() as UserRowData[];
      if (selectedRecords.length === 1) {
        setTiltleDialog(`Suppression d'un utilisateur: ${selectedRecords[0]?.userName}`);
        setMessageDialog(
          <p>
            Voulez-vous vraiment supprimer cet utilisateur : <b>{selectedRecords[0]?.fullName}</b> ?{" "}
          </p>
        );
        setBtnDialog([
          {
            type: "button",
            name: "Annuler",
            css: "cancelBtn",
            handleClick: () => openDialog[1](false),
          },
          {
            type: "button",
            name: "Confirmer",
            css: "okBtn",
            handleClick: () => { dispatch(deleteUser({ key: selectedRecords[0].key.toString() })); openDialog[1](false) }
          },
        ]);
        openDialog[1](true);

        // grid.current.deleteRecord();
      } else {
        setTiltleDialog(`Erreur!!!`);
        setMessageDialog(<p>Vous devez selectionner au moins un utilisateur pour cette opération</p>);
        setBtnDialog([
          {
            type: "button",
            name: "Ok",
            css: "okBtn",
            handleClick: () => openDialog[1](false),
          }
        ]);
        openDialog[1](true);
      }
    }
  };

  const editSettings: any = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Normal",
    allowEditOnDblClick: false,
  };
  const handlePageChange = (page: number) => {
    (grid.current as GridComponent).pageSettings.currentPage = page;
    setCurrentPage(page);
  };
  const handleSearch = (searchText: string) => {
    console.log("handle", searchText);
  };

  const select: any = {
    persistSelection: true,
    type: "Single",
    checkboxOnly: false,
    mode: "Both",
    checkboxMode: "ResetOnRowClick",
  };

  const gridFilter: any = { type: "Menu" };
  const pdfExportProperties: PdfExportProperties = {
    header: {
      fromTop: 0,
      height: 130,
      contents: [
        {
          type: "Line",
          style: { penColor: "#000080", penSize: 2, dashStyle: "Solid" },
          points: { x1: 0, y1: 4, x2: 685, y2: 4 },
        },
        {
          type: "Text",
          value: "Liste des utilisateurs ",
          position: { x: 200, y: 50 },
          style: { textBrushColor: "#000000", fontSize: 20 },
        },
      ],
    },
    footer: {
      fromBottom: 10,
      height: 60,
      contents: [
        {
          type: "Line",
          style: { penColor: "#000080", penSize: 2, dashStyle: "Dot" },
          points: { x1: 0, y1: 4, x2: 685, y2: 4 },
        },
        {
          type: "PageNumber",
          pageNumberType: "Arabic",
          format: "Page {$current} sur {$total}", //optional
          position: { x: 0, y: 25 },
          style: { textBrushColor: "#4169e1", fontSize: 15, hAlign: "Center" },
        },
      ],
    },
    exportType: "CurrentPage",
  };

  const ExportPdf = () => {
    (grid.current as GridComponent)?.pdfExport({
      ...pdfExportProperties,
      fileName: `${exportFilename}.pdf`,
    });
  };
  const ExportExcel = () => {
    const excelExportProperties: ExcelExportProperties = {
      exportType: "CurrentPage",
      fileName: `${exportFilename}.xlsx`,
    };
    (grid.current as GridComponent)?.excelExport({ ...excelExportProperties });
  };
  const ExportCsv = () => {
    const excelExportProperties: ExcelExportProperties = {
      exportType: "CurrentPage",
      fileName: `${exportFilename}.csv`,
    };
    (grid.current as GridComponent)?.csvExport({ ...excelExportProperties });
  };

  const toolbar = ["Add", "Delete", "Update", "Cancel", "Edit", "Search", "Print", "PdfExport", "ExcelExport", "CsvExport", "WordExport"]

  window.document.title = "Utilisateurs";
  return (
    <div className="h-full flex flex-col justify-start mx-auto notifications-component">
      <div
        className={` text-3xl align-top flex flex-col justify-start ps-10 pt-4 flex-wrap my-2 gap-0 `}
      >
        <h1 className="">{"Utilisateurs"}</h1>
        <Breadcrumb
          items={[
            {
              title: commonLocalizer("MODULE_COMMON_SIDEBAR_DASHBOARD"),
              link: "/dashboard",
            },
            { title: "Utilisateurs" },
          ]}
        />
      </div>

      {/* <ToolsbarOptions
        ToolsbarActionItem={[
          {
            icon: "user-addicon-",
            name: "Ajouter",
            handleClick: () => handleAdd(),
          },
          {
            icon: "trash-emptyicon-",
            name: "Supprimer",
            handleClick: () => handleDelete(),
            disabled: !checkRow,
          },
          {
            icon: "ccwicon-",
            name: "Rafraichir",
            handleClick: () => dispatch(getUsers()),
          },
        ]}
        allowExportPdf
        allowExportCsv
        allowExportExcel
        handleExportPdf={ExportPdf}
        handleExportExcel={ExportExcel}
        handleExportCsv={ExportCsv}
        enablePager
        pager={{ align: "right" }}
        enablePagination
        pagination={{
          currentPage: currentPage,
          rowsPerPage: rowsPerPage,
          totalPages: parseInt(getAllUsers?.value?.users?.length.toString()),
          handleChangePage: handlePageChange,
        }}
        enableSearch
        search={{ handleSearch: handleSearch }}
      /> */}
      <GridComponent
        dataSource={getAllUsers.value.users}
        id="notifications-grid"
        cssClass="mx-2"
        loadingIndicator={{ indicatorType: "Shimmer" }}
        toolbar={toolbar}
        allowResizing={true}
        enableHover={true}
        allowSorting={false}
        allowFiltering={true}
        // actionBegin={handleActionBegin}
        recordClick={handleClickRecord}
        emptyRecordTemplate={() =>
          emptyrecords(
            "Aucun utilisateur trouvée",
            iconUser,
            getAllUsers.pending,
            "w-1/12"
          )
        }
        resizeSettings={{ mode: "Auto" }}
        rowHeight={38}
        height={GridConstants.HEIGHT}
        filterSettings={gridFilter}
        allowSelection={true}
        selectionSettings={select}
        enableHeaderFocus={true}
        allowPaging={true}
        autoFit={true}
        allowPdfExport={true}
        allowExcelExport={true}
        editSettings={editSettings}
        pageSettings={{ pageCount: 2, pageSize: rowsPerPage }}
        ref={grid}
      >
        <ColumnsDirective>
          <ColumnDirective
            type="checkbox"
            allowSorting={false}
            allowFiltering={false}
            headerTemplate={CheckRowsTemplate}
            width="40"
          ></ColumnDirective>
          <ColumnDirective
            field="key"
            visible={false}
            headerText="User Id"
            isPrimaryKey={true}
            width="auto"
          ></ColumnDirective>
          <ColumnDirective
            field="fullName"
            headerText="Nom complet"
            template={fullNameTemplate}
            clipMode="EllipsisWithTooltip"
            width="auto"
          />
          <ColumnDirective
            field="userName"
            headerText="Nom d'utilisateur"
            template={nameTemplate}
            clipMode="EllipsisWithTooltip"
            width="auto"
          />
          <ColumnDirective
            field="email"
            headerText="E-mail"
            clipMode="EllipsisWithTooltip"
            width="auto"
          />
          <ColumnDirective
            field="isLockedout"
            headerText="Etat"
            template={statusTemplate}
            clipMode="EllipsisWithTooltip"
            width="110px"
          />
        </ColumnsDirective>
        <Inject
          services={[
            Page,
            Filter,
            Sort,
            PdfExport,
            ExcelExport,
            Resize,
            Selection,
            Edit,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default UsersDataGrid;
