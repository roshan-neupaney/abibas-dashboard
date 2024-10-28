import { flexRender } from "@tanstack/react-table";
import Image from "next/image";
import CaretUp from "../../../public/icons/caret-up.svg";
import CaretDown from "../../../public/icons/caret-down.svg";

const CustomTableHead = ({ table }: any) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup: any, i: number) => {
        return (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: any, index: number) => {
              return (
                <th
                  className="label-large text-left table-head"
                  key={index}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      <div className="flex gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {!(
                          header.id == "image" ||
                          header.id == "action" ||
                          header.id == "selection"
                        ) && (
                          <div>
                            <span
                              style={{
                                visibility:
                                  header.column.getIsSorted() === "asc"
                                    ? "hidden"
                                    : "visible",
                              }}
                            >
                              <Image
                                src={CaretUp}
                                width={10}
                                height={10}
                                alt=""
                              />
                            </span>
                            <span
                              style={{
                                visibility:
                                  header.column.getIsSorted() === "desc"
                                    ? "hidden"
                                    : "visible",
                              }}
                            >
                              <Image
                                src={CaretDown}
                                width={10}
                                height={10}
                                alt=""
                              />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
};

export default CustomTableHead;
