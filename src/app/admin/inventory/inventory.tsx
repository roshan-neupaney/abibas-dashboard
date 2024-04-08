"use client";

import CustomTableBody from "../../../../components/container/table/tableBody";
import TableContainer from "../../../../components/container/table/tableContainer";
import CustomTableHead from "../../../../components/container/table/tableHead";
import React, { useMemo, useState } from "react";
import TablePagination from "../../../../components/container/table/paginate";
import { itemslist, dataType } from "../../../../data";
import NoDataFound from "../../../../components/noDataFound";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CustomInput from "../../../subComponents/input";
import { useRouter } from "next/navigation";

const Inventory = () => {
  // const data = itemslist;
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [data, setData] = useState(itemslist);

  const columns: ColumnDef<dataType>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "_id",
      },
      {
        header: "Vehicle",
        accessorKey: "title",
      },
      {
        header: "Price",
        accessorKey: "price",
      },
      {
        header: "Offers",
        accessorKey: "offers",
      },
      // {
      //   header: "Fuel",
      //   accessorKey: "fuel",
      // },
      // {
      //   header: "Driven",
      //   accessorKey: "driven",
      // },
      // {
      //   header: "Mode",
      //   accessorKey: "mode",
      // },
      {
        header: "Test Drives",
        accessorKey: "test_drive",
      },
      {
        header: "Favorites",
        accessorKey: "favorite",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Action",
        accessorKey: "action",
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleSearch = (val: string) => {
    try {
      setSearch(val);
      const filteredData = itemslist.filter((items: any) => {
        if (items.title.toLowerCase().includes(val.toLowerCase())) {
          return items;
        }
      });
      setData(filteredData);
    } catch (e) {
      console.log(e);
      setData([]);
    }
  };

  return (
    <>
      <div style={{ border: "1px solid #d8dadb" }}>
        <TableContainer
          topRender={
            <div className="flex  flex-1 gap-2 justify-end">
              <div className="">
                <CustomInput
                  value={search}
                  onChange={(val: string) => handleSearch(val)}
                  placeholder="Search..."
                />
              </div>
              {/* <Link href={`?query=${search}`}> */}

              {/* </Link> */}
            </div>
          }
        >
          {data.length > 0 ? (
            <>
              <CustomTableHead {...{ table }} />
              <CustomTableBody
                internalTitleRoute="/admin/inventory/detail/id"
                titleImage="media"
                firstSubTitle="fuel"
                secondSubTitle="driven"
                thirdSubTitle="mode"
                {...{ table }}
              />
            </>
          ) : (
            <NoDataFound />
          )}
        </TableContainer>
        <TablePagination {...{ table }} />
      </div>
    </>
  );
};

export default Inventory;
