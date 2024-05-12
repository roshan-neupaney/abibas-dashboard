"use client";
import CustomTableBody from "../../../../components/container/table/tableBody";
import TableContainer from "../../../../components/container/table/tableContainer";
import CustomTableHead from "../../../../components/container/table/tableHead";
import TablePagination from "../../../../components/container/table/paginate";
import { dataType, itemslist } from "../../../../data";
import NoDataFound from "../../../../components/noDataFound";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const Bookings = () => {
  const data = itemslist;
  const columns: ColumnDef<dataType>[] = [
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
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {data?.length > 0 ? (
        <div style={{ border: "1px solid #d8dadb" }}>
          <TableContainer>
            <CustomTableHead {...{ table }} />
            <CustomTableBody
              internalTitleRoute="/admin/bookings/detail/id"
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

export default Bookings;
