import CustomInput from "@/subComponents/input";
import React, { useEffect, useState } from "react";
import CustomSelect from "@/subComponents/select";
import { groupBy, groupByObject } from "../../utilities/helper";
import toast from "react-hot-toast";
import { CRUD_VEHICLE_FEATURE, UPDATE_VEHICLE_FEATURE } from "../../config/endPoints";
import { JsonPost } from "../../utilities/apiCall";
import clearCachesByServerAction from "../../hooks/revalidate";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/subComponents/buttons";

function groupFeatureId<T>(
  array: T[],
  key: (item: T) => string
): Record<string, T[]> {
  return array?.reduce((result: any, item: any) => {
    const keyValue = key(item);
    if (!result[keyValue]) {
      result[keyValue] = {};
    }
    result[keyValue] = { feature_id: item.specification.id, value: item.value };
    return result;
  }, {} as Record<string, T[]>);
}

const AddFeatures = ({
  variant_feature,
  token,
  isEdit,
  id,
  vehicle_features,
}: any) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const result = groupBy(
    variant_feature.data,
    (item: any) => item.specification?.featureCategory?.title
  );

  const featureArray = Object.entries(result).map(([key, value]) => {
    return { category: key, value: value };
  });

  const [formData, setFormData] = useState<any>([]);

  const isOldData = vehicle_features.data.length > 0;

  const groupedById = groupFeatureId(
    isOldData ? vehicle_features.data : variant_feature.data,
    (item: any) => item.specification?.id
  );
  useEffect(() => {
    setFormData(groupedById);
  }, []);

  const updateForm = (key: string, value: any, setForm: any) => {
    setForm((prev: any) => {
      return {
        ...prev,
        [key]: { ...prev[key], feature_id: key, value: value },
      };
    });
  };

  const beautifiedSubmitData = Object.values(formData);
  const payload = { vehicle_id: id, features: beautifiedSubmitData };

  const handleAdd = async () => {
    setLoading(true);
    try {
      // const beautifiedPayload = beautifyPayload(formData);
      // const { isValid, error }: any = vehicleValidation(beautifiedPayload);
      if (true) {
        const response = await JsonPost(CRUD_VEHICLE_FEATURE, payload, token);
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Vehicle Features");
          // setFormError(defaultError);
          clearCachesByServerAction("/admin/inventory");
          router.push("/admin/inventory");
        } else {
          toast.error("Error While Adding Vehicle Features");
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
      // const beautifiedPayload = beautifyPayload(formData);
      // const { isValid, error }: any = vehicleValidation(beautifiedPayload);
      if (true) {
        const response = await JsonPost(UPDATE_VEHICLE_FEATURE, payload, token);
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Vehicle Features");
          // setFormError(defaultError);
          clearCachesByServerAction("/admin/inventory");
          router.push("/admin/inventory");
        } else {
          toast.error("Error While Adding Vehicle Features");
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
        {featureArray?.map((items: any, i: number) => {
          return (
            <div key={i} className="flex flex-col gap-4">
              <span className="headline-small">{items?.category}</span>
              <div key={i} className="grid grid-cols-3 gap-x-10 lg:grid-cols-4 lg:gap-x-16 gap-y-5">
                {items.value?.map((elements: any, i: number) => {
                  const specArray =
                    elements?.specification?.comma_value_if_dropdown
                      ?.split(",")
                      ?.map((items: any) => {
                        return { id: items.toLowerCase(), label: items };
                      });

                  const title = elements?.specification?.title;
                  const id = elements?.specification?.id;
                  return (
                    <div key={i}>
                      {elements?.specification?.feature_option_type ===
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

export default AddFeatures;
