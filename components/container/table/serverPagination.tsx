import Image from "next/image";
import arrowLeft from "../../../public/icons/arrow-left.svg";
import arrowRight from "../../../public/icons/arrow-right.svg";
import doubleArrowLeft from "../../../public/icons/double-left-arrow.svg";
import doubleArrowRight from "../../../public/icons/double-right-arrow.svg";
import { tablePaginationSizes } from "../../../config/constants";
import { useRouter } from "next/navigation";

interface ServerPaginationProps {
  page: number;
  pageSize: number;
  setPageSize?: any;
  totalData: number;
}

const ServerPagination = ({
  page,
  pageSize,
  setPageSize,
  totalData,
}: ServerPaginationProps) => {
  const pageCount = Math.ceil(totalData / pageSize);
  const canPreviousPage = page > 1;
  const canNextPage = page < pageCount;
  const router = useRouter();
  return (
    <>
      <div className="paginate-container ">
        <div className="flex items-center">
          <div className="flex">
            <button
              className="paginate-buttons"
              onClick={() => router.push(`?page=1&pageSize=${pageSize}`)}
              disabled={!canPreviousPage}
            >
              <Image src={doubleArrowLeft} alt="" width={20} height={20} />
            </button>
            <button
              className="paginate-buttons"
              onClick={() =>
                router.push(`?page=${page - 1}&pageSize=${pageSize}`)
              }
              disabled={!canPreviousPage}
            >
              <Image src={arrowLeft} alt="" width={20} height={20} />
            </button>
            <button
              className="paginate-buttons"
              onClick={() =>
                router.push(`?page=${page + 1}&pageSize=${pageSize}`)
              }
              disabled={!canNextPage}
            >
              <Image src={arrowRight} alt="" width={20} height={20} />
            </button>
            <button
              className="paginate-buttons"
              onClick={() =>
                router.push(`?page=${pageCount}&pageSize=${pageSize}`)
              }
              disabled={!canNextPage}
            >
              <Image src={doubleArrowRight} alt="" width={20} height={20} />
            </button>
          </div>
          <div className="flex ml-4">
            <span className="flex row">
              Showing{"  "}
              {(page - 1) * pageSize + 1} -{" "}
              {page * pageSize > totalData ? totalData : page * pageSize} of{" "}
              {totalData}
            </span>
          </div>
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
        <div className="flex items-center gap-2 max-w-[240px] title-medium">
          <span className="title-medium">Show</span>
          <select
            name="page-size"
            id="page-size"
            className="w-[70px] outline-none p-2"
            value={pageSize}
            onChange={(e) => router.push(`?page=1&pageSize=${e.target.value}`)}
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

export default ServerPagination;
