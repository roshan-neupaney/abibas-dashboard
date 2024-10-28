"use client";

import CustomTableBody from "../container/table/tableBody";
import TableContainer from "../container/table/tableContainer";
import CustomTableHead from "../container/table/tableHead";
import React, { useEffect, useMemo, useState } from "react";
import TablePagination from "../container/table/paginate";
import NoDataFound from "../noDataFound";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { beautifyWatchList } from "../../utilities/beautify";
import { defaultStateModal } from "../../config/constants";
import { dataType } from "../../data";
import { DeleteWithId } from "../../utilities/apiCall";
import { GET_WATCH_LIST } from "../../config/endPoints";
import CustomInput from "@/subComponents/input";
import DeleteModal from "../modals/deleteModal";

interface WatchListProps {
  watchList: any;
  token: string;
}

const InventoryWatchList = ({ watchList, token }: WatchListProps) => {
  const beautifiedData = beautifyWatchList(watchList);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [data, setData] = useState(beautifiedData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openModal, toggleModal] = useState(defaultStateModal);

  useEffect(() => {
    const beautifiedData = beautifyWatchList(watchList);
    setData(beautifiedData);
  }, [watchList]);

  const columns: ColumnDef<dataType>[] = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "title",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      // {
      //   header: "Action",
      //   accessorKey: "action",
      // },
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
      const filteredData = data?.filter((items: any) => {
        if (items.title.toLowerCase().includes(val.toLowerCase())) {
          return items;
        }
      });
      setData(filteredData);
    } catch (e) {
      console.error(e);
      setData([]);
    }
  };

  const handleDelete = async () => {
    try {
      const ids = openModal.id.split("_")[0];
      const res = await DeleteWithId(GET_WATCH_LIST, ids, token);
      const { status }: any = res;
      if (status) {
        toast.success("Watchlist successfully deleted");
        router.refresh();
        toggleModal(defaultStateModal);
      } else {
        toast.error("Error while deleting Watchlist");
      }
    } catch (e) {
      toast.error("Error while deleting Watchlist");
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
                hideEdit
                hideDelete
                {...{ table, toggleModal }}
              />
            </>
          ) : (
            <NoDataFound />
          )}
        </TableContainer>
        {data.length > 0 && <TablePagination {...{ table }} />}
      </div>
      <DeleteModal
        type="watchlist"
        open={openModal.state}
        handleDelete={handleDelete}
        handleClose={() => toggleModal(defaultStateModal)}
      />
    </>
  );
};

export default InventoryWatchList;
