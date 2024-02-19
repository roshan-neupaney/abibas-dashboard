"use client";

import CustomTableBody from "../../../../components/container/table/tableBody";
import TableContainer from "../../../../components/container/table/tableContainer";
import CustomTableHead from "../../../../components/container/table/tableHead";
import React, { Suspense, useMemo, useState } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import TablePagination from "../../../../components/container/table/paginate";
import { itemslist } from "../../../../data";
import NoDataFound from "../../../../components/noDataFound";
import { CircularLoader } from "../../../../components/loader/loader";

const Customers = () => {
  const data = itemslist;

  // const [data, setData] = useState(list);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Vehicle",
        accessor: "title",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Offers",
        accessor: "offers",
      },
      // {
      //   Header: "Fuel",
      //   accessor: "fuel",
      // },
      // {
      //   Header: "Driven",
      //   accessor: "driven",
      // },
      // {
      //   Header: "Mode",
      //   accessor: "mode",
      // },
      {
        Header: "Test Drives",
        accessor: "test_drive",
      },
      {
        Header: "Favorites",
        accessor: "favorite",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // @ts-ignore
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    pageOptions,
    setPageSize,
    pageCount,
    // getToggleHideAllColumnsProps,
    // allColumns,
    state: { pageIndex, pageSize },
  }: // exportData,
  any = useTable(
    {
      // @ts-ignore
      columns,
      data: data || [],
      initialState:
        // @ts-ignore
        { pageIndex: 0 },
      // @ts-ignore
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      {data.length > 0 ? (
          <div style={{ border: "1px solid #d8dadb" }}>
            <TableContainer {...{ getTableProps }}>
              <CustomTableHead {...{ headerGroups }} />
              <CustomTableBody
                internalTitleRoute="/admin/customers/detail/id"
                titleImage="media"
                firstSubTitle="fuel"
                secondSubTitle="driven"
                thirdSubTitle="mode"
                {...{ getTableBodyProps, prepareRow, page }}
              />
            </TableContainer>
            <TablePagination
              {...{
                nextPage,
                previousPage,
                canPreviousPage,
                canNextPage,
                pageIndex,
                gotoPage,
                pageCount,
                setPageSize,
                pageSize,
              }}
            />
          </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default Customers;
