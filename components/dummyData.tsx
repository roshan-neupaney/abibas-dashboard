"use client";

import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import TableContainer from "./container/table/tableContainer";
import CustomTableHead from "./container/table/tableHead";
import CustomTableBody from "./container/table/tableBody";
import TablePagination from "./container/table/paginate";
import NoDataFound from "./noDataFound";
import { useMemo } from "react";
import Image from "next/image";

const DummyData = ({ data }: any) => {
  // console.log("data", data);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
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
        Header: "Image",
        accessor: "image",
      },
      // {
      //   Header: "Offers",
      //   accessor: "description",
      // },
      {
        Header: "Test Drives",
        accessor: "category",
      }
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
    <div>
      {data?.length > 0 ? (
        <div style={{ border: "1px solid #d8dadb" }}>
          <TableContainer {...{ getTableProps }}>
            <CustomTableHead {...{ headerGroups }} />
            <CustomTableBody
              titleImage="image"
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
        {data?.map((items: any, index: number)=> {
          return (
            <div key={index} className="flex row gap-5 w-[500px]">
              <Image src={items.image} alt="images" width={40} height={40} />
              {items.image}
            </div>
          )
        })}
    </div>
  );
};

export default DummyData;
