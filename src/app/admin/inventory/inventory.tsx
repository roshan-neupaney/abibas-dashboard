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
import DeleteModal from "../../../../components/modals/deleteModal";
import { defaultStateModal } from "../../../../config/constants";
import { CRUD_VEHICLE } from "../../../../config/endPoints";
import { DeleteWithId } from "../../../../utilities/apiCall";
import toast from "react-hot-toast";

interface InventoryProps {
  vehicleList: any;
  vehicle_enums: any;
  token: string;
}

const Inventory = ({vehicleList ,vehicle_enums, token}: InventoryProps) => {
const beautifiedVehicleList = beautifyVehicleList(vehicleList, vehicle_enums);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [data, setData] = useState(beautifiedVehicleList);
  const [sorting, setSorting] = useState<SortingState>([])
  const [openModal, toggleModal] = useState(defaultStateModal);

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

  const handleDelete = async () => {
    try {
      const ids = openModal.id.split('_')[0];
      const res = await DeleteWithId(CRUD_VEHICLE, ids, token);
      const { status }: any = res;
      if (status) {
        toast.success("Vehicle successfully deleted");
        router.refresh();
        toggleModal(defaultStateModal);
      } else {
        toast.error("Error while deleting Vehicle");
      }
    } catch (e) {
      toast.error("Error while deleting Vehicle");
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
                {...{ table, toggleModal }}

              />
            </>
          ) : (
            <NoDataFound />
          )}
        </TableContainer>
        <TablePagination {...{ table }} />
      </div>
      <DeleteModal
        type="vehicle"
        open={openModal.state}
        handleDelete={handleDelete}
        handleClose={() => toggleModal(defaultStateModal)}
      />
    </>
  );
};

export default Inventory;
