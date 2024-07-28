const Pagination = (props: GridPagination) => {
  return (
    <div className={`pagination flex flex-row justify-end items-center gap-0 ${props?.css}`}>
      <button
        type="button"
        title="Première page"
        disabled={props?.currentPage < 2}
        onClick={(e) => props?.handleChangePage(1)}
      >
        {props?.isText ? ("Première page") : (<span className="icon angle-double-lefticon-"></span>)}
      </button>
      <button
        type="button"
        title="Précedent"
        disabled={props?.currentPage < 2}
        onClick={(e) => props?.handleChangePage(props?.currentPage - 1)}
      >
        {props?.isText ? ("Précedent") : (<span className="icon angle-lefticon-"></span>)}
      </button>
      <button
        type="button"
        title="Suivant"
        disabled={props?.currentPage * props?.rowsPerPage >= props?.totalPages-1}
        onClick={(e) => props?.handleChangePage(props?.currentPage + 1)}
      >
        {props?.isText ? ("Suivant") : (<span className="icon angle-righticon-"></span>)}
      </button>
      <button
        type="button"
        title="Dernière page"
        disabled={props?.currentPage * props?.rowsPerPage >= props?.totalPages-1}
        onClick={(e) => props?.handleChangePage(props?.totalPages/props?.rowsPerPage)}
      >
        {props?.isText ? ("Dernière page") : (<span className="icon angle-double-righticon-"></span>)}
      </button>
    </div>
  );
};

export default Pagination;
