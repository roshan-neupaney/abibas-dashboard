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
import { beautifyAllWatchList } from "../../../../utilities/beautify";

const WatchLists = ({ watchList }: any) => {
  const [pageSize, setPageSize] = useState(watchList?.paginationDto?.pageSize);
  const beautifiedData = beautifyAllWatchList(watchList);
  const [data, setData] = useState(beautifiedData);

  useEffect(() => {
    const beautifiedData = beautifyAllWatchList(watchList);
    setData(beautifiedData);
    setPageSize(watchList?.paginationDto?.pageSize);
  }, [watchList, watchList?.paginationDto?.pageSize]);

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
            page={watchList.paginationDto.page}
            totalData={watchList.totalCount}
          />
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default WatchLists;
