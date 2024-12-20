interface tableContainerProps {
  children: any;
  topRender?: any;
  style?: any;
}

const TableContainer = ({
  children,
  topRender,
  style,
}: tableContainerProps) => {
  return (
    <>
      {/* <PageLoader> */}
      {topRender && <div className="top-render">{topRender}</div>}
      <div
        className="table-container flex justify-start flex-col rounded bg-[#fcfcfc] overflow-auto lg:max-h-[69vh] max-h-[60vh]"
        style={style}
      >
        <table className="table">{children}</table>
      </div>
      {/* </PageLoader> */}
    </>
  );
};

export default TableContainer;
