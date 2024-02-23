"use client";

import TableContainer from "./container/table/tableContainer";
import CustomTableHead from "./container/table/tableHead";
import CustomTableBody from "./container/table/tableBody";
import TablePagination from "./container/table/paginate";
import NoDataFound from "./noDataFound";
import { useMemo } from "react";
import Image from "next/image";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { dataType } from "../data";

const DummyData = ({ data }: any) => {
  // console.log("data", data);

  const columns: ColumnDef<dataType>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
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
        header: "Image",
        accessorKey: "image",
      },
      // {
      //   header: "Offers",
      //   accessorKey: "description",
      // },
      {
        header: "Test Drives",
        accessorKey: "category",
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
    <div>
      {data?.length > 0 ? (
        <div style={{ border: "1px solid #d8dadb" }}>
          <TableContainer>
            <CustomTableHead {...{ table }} />
            <CustomTableBody
              titleImage="image"
              firstSubTitle="fuel"
              secondSubTitle="driven"
              thirdSubTitle="mode"
              {...{ table }}
            />
          </TableContainer>
          <TablePagination
            {...{
              table,
            }}
          />
        </div>
      ) : (
        <NoDataFound />
      )}
      {/* {data?.map((items: any, index: number) => {
        return (
          <div key={index} className="flex row gap-5 w-[500px]">
            <Image src={items.image} alt="images" width={40} height={40} />
            {items.image}
          </div>
        );
      })} */}
    </div>
  );
};

export default DummyData;
