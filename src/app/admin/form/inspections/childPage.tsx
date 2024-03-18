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
import { CRUD_INSPECTIONS } from "../../../../../config/endPoints";
import toast from "react-hot-toast";
import { beautifyInspection } from "../../../../../utilities/beautify";
import DeleteModal from "../../../../../components/modals/deleteModal";
import { useRouter } from "next/navigation";

interface dataType {
  image: string;
  title: string;
  description: string;
  status: string;
}

const Inspection = ({ _data, token }: any) => {
  const beautifiedCategory = beautifyInspection(_data);
  const [data, setData] = useState(beautifiedCategory);
  const [search, setSearch] = useState("");
  const [openModal, toggleModal] = useState(defaultStateModal);
  const router = useRouter();

  useEffect(()=> {
    const beautifiedCategory = beautifyInspection(_data);
    setData(beautifiedCategory)
  },[_data])

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
        header: "Inspection Category",
        accessorKey: "inspection_category",
      },
      {
        header: "Start Text",
        accessorKey: "start_text",
      },
      {
        header: "End Text",
        accessorKey: "end_text",
      },
      {
        header: "Inspection Option type",
        accessorKey: "inception_option_type",
      },
      {
        header: "Comma Value If Dropdown",
        accessorKey: "comma_value_if_dropdown",
      },
      {
        header: "Text For Everything Fine",
        accessorKey: "text_for_everything_fine",
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
      const res = await DeleteWithId(CRUD_INSPECTIONS, openModal.id, token);
      const { status }: any = res;
      if (status) {
        toast.success("Inspections successfully deleted");
        router.refresh()
        toggleModal(defaultStateModal);
      } else {
        toast.error("Error while deleting Inspections");
      }
    } catch (e) {
      toast.error("Error while deleting Inspections");
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
              <CustomTableBody entireRoute="/admin/form/inspections/edit"
              {...{ table, toggleModal }} />
            </>
          ) : (
            <NoDataFound />
          )}
        </TableContainer>
        {data.length > 0 && <TablePagination {...{ table }} />}
      </div>

      <DeleteModal
        type="inspection"
        open={openModal.state}
        handleDelete={handleDelete}
        handleClose={() => toggleModal(defaultStateModal)}
      />
    </>
  );
};

export default Inspection;
