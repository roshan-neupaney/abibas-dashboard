"use client";

import CustomTableBody from "../../../../components/container/table/tableBody";
import TableContainer from "../../../../components/container/table/tableContainer";
import CustomTableHead from "../../../../components/container/table/tableHead";
import CustomInput from "../../../../components/input";
import PageHeader from "../../../../components/pageHeader";
import React, { useMemo, useState } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import car1 from "../../../../public/images/663577d5df4430a91ce27342ebd8d29f.png";
import thar from "../../../../public/images/thar.png";
import car2 from "../../../../public/images/car2.png";
import TablePagination from "../../../../components/container/table/paginate";
import itemslist from "../../../../data.json";

const Inventory = () => {
  const list = itemslist;

  const [data, setData] = useState(list);
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
      <PageHeader title="Inventory" />
      <div>
        <TableContainer {...{ getTableProps }}>
          <CustomTableHead {...{ headerGroups }} />
          <CustomTableBody
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
    </>
  );
};

export default Inventory;
