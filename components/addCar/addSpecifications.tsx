import CustomInput from "@/subComponents/input";
import React, { useState } from "react";
import CustomSelect from "@/subComponents/select";
import { groupBy } from "../../utilities/helper";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import clearCachesByServerAction from "../../hooks/revalidate";
import {
  CRUD_VEHICLE,
  CRUD_VEHICLE_SPECIFICATION,
} from "../../config/endPoints";
import { JsonPost } from "../../utilities/apiCall";
import { SubmitButton } from "@/subComponents/buttons";

const AddSpecifications = ({
  vehicle_specification,
  token,
  isEdit,
  id,
}: any) => {
  const [formData, setFormData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const result = groupBy(
    vehicle_specification.data,
    (item: any) => item.specification?.specificationCategory?.title
  );

  const specificationArray = Object.entries(result).map(([key, value]) => {
    return { category: key, value: value };
  });

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
  console.log(payload, "payload", beautifiedSubmitData);

  const handleAdd = async () => {
    setLoading(true);
    try {
      // const beautifiedPayload = beautifyPayload(formData);
      // const { isValid, error }: any = vehicleValidation(beautifiedPayload);
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
      // const beautifiedPayload = beautifyPayload(formData);
      // const { isValid, error }: any = vehicleValidation(beautifiedPayload);
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

  return (
    <div className="flex gap-5 p-4">
      <div className="flex w-[30rem] gap-5 flex-col">
        {specificationArray?.map((items: any, i: number) => {
          return (
            <div key={i} className="flex flex-col gap-4">
              <span className="headline-small">{items?.category}</span>
              <div key={i} className="flex flex-col gap-5">
                {items.value?.map((elements: any, i: number) => {
                  const specArray =
                    elements?.specification?.comma_value_if_dropdown
                      ?.split(",")
                      .map((items: any) => {
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
          onClick={isEdit ? handleUpdate : handleAdd}
        />
      </div>
    </div>
  );
};

export default AddSpecifications;
