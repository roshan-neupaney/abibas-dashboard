"use client";

import CustomTableBody from "../../../../../components/container/table/tableBody";
import TableContainer from "../../../../../components/container/table/tableContainer";
import CustomTableHead from "../../../../../components/container/table/tableHead";
import React, { useEffect, useMemo, useState } from "react";
import TablePagination from "../../../../../components/container/table/paginate";
import NoDataFound from "../../../../../components/noDataFound";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CustomInput from "../../../../../components/input";
import { defaultStateModal } from "../../../../../config/constants";
import { CRUD_VARIANT } from "../../../../../config/endPoints";
import { ClientSideGet, DeleteWithId } from "../../../../../utilities/apiCall";
import toast from "react-hot-toast";
import {
  beautifyVariant,
} from "../../../../../utilities/beautify";
import DeleteModal from "../../../../../components/modals/deleteModal";

interface dataType {
  image: string;
  title: string;
  description: string;
  status: string;
}

const Variant = ({ _data, token }: any) => {
  const beautifiedData = beautifyVariant(_data);
  console.log('beautifiedData', beautifiedData)
  const [data, setData] = useState(beautifiedData);
  const [search, setSearch] = useState("");
  const [openModal, toggleModal] = useState(defaultStateModal);
  
  const columns: ColumnDef<dataType>[] = useMemo(
    () => [
      {
        header: "Image",
        accessorKey: "image",
      },
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Colors",
        accessorKey: "colors",
      },
      {
        header: "Fuel Type",
        accessorKey: "fuel_type",
      },
      {
        header: "Model",
        accessorKey: "model",
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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleSearch = (val: string) => {
    try {
      setSearch(val);
      const filteredData = _data?.filter((items: any) => {
        if (items.title.toLowerCase().includes(val.toLowerCase())) {
          return items;
        }
      });
      setData(filteredData);
    } catch (e) {}
  };

  const handleDelete = async () => {
    try {
      const res = await DeleteWithId(CRUD_VARIANT, openModal.id, token);
      const { status }: any = res;
      if (status) {
        toast.success("Variant Successfully Deleted");
        fetchData();
        toggleModal(defaultStateModal);
      } else {
        toast.error("Error While Deleting Variant");
      }
    } catch (e) {
      toast.error("Error While Deleting Variant");
    }
  };

  const fetchData = async () => {
    try {
      const res = await ClientSideGet(CRUD_VARIANT, token);
      const beautifiedCategory = beautifyVariant(res?.data);
      setData(beautifiedCategory);
    } catch (e) {
      toast.error("Error while fetching");
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
                entireRoute="/admin/form/variant/edit/"
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
        type="variant"
        open={openModal.state}
        handleDelete={handleDelete}
        handleClose={() => toggleModal(defaultStateModal)}
      />
    </>
  );
};

export default Variant;
