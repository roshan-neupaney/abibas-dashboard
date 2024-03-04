"use client";

import CustomTableBody from "../../../../../components/container/table/tableBody";
import TableContainer from "../../../../../components/container/table/tableContainer";
import CustomTableHead from "../../../../../components/container/table/tableHead";
import React, { useMemo, useState } from "react";
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
import { ClientSideGet, DeleteWithId } from "../../../../../utilities/apiCall";
import { CRUD_FEATURE} from "../../../../../config/endPoints";
import toast from "react-hot-toast";
import { beautifyCategory, beautifyFeature } from "../../../../../utilities/beautify";
import DeleteModal from "../../../../../components/modals/deleteModal";

interface dataType {
  image: string;
  title: string;
  description: string;
  status: string;
}

const Feature = ({ _data, token }: any) => {
  const beautifiedCategory = beautifyFeature(_data);
  const [data, setData] = useState(beautifiedCategory);
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
        header: "Comma Value If Dropdown",
        accessorKey: "comma_value_dropdown",
      },
      {
        header: "Feature Option Type",
        accessorKey: "feature_option_type",
      },
      {
        header: "Feature Category",
        accessorKey: "feature_category",
      },
      {
        header: "Unit",
        accessorKey: "unit",
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
      const res = await DeleteWithId(CRUD_FEATURE, openModal.id, token);
      const { status }: any = res;
      if (status) {
        toast.success("Feature successfully deleted");
        fetchData();
        toggleModal(defaultStateModal);
      } else {
        toast.error("Error While Deleting Feature");
      }
    } catch (e) {
      toast.error("Error While Deleting Feature");
    }
  };

  const fetchData = async () => {
    try {
      const res = await ClientSideGet(CRUD_FEATURE, token);
      const beautifiedCategory = beautifyCategory(res?.data);
      setData(beautifiedCategory);
    } catch (e) {}
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
              <CustomTableBody entireRoute="/admin/form/features/edit"
              {...{ table, toggleModal }} />
            </>
          ) : (
            <NoDataFound />
          )}
        </TableContainer>
        {data.length > 0 && <TablePagination {...{ table }} />}
      </div>

      <DeleteModal
        type="feature"
        open={openModal.state}
        handleDelete={handleDelete}
        handleClose={() => toggleModal(defaultStateModal)}
      />
    </>
  );
};

export default Feature;
