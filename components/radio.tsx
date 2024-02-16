interface CustomRadioProps {
  value: string;
  onChange: any;
  name: string;
  data: any;
  // checked: boolean;
}

export const CustomRadio = ({
  value,
  onChange,
  name,
  data,
}: // checked = false,
CustomRadioProps) => {
  // window.onclick = (e) => {
  //   console.log(e)
  // }

  return (
    <>
      <div className="gap-3 flex">
        {data.map((items: any, index: number) => {
          const element_id = items.label.replace(' ', '_');
          return (
            <div key={index} className="flex gap-2">
              <div  className="row h-6 w-6 relative flex">
                <label className="radio pointer">
                  <input
                    id={element_id}
                    type="radio"
                    name={name}
                    value={items._id}
                    className="opacity-0 w-0 h-0"
                    onChange={(e) => onChange(e.target.value)}
                  />
                  <span className="radio-circle"></span>
                </label>
              </div>
              <label htmlFor={element_id}>{items.label}</label>
            </div>
          );
        })}
      </div>
    </>
  );
};
