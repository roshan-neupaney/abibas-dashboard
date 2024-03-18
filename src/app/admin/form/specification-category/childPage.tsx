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
import { CRUD_SPECIFICATION_CATEGORY } from "../../../../../config/endPoints";
import toast from "react-hot-toast";
import { beautifySpecificationCategory } from "../../../../../utilities/beautify";
import DeleteModal from "../../../../../components/modals/deleteModal";
import { useRouter } from "next/navigation";

interface dataType {
  image: string;
  title: string;
  description: string;
  status: string;
}

const SpecificationCategory = ({ _data, token }: any) => {
  const beautifiedCategory = beautifySpecificationCategory(_data);
  const [data, setData] = useState(beautifiedCategory);
  const [search, setSearch] = useState("");
  const [openModal, toggleModal] = useState(defaultStateModal);

  useEffect(() => {
    const beautifiedCategory = beautifySpecificationCategory(_data);
    setData(beautifiedCategory);
  }, [_data]);

  const router = useRouter();

  const columns: ColumnDef<dataType>[] = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Description",
        accessorKey: "description",
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
      const res = await DeleteWithId(CRUD_SPECIFICATION_CATEGORY, openModal.id, token);
      const { status }: any = res;
      if (status) {
        toast.success("Specification Category successfully deleted");
        router.refresh();
        toggleModal(defaultStateModal);
      } else {
        toast.error("Error while deleting Specification Category");
      }
    } catch (e) {
      toast.error("Error while deleting Specification Category");
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
              <CustomTableBody entireRoute="/admin/form/specification-category/edit"
              {...{ table, toggleModal }} />
            </>
          ) : (
            <NoDataFound />
          )}
        </TableContainer>
        {data.length > 0 && <TablePagination {...{ table }} />}
      </div>

      <DeleteModal
        type="specification category"
        open={openModal.state}
        handleDelete={handleDelete}
        handleClose={() => toggleModal(defaultStateModal)}
      />
    </>
  );
};

export default SpecificationCategory;
