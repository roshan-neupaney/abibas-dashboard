"use client";

import CustomTableBody from "../../../../components/container/table/tableBody";
import TableContainer from "../../../../components/container/table/tableContainer";
import CustomTableHead from "../../../../components/container/table/tableHead";
import React, { useEffect, useMemo, useState } from "react";
import TablePagination from "../../../../components/container/table/paginate";
import { itemslist, dataType } from "../../../../data";
import NoDataFound from "../../../../components/noDataFound";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CustomInput from "../../../subComponents/input";
import { useRouter } from "next/navigation";
import { beautifyVehicleList } from "../../../../utilities/beautify";

interface InventoryProps {
  vehicleList: any;
  vehicle_enums: any;
}

const Inventory = ({vehicleList ,vehicle_enums}: InventoryProps) => {
const beautifiedVehicleList = beautifyVehicleList(vehicleList, vehicle_enums);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [data, setData] = useState(beautifiedVehicleList);
  const [sorting, setSorting] = useState<SortingState>([])

  useEffect(()=> {
    const beautifiedCategory = beautifyVehicleList(vehicleList, vehicle_enums);
    setData(beautifiedCategory);
  }, [vehicleList])

  const columns: ColumnDef<dataType>[] = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Brand",
        accessorKey: "brand",
      },
      {
        header: "Model",
        accessorKey: "model",
      },
      {
        header: "Variant",
        accessorKey: "variant",
      },
      {
        header: "KM driven",
        accessorKey: "km_run",
      },
      {
        header: "Manufacture",
        accessorKey: "manufacture",
      },
      {
        header: "Owner",
        accessorKey: "owner",
      },
      {
        header: "Price",
        accessorKey: "price",
      },
      {
        header: "Status",
        accessorKey: "status",
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
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleSearch = (val: string) => {
    try {
      setSearch(val);
      const filteredData = itemslist.filter((items: any) => {
        if (items.title.toLowerCase().includes(val.toLowerCase())) {
          return items;
        }
      });
      setData(filteredData);
    } catch (e) {
      console.log(e);
      setData([]);
    }
  };

  return (
    <>
      <div style={{ border: "1px solid #d8dadb" }}>
        <TableContainer
          topRender={
            <div className="flex  flex-1 gap-2 justify-end">
              <div className="">
                <CustomInput
                  value={search}
                  onChange={(val: string) => handleSearch(val)}
                  placeholder="Search..."
                />
              </div>
            </div>
          }
        >
          {data?.length > 0 ? (
            <>
              <CustomTableHead {...{ table }} />
              <CustomTableBody
                internalTitleRoute="/admin/inventory/detail/id"
                entireRoute="/admin/inventory/edit/"
                {...{ table }}
              />
            </>
          ) : (
            <NoDataFound />
          )}
        </TableContainer>
        <TablePagination {...{ table }} />
      </div>
    </>
  );
};

export default Inventory;
