"use client";
import Image from "next/image";
import Dot from "../../public/icons/Ellipse.svg";
import Avatar from "../../public/images/avatar.png";
import MultiLineChart from "../charts/multilineChart";
import { dataType, itemslist } from "../../data";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TableContainer from "../container/table/tableContainer";
import CustomTableHead from "../container/table/tableHead";
import CustomTableBody from "../container/table/tableBody";
import TablePagination from "../container/table/paginate";
import NoDataFound from "../noDataFound";

const Overview = ({setActive}:any) => {
  return (
    <div className="flex gap-5 p-4">
      <DetailBox setActive={setActive} />
      <SideBar />
    </div>
  );
};

export default Overview;

const DetailBox = ({setActive}:any) => {
  const data = itemslist;

  const columns: ColumnDef<dataType>[] = [
    {
      header: "ID",
      accessorKey: "_id",
    },
    {
      header: "Vehicle",
      accessorKey: "title",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Offers",
      accessorKey: "offers",
    },
    {
      header: "Test Drives",
      accessorKey: "test_drive",
    },
    {
      header: "Favorites",
      accessorKey: "favorite",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Action",
      accessorKey: "action",
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <>
      <div className="flex flex-col gap-5 flex-1">
        <div className="flex p-5 flex-col self-stretch user-detail-container">
          <div className="flex self-stretch items-center gap-4 pb-4">
            <span className="title-large-NH">Agent Performance</span>
          </div>
          <div className="flex">
            <MultiLineChart data={""} />
          </div>
        </div>
        <div className="flex p-5 flex-col flex-1 self-stretch user-detail-container">
          <div className="flex gap-5 items-center">
            <div className="title-large-NH flex flex-1">Orders</div>
            <div className="flex py-[0.625rem] items-center justify-center viewMore pointer" onClick={() => setActive(1)}>
              View More
            </div>
          </div>
          {data?.length > 0 ? (
            <div style={{ border: "1px solid #d8dadb" }}>
              <TableContainer style={{maxHeight: '20rem'}}>
                <CustomTableHead {...{ table }} />
                <CustomTableBody
                  internalTitleRoute="/admin/agents/detail/id"
                  titleImage="media"
                  firstSubTitle="fuel"
                  secondSubTitle="driven"
                  thirdSubTitle="mode"
                  {...{ table }}
                />
              </TableContainer>
              <TablePagination {...{ table }} />
            </div>
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
    </>
  );
};

const SideBar = () => {
  return (
    <>
      <div className="user-detail-sideBar">
        <div className="flex pt-6 px-5 pb-8 flex-col self-stretch border-b border-[#D8DADB]">
          <div className="flex pb-3">
            <span className="title-medium-NH">Contact Agent</span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <Image src={Avatar} alt="" width={56} height={56} />
            </span>
            <div className="flex flex-col ">
              <label className="label-large-NH">Andy Morano</label>
              <label className="body-small-NH">Agent</label>
            </div>
          </div>
        </div>

        <div className="flex pt-6 px-5 pb-8 flex-col self-stretch border-b border-[#D8DADB] gap-3">
          <div className="flex">
            <span className="title-medium-NH">Created By</span>
          </div>
          <div>
            <span className="label-large-NH">Bivek Rana </span>
            <span className="label-large-NH">on 29 Sept, 2022</span>
          </div>
        </div>

        <div className="flex pt-6 px-5 pb-8 flex-col self-stretch border-b border-[#D8DADB] gap-3">
          <div className="title-medium-NH">Activity Log</div>
          <div className="flex gap-2 py-2">
            <span className="pt-1.5">
              <Image src={Dot} width={8} height={8} alt="" />
            </span>
            <div className="flex col gap-3">
              <span className="title-small-NH">29 Mar, 2023</span>
              <div className="flex col">
                <span className="body-small-NH">02:09 PM</span>
                <span className="label-large-NH">Bivek Rana Was assigned</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 py-2">
            <span className="pt-1.5">
              <Image src={Dot} width={8} height={8} alt="" />
            </span>
            <div className="flex col gap-3">
              <span className="title-small-NH">24 Mar, 2023</span>
              <div className="flex col">
                <span className="body-small-NH">02:09 PM</span>
                <span className="label-large-NH">
                  Asim Singh booked this car.
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 py-2">
            <span className="pt-1.5">
              <Image src={Dot} width={8} height={8} alt="" />
            </span>
            <div className="flex col gap-3">
              <span className="title-small-NH">24 Mar, 2023</span>
              <div className="flex col">
                <span className="body-small-NH">02:09 PM</span>
                <span className="label-large-NH">
                  Somebody updated Something.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
