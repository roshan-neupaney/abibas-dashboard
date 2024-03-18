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
import { DeleteWithId } from "../../../../../utilities/apiCall";
import { CRUD_ASSETS_PARTS } from "../../../../../config/endPoints";
import toast from "react-hot-toast";
import { beautifyAssetsPart } from "../../../../../utilities/beautify";
import DeleteModal from "../../../../../components/modals/deleteModal";
import { useRouter } from "next/navigation";

interface dataType {
  image: string;
  title: string;
  description: string;
  status: string;
}

const AssetsPart = ({ _data, token }: any) => {
  const beautifiedCategory = beautifyAssetsPart(_data);
  const [data, setData] = useState(beautifiedCategory);
  const [search, setSearch] = useState("");
  const [openModal, toggleModal] = useState(defaultStateModal);
  const router = useRouter();
  
  useEffect(()=> {
    const beautifiedCategory = beautifyAssetsPart(_data);
    setData(beautifiedCategory);
  }, [_data])

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
        header: "Assets Part Category",
        accessorKey: "assets_part_category",
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
      const filteredData = beautifiedCategory.filter((items: any) => {
        if (items.title.toLowerCase().includes(val.toLowerCase())) {
          return items;
        }
      });
      setData(filteredData);
    } catch (e) {}
  };

  const handleDelete = async () => {
    try {
      const res = await DeleteWithId(CRUD_ASSETS_PARTS, openModal.id, token);
      const { status }: any = res;
      if (status) {
        toast.success("Assets Part successfully deleted");
        router.refresh();
        toggleModal(defaultStateModal);
      } else {
        toast.error("Error while deleting Assets Part");
      }
    } catch (e) {
      toast.error("Error while deleting Assets Part");
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
              <CustomTableBody entireRoute="/admin/form/assets-parts/edit"
              {...{ table, toggleModal }} />
            </>
          ) : (
            <NoDataFound />
          )}
        </TableContainer>
        {data.length > 0 && <TablePagination {...{ table }} />}
      </div>

      <DeleteModal
        type="assets part"
        open={openModal.state}
        handleDelete={handleDelete}
        handleClose={() => toggleModal(defaultStateModal)}
      />
    </>
  );
};

export default AssetsPart;
