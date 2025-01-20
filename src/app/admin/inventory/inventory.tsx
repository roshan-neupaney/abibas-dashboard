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
import { beautifyShoeList } from "../../../../utilities/beautify";
import DeleteModal from "../../../../components/modals/deleteModal";
import { defaultStateModal } from "../../../../config/constants";
import { CRUD_SHOE, CRUD_VEHICLE } from "../../../../config/endPoints";
import { DeleteWithId } from "../../../../utilities/apiCall";
import toast from "react-hot-toast";

interface InventoryProps {
  shoeList: any;
  token: string;
}

const Inventory = ({ shoeList, token }: InventoryProps) => {
  const beautifiedshoeList = beautifyShoeList(shoeList);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [data, setData] = useState(beautifiedshoeList);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openModal, toggleModal] = useState(defaultStateModal);
  
  useEffect(() => {
    const beautifiedCategory = beautifyShoeList(shoeList);
    setData(beautifiedCategory);
  }, [shoeList]);

  const columns: ColumnDef<dataType>[] = useMemo(
    () => [
      {
        header: "Created At",
        accessorKey: "createdAt",
      },
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Brand",
        accessorKey: "brand",
      },
      {
        header: "Category",
        accessorKey: "category",
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
      setSearch(val);
      const filteredData = beautifiedshoeList?.filter((items: any) => {
        if (items.title.toLowerCase().includes(val.toLowerCase())) {
          return items;
        }
      });
      setData(filteredData);
  };

  const handleDelete = async () => {
    try {
      const ids = openModal.id.split("_")[0];
      const res = await DeleteWithId(CRUD_SHOE, ids, token);
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
                internalTitleRoute="/admin/inventory/detail"
                internalTitleRouteId="id"
                titleImage="image"
                entireRouteId="slug_url"
                entireRoute="/admin/inventory/edit"
                {...{ table, toggleModal }}
              />
            </>
          ) : (
            <NoDataFound />
          )}
        </TableContainer>
        {data?.length > 0 && <TablePagination {...{ table }} />}
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
