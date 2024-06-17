import CustomInput from "@/subComponents/input";
import React, { useEffect, useState } from "react";
import CustomSelect from "@/subComponents/select";
import { groupBy, groupByObject } from "../../utilities/helper";
import toast from "react-hot-toast";
import {
  CRUD_VEHICLE_INSPECTION,
  UPDATE_VEHICLE_INSPECTION,
} from "../../config/endPoints";
import { JsonPost } from "../../utilities/apiCall";
import clearCachesByServerAction from "../../hooks/revalidate";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/subComponents/buttons";

function groupInspectionId<T>(
  array: T[],
  key: (item: T) => string
): Record<string, T[]> {
  return array?.reduce((result: any, item: any) => {
    const keyValue = key(item);
    if (!result[keyValue]) {
      result[keyValue] = {};
    }
    result[keyValue] = { inspection_id: item.inspection.id, value: item.value };
    return result;
  }, {} as Record<string, T[]>);
}

const AddInspections = ({
  variant_inspection,
  token,
  isEdit,
  id,
  vehicle_inspection,
}: any) => {
  const [loading, setLoading] = useState(false);
  const isOldData = vehicle_inspection.data.length > 0;
  const router = useRouter();

  const result = groupBy(
    variant_inspection.data,
    (item: any) => item.inspection?.inspectionCategory?.title
  );
  const inspectionArray = Object.entries(result).map(([key, value]) => {
    return { category: key, value: value };
  });

  const groupedById = groupInspectionId(
    isOldData ? vehicle_inspection.data : variant_inspection.data,
    (item: any) => item.inspection?.id
  );
  const [formData, setFormData] = useState<any>([]);

  useEffect(() => {
    setFormData(groupedById);
  }, []);

  const updateForm = (key: string, value: any, setForm: any) => {
    setForm((prev: any) => {
      return {
        ...prev,
        [key]: { ...prev[key], inspection_id: key, value: value },
      };
    });
  };
  const beautifiedSubmitData = Object.values(formData);
  const payload = { vehicle_id: id, inspection: beautifiedSubmitData };

  const handleAdd = async () => {
    setLoading(true);
    try {
      if (true) {
        const response = await JsonPost(
          CRUD_VEHICLE_INSPECTION,
          payload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Vehicle inspections");
          // setFormError(defaultError);
          clearCachesByServerAction("/admin/inventory");
          router.push("/admin/inventory");
        } else {
          toast.error("Error While Adding Vehicle inspections");
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
        const response = await JsonPost(
          UPDATE_VEHICLE_INSPECTION,
          payload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Vehicle inspections");
          // setFormError(defaultError);
          clearCachesByServerAction("/admin/inventory");
          router.push("/admin/inventory");
        } else {
          toast.error("Error While Adding Vehicle inspections");
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
    <div className="flex gap-5 p-4 ">
      <div className="flex gap-5 flex-col flex-1">
        {inspectionArray?.map((items: any, i: number) => {
          return (
            <div key={i} className="flex flex-col gap-4">
              <span className="headline-small">{items?.category}</span>
              <div
                key={i}
                className="grid grid-cols-3 gap-x-10 lg:grid-cols-4 lg:gap-x-16 gap-y-5"
              >
                {items.value?.map((elements: any, i: number) => {
                  const specArray =
                    elements?.inspection?.comma_value_if_dropdown
                      ?.split(",")
                      .map((items: any) => {
                        return { id: items.toLowerCase(), label: items };
                      });

                  const title = elements?.inspection?.title;
                  const id = elements?.inspection?.id;
                  return (
                    <div key={i}>
                      {elements?.inspection?.inception_option_type ===
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

export default AddInspections;
