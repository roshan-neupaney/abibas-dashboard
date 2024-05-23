
interface CustomRadioProps {
  value: string;
  onChange: any;
  name: string;
  data: any;
}

export const CustomRadio = ({
  value,
  onChange,
  name,
  data,
}: CustomRadioProps) => {
  // const [selectValue, setSelectedValue]= useState(value);
  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="radio" className="label">{name}</label>
        <div className="gap-3 flex">
          {data.map((items: any, index: number) => {
            const element_id = items.label.replace(" ", "_");
            return (
              <div key={index} className="flex gap-2 cursor-pointer">
                <div className=" h-6 w-6 relative flex">
                  <label className="radio cursor-pointer">
                    <input
                      id={element_id}
                      type="radio"
                      name={name.replace(" ", "-")}
                      checked={value === items.id}
                      className="opacity-0 w-0 h-0"
                      onChange={() => onChange(items.id)}
                    />
                    <span className="radio-circle"></span>
                  </label>
                </div>
                <label htmlFor={element_id} className="label cursor-pointer">
                  {items.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
