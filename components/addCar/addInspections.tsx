import CustomInput from "@/subComponents/input";
import React, { useEffect, useState } from "react";
import CustomSelect from "@/subComponents/select";
import { groupBy, groupByObject } from "../../utilities/helper";
import toast from "react-hot-toast";
import { CRUD_VEHICLE_INSPECTION } from "../../config/endPoints";
import { JsonPost } from "../../utilities/apiCall";
import clearCachesByServerAction from "../../hooks/revalidate";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/subComponents/buttons";

const AddInspections = ({ vehicle_inspection, token, isEdit, id }: any) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const result = groupBy(
    vehicle_inspection.data,
    (item: any) => item.inspection?.inspectionCategory?.title
  );
  const inspectionArray = Object.entries(result).map(([key, value]) => {
    return { category: key, value: value };
  });

  const groupedById = groupByObject(vehicle_inspection.data, (item: any) => item.inspection?.id);
  const [formData, setFormData] = useState<any>([]);
  
  useEffect(() => {
    setFormData(groupedById)
  }, [])
  
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

  return (
    <div className="flex gap-5 p-4">
      <div className="flex w-[30rem] gap-5 flex-col">
        {inspectionArray?.map((items: any, i: number) => {
          return (
            <div key={i} className="flex flex-col gap-4">
              <span className="headline-small">{items?.category}</span>
              <div key={i} className="flex flex-col gap-5">
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
          onClick={isEdit ? handleUpdate : handleAdd}
        />
      </div>
    </div>
  );
};

export default AddInspections;
