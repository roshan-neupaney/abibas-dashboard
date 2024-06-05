import { useEffect, useState } from "react";
import addIcon from "../../public/icons/add.svg";
import deleteIcon from "../../public/icons/deleteIcon.svg";
import Image from "next/image";
import { UUidGenerator, updateState } from "../../utilities/helper";
import SpecificationItems from "./specificationItems";

const Specification = ({
  beautifiedSpecification,
  setFormData,
  specificationData = [],
  setDeleteSpecifications,
  specification,
}: any) => {
  const [form, setForm] = useState<any>(specificationData);

  // useEffect(() => {
  //   setForm(specificationData);
  // }, [specificationData]);

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
        id: element?.createdAt ? element.id : undefined,
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
    setDeleteSpecifications((prev: any) => {
      return [...prev, { id: id }];
    });
    updateState("specifications", result, setFormData);
  };

  return (
    <div
      className="flex self-stretch py-2 px-2 gap-3 flex-col"
      style={{ border: "1px solid #D8DADB", borderRadius: "4px" }}
    >
      <div className="flex">
        <div className="title-medium flex flex-1">Specification</div>
      </div>
      {form?.length > 0 &&
        form.map((item: any, i: number) => {
          return (
            <div className="flex gap-4" key={i}>
              <SpecificationItems
                {...{
                  beautifiedSpecification,
                  item,
                  updateForm,
                  specification,
                }}
                varSpecification={specificationData[i]}
              />
              <span
                className="flex pt-5 cursor-pointer"
                onClick={() => removeForm(item.id)}
              >
                <Image src={deleteIcon} width={20} height={20} alt="" />
              </span>
            </div>
          );
        })}
      <div className="flex justify-center">
        <span onClick={addForm} className="cursor-pointer">
          <Image src={addIcon} width={20} height={20} alt="" />
        </span>
      </div>
    </div>
  );
};

export default Specification;
