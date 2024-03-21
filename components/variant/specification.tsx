import { useState } from "react";
import CustomSelect from "../select";
import addIcon from "../../public/icons/add.svg";
import deleteIcon from "../../public/icons/deleteIcon.svg";
import Image from "next/image";
import { UUidGenerator, updateState } from "../../utilities/helper";
import CustomInput from "../input";

const Specification = ({
  beautifiedSpecification,
  setFormData,
  specificationData,
  setDeleteSpecifications,
}: any) => {
    
    const statusData = [
      { id: "ACTIVE", label: "Active" },
      { id: "PENDING", label: "Pending" },
    ];
    
    const [form, setForm] = useState<any>(specificationData);
    
    let uuid = UUidGenerator();
    const addForm = () => {
      setForm((prev: any) => {
        return [
          ...prev,
          { id: uuid, specificationId: "", value: "", status: "" },
        ];
      });
    };
    
  const updateForm = (key: string, val: string, id: string) => {
    const result = form.filter((items: any) => {
      if (items.id === id) {
        items[key] = val;
        return items;
      }
      return items;
    });
    setForm(result);
    const finalForm = result.map((element: any) => {
      return {
        specificationId: element.specificationId,
        value: element.value,
        status: element.status,
      };
    });
    updateState("specifications", finalForm, setFormData);
  };
  const removeForm = (id: string) => {
    const result = form.filter((items: any) => {
      if (items.id !== id) {
        return items;
      }
    });
    setForm(result);
    setDeleteSpecifications((prev: any)=> {
      return [...prev, {id: id}]
    })
    updateState("specifications", result, setFormData);
  };

  return (
    <div
      className="flex self-stretch py-2 px-2 gap-3 flex-col"
      style={{ border: "1px solid #D8DADB", borderRadius: "4px" }}
    >
      <div className="flex">
        <div className="title-medium flex flex-1">Specification</div>
        <span onClick={addForm}>
          <Image src={addIcon} width={20} height={20} alt="" />
        </span>
      </div>
      {form?.length > 0 &&
        form.map((item: any, i: number) => {
          return (
            <div className="flex gap-4 items-center my-2" key={i}>
              <CustomSelect
                title="Specification"
                value={item.specificationId}
                data={beautifiedSpecification}
                onChange={(val: string) =>
                  updateForm("specificationId", val, item.id)
                }
                placeholder="Select Specification"
              />
              <CustomInput
                title="Value"
                value={item.value}
                onChange={(val: string) => updateForm("value", val, item.id)}
                placeholder="Enter value"
              />
              <CustomSelect
                title="Status"
                value={item.status}
                data={statusData}
                onChange={(val: string) => updateForm("status", val, item.id)}
                placeholder="Select Status"
              />
              <span className="flex pt-5" onClick={() => removeForm(item.id)}>
                <Image src={deleteIcon} width={20} height={20} alt="" />
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default Specification;
