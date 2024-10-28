import CustomInput from "@/subComponents/input";
import React, { useEffect, useState } from "react";
import CustomSelect from "@/subComponents/select";
import { groupBy } from "../../utilities/helper";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import clearCachesByServerAction from "../../hooks/revalidate";
import {
  CRUD_VEHICLE_SPECIFICATION,
  UPDATE_VEHICLE_SPECIFICATION,
} from "../../config/endPoints";
import { JsonPost } from "../../utilities/apiCall";
import { SubmitButton } from "@/subComponents/buttons";

function groupSpecificationId<T>(
  array: T[],
  key: (item: T) => string
): Record<string, T[]> {
  return array?.reduce((result: any, item: any) => {
    const keyValue = key(item);
    if (!result[keyValue]) {
      result[keyValue] = {};
    }
    result[keyValue] = {
      specification_id: item.specification.id,
      value: item.value,
    };
    return result;
  }, {} as Record<string, T[]>);
}

const AddSpecifications = ({
  variant_specification,
  token,
  isEdit,
  id,
  vehicle_specification,
}: any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const isOldData = vehicle_specification.data.length > 0;

  const result = groupBy(
    variant_specification.data,
    (item: any) => item.specification?.specificationCategory?.title
  );

  const specificationArray = Object.entries(result)?.map(([key, value]) => {
    return { category: key, value: value };
  });

  const [formData, setFormData] = useState<any>([]);

  const groupedById = groupSpecificationId(
    isOldData ? vehicle_specification.data : variant_specification.data,
    (item: any) => item.specification?.id
  );
  useEffect(() => {
    setFormData(groupedById);
  }, []);

  const updateForm = (id: string, value: any, setForm: any) => {
    setForm((prev: any) => {
      return {
        ...prev,
        [id]: { ...prev[id], specification_id: id, value: value },
      };
    });
  };
  const beautifiedSubmitData = Object.values(formData);
  const payload = { vehicle_id: id, specifications: beautifiedSubmitData };

  const handleAdd = async () => {
    setLoading(true);
    try {
      if (true) {
        const response = await JsonPost(
          CRUD_VEHICLE_SPECIFICATION,
          payload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Vehicle Specifications");
          // setFormError(defaultError);
          clearCachesByServerAction("/admin/inventory");
          router.push("/admin/inventory");
        } else {
          toast.error("Error While Adding Vehicle Specifications");
          setLoading(false);
        }
      } else {
        toast.error("Validation Error");
        // setFormError(error);
        setLoading(false);
      }
    } catch (e) {
      toast.error("Error While Updating");
      setLoading(false);
    }
  };
  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (true) {
        const response = await JsonPost(
          UPDATE_VEHICLE_SPECIFICATION,
          payload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Vehicle Specifications");
          // setFormError(defaultError);
          clearCachesByServerAction("/admin/inventory");
          router.push("/admin/inventory");
        } else {
          toast.error("Error While Adding Vehicle Specifications");
          setLoading(false);
        }
      } else {
        toast.error("Validation Error");
        // setFormError(error);
        setLoading(false);
      }
    } catch (e) {
      toast.error("Error While Updating");
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-5 p-4">
      <div className="flex w-[30rem] gap-5 flex-col flex-1">
        {specificationArray?.map((items: any, i: number) => {
          return (
            <div key={i} className="flex flex-col gap-4">
              <span className="headline-small">{items?.category}</span>
              <div key={i} className="grid grid-cols-3 gap-x-10 lg:grid-cols-4 lg:gap-x-16 gap-y-5">
                {items.value?.map((elements: any, i: number) => {
                  const specArray =
                    elements?.specification?.comma_value_if_dropdown
                      ?.split(",")
                      ?.map((items: any) => {
                        return { id: items, label: items };
                      });
                  const title = elements?.specification?.title;
                  const id = elements?.specification?.id;
                  return (
                    <div key={i}>
                      {elements?.specification?.specification_option_type ===
                      "DROPDOWN" ? (
                        <CustomSelect
                          title={title}
                          value={formData[id]?.value || ""}
                          onChange={(val: string) =>
                            updateForm(id, val, setFormData)
                          }
                          data={specArray}
                          placeholder={`Select ${title}`}
                          required
                        />
                      ) : (
                        <CustomInput
                          title={title}
                          value={formData[id]?.value || ""}
                          onChange={(val: string) =>
                            updateForm(id, val, setFormData)
                          }
                          placeholder={`Enter ${title}`}
                          required
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <SubmitButton
          title={isEdit ? "Edit" : "Add"}
          disabled={loading}
          onClick={isOldData ? handleUpdate : handleAdd}
        />
      </div>
    </div>
  );
};

export default AddSpecifications;
