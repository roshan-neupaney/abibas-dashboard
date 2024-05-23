import Image from "next/image";
import threeDots from "../../../public/icons/three-dots.svg";
import EditIcon from "../../../public/icons/editIcon.svg";
import DeleteIcon from "../../../public/icons/deleteIcon.svg";
import LazyImage from "../../lazyImage";
import Link from "next/link";
import { flexRender } from "@tanstack/react-table";
import { BASE_URL, IMAGE_URL } from "../../../config/constants";
import { useRouter } from "next/navigation";

interface CustomTableBodyProps {
  table: any;
  titleImage?: string;
  firstSubTitle?: string;
  secondSubTitle?: string;
  thirdSubTitle?: string;
  internalTitleRoute?: string;
  toggleModal?: any;
  hideDelete?: boolean;
  hideEdit?: boolean;
  entireRoute?: string;
}

const CustomTableBody = ({
  table,
  titleImage = "",
  firstSubTitle = "",
  secondSubTitle = "",
  thirdSubTitle = "",
  internalTitleRoute = "",
  toggleModal,
  hideDelete = false,
  hideEdit = false,
  entireRoute = "",
}: CustomTableBodyProps) => {
  const router = useRouter();
  return (
    <tbody>
      {table?.getRowModel()?.rows?.map((row: any, i: number) => {
        return (
          <tr
            className="table-body-row"
            key={i}
            style={{ backgroundColor: i % 2 !== 0 ? "#F0F0F4" : "#FCFCFC" }}
          >
            {row?._getAllVisibleCells().map((cell: any, _index: any) => {
              const id = cell.row.original["id"];
              return (
                <td className="body-medium-NH table-cell" key={_index}>
                  {cell.column.id.includes("image") ? (
                    <div className="table-image relative">
                      <LazyImage
                        src={IMAGE_URL + "small-" + cell?.row.original["image"]}
                        alt="table-image"
                        fill
                        loading="lazy"
                      />
                    </div>
                  ) : cell.column.id == "title" ? (
                    <div
                      className="gap-4 flex"
                      style={{ width: titleImage && "300px" }}
                    >
                      {titleImage && (
                        <div className="table-image relative">
                          <LazyImage
                            src={cell?.row?.original[titleImage]}
                            alt="table-image"
                            width={70}
                            height={50}
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-start items-center body-medium">
                          {internalTitleRoute ? (
                            <Link href={internalTitleRoute}>
                              {cell.row.original["title"]}
                            </Link>
                          ) : (
                            <span>{cell.row.original["title"]}</span>
                          )}
                        </div>
                        <div className="flex gap-4">
                          {firstSubTitle && (
                            <span className="label-medium">
                              {cell.row.original[firstSubTitle]}
                            </span>
                          )}
                          {secondSubTitle && (
                            <span className="label-medium">
                              {cell.row.original[secondSubTitle]}
                            </span>
                          )}
                          {thirdSubTitle && (
                            <span className="label-medium">
                              {cell.row.original[thirdSubTitle]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : cell.column.id == "id" ? (
                    <div className="label-large-NH">
                      {cell.row.original["id"]}
                    </div>
                  ) : cell.column.id == "colors" ? (
                    <div className="flex gap-1">
                      {cell?.row?.original["colors"]?.map((items:any, i:number) => {
                        return (
                          <div
                            className="flex rounded-md"
                            style={{
                              width: 20,
                              height: 20,
                              background: items,
                            }}
                            key={i}
                          ></div>
                        );
                      })}
                    </div>
                  ) : cell.column.id == "status" ? (
                    <div
                      className={`label-medium-NH status-chip ${
                        cell.row.original["status"] == "active"
                          ? "active-chip"
                          : cell.row.original["status"] == "booked"
                          ? "booked-chip"
                          : cell.row.original["status"] == "sold"
                          ? "sold-chip"
                          : "upcoming-chip"
                      }`}
                    >
                      {cell.row.original["status"]}
                    </div>
                  ) : cell.column.id == "action" ? (
                    <div className="flex gap-4">
                      {!hideEdit && (
                        <Link href={entireRoute + "/" + id}>
                          <div className="cursor-pointer">
                            <Image
                              src={EditIcon}
                              width={20}
                              height={20}
                              alt=""
                            />
                          </div>
                        </Link>
                      )}
                      {!hideDelete && (
                        <div
                          className="cursor-pointer"
                          onClick={() => toggleModal({ state: true, id: id })}
                        >
                          <Image
                            src={DeleteIcon}
                            width={20}
                            height={20}
                            alt=""
                          />
                        </div>
                      )}
                      {hideDelete && hideEdit && (
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            toggleModal({
                              state: true,
                              id: cell.row.original["id"],
                            })
                          }
                        >
                          <Image
                            src={threeDots}
                            alt=""
                            width={20}
                            height={20}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="body-medium">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
export default CustomTableBody;
