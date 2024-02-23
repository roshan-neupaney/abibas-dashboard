import { flexRender } from "@tanstack/react-table";

const CustomTableHead = ({ table }: any) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup: any, i: number) => {
        return (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: any, index: number) => {
              return (
                <th className="label-large text-left table-head" key={index}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
};

export default CustomTableHead;
