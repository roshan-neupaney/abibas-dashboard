import { useEffect, useState } from "react";
import CustomSelect from "../select";
import addIcon from "../../public/icons/add.svg";
import deleteIcon from "../../public/icons/deleteIcon.svg";
import Image from "next/image";
import { UUidGenerator, updateState } from "../../utilities/helper";
import CustomInput from "../input";

const Feature = ({
  beautifiedFeature,
  setFormData,
  featureData,
  setDeleteFeatures,
}: any) => {
  const statusData = [
    { id: "ACTIVE", label: "Active" },
    { id: "PENDING", label: "Pending" },
  ];

  const [form, setForm] = useState<any>(featureData);

  const uuid = UUidGenerator();

  const addForm = () => {
    setForm((prev: any) => {
      return [...prev, { id: uuid, featureId: "", value: "", status: "" }];
    });
  };

  const updateForm = (key: string, val: string, id: string) => {
    const result = form.filter((items: any) => {
      if (items.id === id) {
        items[key] = val;
      }
      return items;
    });
    setForm(result);
    const finalForm = result.map((element: any) => {
      return {
        featureId: element.featureId,
        value: element.value,
        status: element.status,
      };
    });
    updateState("features", finalForm, setFormData);
  };

  const removeForm = (id: string) => {
    const result = form.filter((items: any) => {
      if (items.id !== id) {
        return items;
      }
    });
    setForm(result);
    setDeleteFeatures((prev: any)=> {
      return [...prev, {id: id}]
    })
    updateState("features", result, setFormData);
  };

  return (
    <div
      className="flex self-stretch py-2 px-2 gap-3 flex-col"
      style={{ border: "1px solid #D8DADB", borderRadius: "4px" }}
    >
      <div className="flex">
        <div className="title-medium flex flex-1">Feature</div>
        <span onClick={addForm}>
          <Image src={addIcon} width={20} height={20} alt="" />
        </span>
      </div>
      {form?.length > 0 &&
        form.map((item: any, i: number) => {
          return (
            <div className="flex gap-4 items-center my-2" key={i}>
              <CustomSelect
                title="Feature"
                value={item.featureId}
                data={beautifiedFeature}
                onChange={(val: string) =>
                  updateForm("featureId", val, item.id)
                }
                placeholder="Select Feature"
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

export default Feature;
