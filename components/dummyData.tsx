"use client";

import TableContainer from "./container/table/tableContainer";
import CustomTableHead from "./container/table/tableHead";
import CustomTableBody from "./container/table/tableBody";
import TablePagination from "./container/table/paginate";
import NoDataFound from "./noDataFound";
import { useMemo, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { dataType } from "../data";
import CustomInput from "../src/subComponents/input";
import { SubmitButton } from "@/subComponents/buttons";
import { useRouter } from "next/navigation";

const DummyData = ({ data }: any) => {
  const [search, setSearch] = useState<String>("");
  const router = useRouter();

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
          <TableContainer
            topRender={
              <div className="flex  flex-1 gap-2 justify-end">
                <div className=''>
                <CustomInput
                  value={search}
                  onChange={(val: string) => setSearch(val)}
                  placeholder="Search..."
                />
                </div>
                {/* <Link href={`?query=${search}`}> */}
                <SubmitButton
                  title="Search"
                  onClick={() => router.push(`?query=${search}`)}
                />
                {/* </Link> */}
              </div>
            }
          >
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
    </div>
  );
};

export default DummyData;
