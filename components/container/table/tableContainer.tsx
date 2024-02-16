import {PageLoader} from "../../loader/loader";

interface tableContainerProps {
  children: any;
  topRender?: any;
  getTableProps: any;
}

const TableContainer = ({
  children,
  topRender,
  getTableProps,
}: tableContainerProps) => {
  return (
    <>
    {/* <PageLoader> */}
      <div className="table-container">
        {topRender && <div className="top-render">{topRender}</div>}
        <table className="table" {...getTableProps()} >
          {children}
        </table>
      </div>
      {/* </PageLoader> */}
    </>
  );
};

export default TableContainer;
