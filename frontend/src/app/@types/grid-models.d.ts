
interface GridSearch {
  icon?: string;
  css?: string;
  handleSearch?: (s: string) => void;
}

interface GridPagination {
  isText?: boolean;
  currentPage?: number;
  totalPages?: number;
  rowsPerPage?: number;
  css?: string;
  handleChangePage?: (page: number) => void;
}


interface ToolsbarOptions {
  css?: string;
  ToolsbarActionItem?: {
    icon?: string;
    name?: string;
    disabled?: boolean;
    iconAlign?: 'left' | 'right' | 'top' | 'bottom';
    handleClick?: () => void;
  }[]

  enablePager?: boolean;
  pager?: {
    css?: string;
    align?: 'left' | 'right';
  }

  allowExportPdf?: boolean;
  allowExportExcel?: boolean;
  allowExportCsv?: boolean;
  handleExportPdf?: () => void;
  handleExportExcel?: () => void;
  handleExportCsv?: () => void;


  enableSearch?: boolean;
  search?: GridSearch

  enablePagination?: boolean;
  pagination?: GridPagination;

  enableMoreActions?: boolean;
  moreActions?: {
    iconCss?: string;
    text?: string;
    id: string;
    disabled?: boolean;
    handleClick?: () => void;
  }[];
}
