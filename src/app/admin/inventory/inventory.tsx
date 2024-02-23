"use client";

import CustomTableBody from "../../../../components/container/table/tableBody";
import TableContainer from "../../../../components/container/table/tableContainer";
import CustomTableHead from "../../../../components/container/table/tableHead";
import React, { useMemo } from "react";
import TablePagination from "../../../../components/container/table/paginate";
import { itemslist, dataType } from "../../../../data";
import NoDataFound from "../../../../components/noDataFound";
import { CircularLoader } from "../../../../components/loader/loader";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const Inventory = () => {
  const data = itemslist;

  // const [data, setData] = useState(list);
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
        accessor: "status",
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

  return (
    <>
      {data.length > 0 ? (
        <div style={{ border: "1px solid #d8dadb" }}>
          <TableContainer>
            <CustomTableHead {...{ table }} />
            <CustomTableBody
              internalTitleRoute="/admin/inventory/detail/id"
              titleImage="media"
              firstSubTitle="fuel"
              secondSubTitle="driven"
              thirdSubTitle="mode"
              {...{ table }}
            />
          </TableContainer>
          <TablePagination {...{ table }} />
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default Inventory;
