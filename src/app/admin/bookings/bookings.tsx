"use client";
import CustomTableBody from "../../../../components/container/table/tableBody";
import TableContainer from "../../../../components/container/table/tableContainer";
import CustomTableHead from "../../../../components/container/table/tableHead";
import { dataType } from "../../../../data";
import NoDataFound from "../../../../components/noDataFound";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ServerPagination from "../../../../components/container/table/serverPagination";
import { useEffect, useState } from "react";
import { beautifyAllBookingList } from "../../../../utilities/beautify";

const Bookings = ({ bookingList }: any) => {
  const [pageSize, setPageSize] = useState(
    bookingList?.paginationDto?.pageSize
  );
  const beautifiedData = beautifyAllBookingList(bookingList);
  const [data, setData] = useState(beautifiedData);

  useEffect(() => {
    const beautifiedData = beautifyAllBookingList(bookingList);
    setData(beautifiedData);
    setPageSize(bookingList?.paginationDto?.pageSize);
  }, [bookingList]);

  const columns: ColumnDef<dataType>[] = [
    {
      header: "Name",
      accessorKey: "title",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
  ];

  const table = useReactTable({
    columns,
    data,
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  
  return (
    <>
      {data?.length > 0 ? (
        <div style={{ border: "1px solid #d8dadb" }}>
          <TableContainer>
            <CustomTableHead {...{ table }} />
            <CustomTableBody titleImage="media" {...{ table }} />
          </TableContainer>
          <ServerPagination
            setPageSize={setPageSize}
            pageSize={pageSize}
            page={bookingList.paginationDto.page}
            totalData={bookingList.totalCount}
          />
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default Bookings;
