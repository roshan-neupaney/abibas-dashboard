import {PageLoader} from "../../loader/loader";

interface tableContainerProps {
  children: any;
  topRender?: any;
  style?:any
}

const TableContainer = ({
  children,
  topRender,
  style,
}: tableContainerProps) => {
  return (
    <>
    {/* <PageLoader> */}
      <div className="table-container" style={style}>
        {topRender && <div className="top-render">{topRender}</div>}
        <table className="table" >
          {children}
        </table>
      </div>
      {/* </PageLoader> */}
    </>
  );
};

export default TableContainer;
