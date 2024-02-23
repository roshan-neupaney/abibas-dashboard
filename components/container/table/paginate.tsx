import Image from "next/image";
import arrowLeft from "../../../public/icons/arrow-left.svg";
import arrowRight from "../../../public/icons/arrow-right.svg";
import doubleArrowLeft from "../../../public/icons/double-left-arrow.svg";
import doubleArrowRight from "../../../public/icons/double-right-arrow.svg";
import { tablePaginationSizes } from "../../../config/constants";

interface TablePaginationProps {
  table: any;
}

const TablePagination = ({
  table,
}: TablePaginationProps) => {
  let page_index = table.getState().pagination.pageIndex;
  let pageCount = table.getPageCount();
  let pageSize = table.getState().pagination.pageSize
  return (
    <>
      <div className="paginate-container ">
        <div className="flex row align-center">
          <div className="flex row">
            <button
              className="paginate-buttons"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <Image src={doubleArrowLeft} alt="" width={20} height={20} />
            </button>
            <button
              className="paginate-buttons"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <Image src={arrowLeft} alt="" width={20} height={20} />
            </button>
            <div
              className={`${
                page_index == 0 ? "paginate-buttons-active" : "paginate-buttons"
              }`}
              onClick={() => table.setPageIndex(0)}
            >
              <span className="paginate-label">1</span>
            </div>
            {(page_index <= 2 || pageCount <= 5) && !(pageCount <= 2) && (
              <div
                className={`${
                  page_index == 1
                    ? "paginate-buttons-active"
                    : "paginate-buttons"
                }`}
                onClick={() => table.setPageIndex(1)}
              >
                <span className="paginate-label">2</span>
              </div>
            )}
            {(page_index < 3 || pageCount <= 5) && !(pageCount <= 3) && (
              <div
                className={`${
                  page_index == 2
                    ? "paginate-buttons-active"
                    : "paginate-buttons"
                }`}
                onClick={() => table.setPageIndex(2)}
              >
                <span className="paginate-label">3</span>
              </div>
            )}
            {pageCount === 5 && (
              <div
                className={`${
                  page_index == 3
                    ? "paginate-buttons-active"
                    : "paginate-buttons"
                }`}
                onClick={() => table.setPageIndex(3)}
              >
                <span className="paginate-label">4</span>
              </div>
            )}

            {page_index >= 3 && page_index < pageCount - 3 && (
              <>
                <div className="paginate-buttons paginate-dots">
                  <span className="paginate-label">...</span>
                </div>
                <div className="paginate-buttons-active">
                  <span className="paginate-label">{page_index + 1}</span>
                </div>{" "}
              </>
            )}
            {page_index >= pageCount - 3 &&
              !(pageCount <= 3) &&
              pageCount > 5 && (
                <>
                  <div className="paginate-buttons paginate-dots">
                    <span className="paginate-label">...</span>
                  </div>
                  <div
                    className={`${
                      page_index == pageCount - 3
                        ? "paginate-buttons-active"
                        : "paginate-buttons"
                    }`}
                    onClick={() => table.setPageIndex(pageCount - 3)}
                  >
                    <span className="paginate-label">{pageCount - 2}</span>
                  </div>
                  <div
                    className={`${
                      page_index == pageCount - 2
                        ? "paginate-buttons-active"
                        : "paginate-buttons"
                    }`}
                    onClick={() => table.setPageIndex(pageCount - 2)}
                  >
                    <span className="paginate-label">{pageCount - 1}</span>
                  </div>
                </>
              )}
            {page_index < pageCount - 3 && pageCount > 5 && (
              <div className="paginate-buttons paginate-dots">
                <span className="paginate-label">...</span>
              </div>
            )}
            {pageCount != 1 && (
              <div
                className={`${
                  page_index == pageCount - 1
                    ? "paginate-buttons-active"
                    : "paginate-buttons"
                }`}
                onClick={() => table.setPageIndex(pageCount - 1)}
              >
                <span className="paginate-label">{pageCount}</span>
              </div>
            )}
            <button
              className="paginate-buttons"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <Image src={arrowRight} alt="" width={20} height={20} />
            </button>
            <button
              className="paginate-buttons"
              onClick={() => table.setPageIndex(table.getPageCount()-1)}
              disabled={!table.getCanNextPage()}
            >
              <Image src={doubleArrowRight} alt="" width={20} height={20} />
            </button>
          </div>
          {/* <div className="flex row ml-4">
            <span className="flex row">
              Showing{"  "}
              {currentPage * itemsPerPage + 1} -{" "}
              {(currentPage + 1) * itemsPerPage > data?.length
                ? data.length
                : (currentPage + 1) * itemsPerPage}{" "}
              of {data?.length}
            </span>
          </div> */}
        </div>
        {/* <span className="">
            | Go to page:{" "}
            <input
              className=""
              style={{border: '1px solid #92959a' , borderRadius: '4px'}}
              type="number"
              defaultValue={1}
              min={1}
              max={pageCount}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
            />
          </span> */}
        <div className="flex align-center gap-2 max-w-[240px] title-medium">
          <span className="title-medium">Show</span>
          <select
            name="page-size"
            id="page-size"
            className="w-[70px] outline-none p-2"
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {tablePaginationSizes.map((items: any, index: any) => {
              return (
                <option
                  key={index}
                  className="title-medium"
                  value={items.value}
                >
                  {items.value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default TablePagination;
