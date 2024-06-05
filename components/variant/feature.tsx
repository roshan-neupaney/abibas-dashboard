import { useEffect, useState } from "react";
import addIcon from "../../public/icons/add.svg";
import deleteIcon from "../../public/icons/deleteIcon.svg";
import Image from "next/image";
import { UUidGenerator, updateState } from "../../utilities/helper";
import FeatureItems from "./featureItems";

const Feature = ({
  beautifiedFeature,
  setFormData,
  featureData = [],
  setDeleteFeatures,
  feature,
}: any) => {
  const [form, setForm] = useState<any>(featureData);

  // useEffect(() => {
  //   setForm(featureData);
  // }, [featureData]);

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
        id: element?.createdAt ? element.id : undefined,
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
    setDeleteFeatures((prev: any) => {
      return [...prev, { id: id }];
    });
    updateState("features", result, setFormData);
  };

  return (
    <div
      className="flex self-stretch py-2 px-2 gap-3 flex-col"
      style={{ border: "1px solid #D8DADB", borderRadius: "4px" }}
    >
      <div className="flex">
        <div className="title-medium flex flex-1">Feature</div>
      </div>
      {form?.length > 0 &&
        form.map((item: any, i: number) => {
          return (
            <div key={i} className="flex gap-4">
              <FeatureItems
                {...{ beautifiedFeature, item, updateForm, feature }}
                varFeature={featureData[i]}
              />
              <span className="flex pt-5" onClick={() => removeForm(item.id)}>
                <Image src={deleteIcon} width={20} height={20} alt="" />
              </span>
            </div>
          );
        })}
      <div className="flex justify-center">
        <span onClick={addForm}>
          <Image src={addIcon} width={20} height={20} alt="" />
        </span>
      </div>
    </div>
  );
};

export default Feature;
