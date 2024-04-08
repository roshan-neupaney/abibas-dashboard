import { useEffect, useState } from "react";
import CustomSelect from "../../src/subComponents/select";
import deleteIcon from "../../public/icons/deleteIcon.svg";
import Image from "next/image";
import { updateState } from "../../utilities/helper";

const Color = ({ beautifiedColor, setFormData, formData }: any) => {
  const [form, setForm] = useState<any>(formData);
  
  useEffect(() => {
    setForm(formData);
  }, [formData]);

  const addForm = (val: string) => {
    const filteredValue = beautifiedColor.filter((items: any) => {
      if (items.id.includes(val)) {
        return items;
      }
    });
    let count = 0;
    form.forEach((items: any) => {
      if (items.id === val) {
        count++;
      }
    });
    if (count === 0) {
      setForm((prev: any) => {
        return [
          ...prev,
          {
            id: val,
            color_code: filteredValue[0]?.label,
            color: filteredValue[0]?.label.toUpperCase(),
          },
        ];
      });
    }
  };

  useEffect(() => {
    updateState("colors", form, setFormData);
  }, [form, setFormData]);

  const removeForm = (id: string) => {
    const result = form.filter((items: any) => {
      if (items.id !== id) {
        return items;
      }
    });
    setForm(result);
    updateState("colors", result, setFormData);
  };

  return (
    <div
      className="flex self-stretch py-2 px-2 gap-3 flex-col"
      style={{ border: "1px solid #D8DADB", borderRadius: "4px" }}
    >
      <div className="flex gap-2">
        {form?.length > 0 &&
          form.map((item: any, i: number) => {
            return (
              <div
                className="flex w-10 h-10 relative"
                key={i}
                style={{ background: item.color_code }}
              >
                <span
                  style={{ background: "#fcfcfc" }}
                  className="flex p-[1px] absolute top-0 right-0"
                  onClick={() => removeForm(item.id)}
                >
                  <Image src={deleteIcon} width={15} height={15} alt="" />
                </span>
              </div>
            );
          })}
      </div>
      <div className="flex">
        <CustomSelect
          title="Color"
          data={beautifiedColor}
          value={""}
          onChange={(val: string) => addForm(val)}
          placeholder="Select Color"
        />
      </div>
    </div>
  );
};

export default Color;
