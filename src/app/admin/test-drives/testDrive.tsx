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
import { beautifyAllTestDriveList } from "../../../../utilities/beautify";

const TestDrives = ({ testDriveList }: any) => {
  const [pageSize, setPageSize] = useState(
    testDriveList?.paginationDto?.pageSize
  );
  const beautifiedData = beautifyAllTestDriveList(testDriveList);
  const [data, setData] = useState(beautifiedData);

  useEffect(() => {
    const beautifiedData = beautifyAllTestDriveList(testDriveList);
    setData(beautifiedData);
    setPageSize(testDriveList?.paginationDto?.pageSize);
  }, [testDriveList]);

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
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Time",
      accessorKey: "time",
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
            page={testDriveList.paginationDto.page}
            totalData={testDriveList.totalCount}
          />
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default TestDrives;
