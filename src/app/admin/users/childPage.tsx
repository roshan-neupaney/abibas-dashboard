"use client";

import CustomTableBody from "../../../../components/container/table/tableBody";
import TableContainer from "../../../../components/container/table/tableContainer";
import CustomTableHead from "../../../../components/container/table/tableHead";
import React, { useEffect, useMemo, useState } from "react";
import TablePagination from "../../../../components/container/table/paginate";
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
import { defaultStateModal } from "../../../../config/constants";
import { DeleteWithId } from "../../../../utilities/apiCall";
import { CRUD_USER} from "../../../../config/endPoints";
import toast from "react-hot-toast";
import { beautifyUsers } from "../../../../utilities/beautify";
import DeleteModal from "../../../../components/modals/deleteModal";
import { useRouter } from "next/navigation";

interface dataType {
  image: string;
  title: string;
  description: string;
  status: string;
}

const Users = ({ _data, token }: any) => {
  const beautifiedCategory = beautifyUsers(_data);
  const [data, setData] = useState(beautifiedCategory);
  const [search, setSearch] = useState("");
  const [openModal, toggleModal] = useState(defaultStateModal);
  const [sorting, setSorting] = useState<SortingState>([]);
  
  useEffect(() => {
    const beautifiedCategory = beautifyUsers(_data);
    setData(beautifiedCategory);
  }, [_data]);

const router = useRouter();

  const columns: ColumnDef<dataType>[] = useMemo(
    () => [
      {
        header: "Firstname",
        accessorKey: "firstName",
      },
      {
        header: "Lastname",
        accessorKey: "lastName",
      },
      {
        header: "Role",
        accessorKey: "role",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Mobile",
        accessorKey: "mobile",
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
      const filteredData = beautifiedCategory?.filter((items: any) => {
        if (items.title.toLowerCase().includes(val.toLowerCase())) {
          return items;
        }
      });
      setData(filteredData);
    } catch (e) {}
  };

  const handleDelete = async () => {
    try {
      const res = await DeleteWithId(CRUD_USER, openModal.id, token);
      const { status }: any = res;
      if (status) {
        toast.success("User successfully deleted");
        router.refresh();
        toggleModal(defaultStateModal);
      } else {
        toast.error("Error While Deleting User");
      }
    } catch (e) {
      toast.error("Error While Deleting User");
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
              <CustomTableBody entireRoute="/admin/users/edit" entireRouteId="id"
              {...{ table, toggleModal }} />
            </>
          ) : (
            <NoDataFound />
          )}
        </TableContainer>
        {data?.length > 0 && <TablePagination {...{ table }} />}
      </div>

      <DeleteModal
        type="user"
        open={openModal.state}
        handleDelete={handleDelete}
        handleClose={() => toggleModal(defaultStateModal)}
      />
    </>
  );
};

export default Users;
