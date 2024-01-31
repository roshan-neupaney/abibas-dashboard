const CustomTableHead = ({ headerGroups }: any) => {
  return (
    <thead>
      {headerGroups.map((headerGroup: any, i: number) => {
        return (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column: any, index: number) => {
              return (
                <th className="label-large text-left table-head" {...column.getHeaderProps()} key={index}>
                  {column.render("Header")}
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
