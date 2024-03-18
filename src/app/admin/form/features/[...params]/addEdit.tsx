"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../../components/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../../components/checkbox";
import CustomDropzone from "../../../../../../components/dropzone";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_FEATURE } from "../../../../../../config/endPoints";
import {
  PostFormAdd,
  PostFormUpdate,
} from "../../../../../../utilities/apiCall";
import CustomSelect from "../../../../../../components/select";
import { CustomRadio } from "../../../../../../components/radio";
import { featureValidation } from "../../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";

const defaultForm = {
  title: "",
  description: "",
  comma_value_if_dropdown: "",
  feature_option_type: "",
  feature_category_id: "",
  unit_id: "",
  status: false,
  file: "",
};

const defaultError = {
  title: "",
  description: "",
  feature_category_id: "",
  unit_id: "",
  file: "",
};

const AddEditFeature = ({
  token,
  data,
  isEdit,
  id,
  feature_category,
  unit,
}: any) => {
  const beautifiedFeatureCategory = feature_category?.data?.map(
    (items: any) => {
      return { id: items.id, label: items.title };
    }
  );
  const beautifiedUnit = unit?.data?.map((items: any) => {
    return { id: items.id, label: items.title };
  });

  const commaValueIfDropdown = [
    { id: "REQUIRED", label: "Required" },
    { id: "OPTIONAL", label: "Optional" },
  ];
  const featureOptionType = [
    { id: "TEXT", label: "Text" },
    { id: "DROPDOWN", label: "Dropdown" },
  ];

  const editForm = isEdit
    ? {
        title: data?.title || "",
        description: data?.description || "",
        comma_value_if_dropdown: data?.comma_value_if_dropdown || "",
        feature_option_type: data?.feature_option_type || "",
        feature_category_id: data?.feature_category_id || "",
        unit_id: data?.unit_id || "",
        file: data?.image || "",
        status: data?.status == "ACTIVE",
      }
    : defaultForm;
  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const beautifyPayload = (_data: any) => {
    if (data?.image === _data?.file) {
      const payload = {
        title: "",
        description: "",
        status: "",
        comma_value_if_dropdown: "",
        feature_option_type: "",
        feature_category_id: "",
        unit_id: "",
      };
      payload.title = _data.title;
      payload.description = _data.description;
      payload.status = _data.status ? "ACTIVE" : "PENDING";
      payload.comma_value_if_dropdown = _data.comma_value_if_dropdown;
      payload.feature_option_type = _data.feature_option_type;
      payload.feature_category_id = _data.feature_category_id;
      payload.unit_id = _data.unit_id;
      return payload;
    } else {
      const payload = {
        title: "",
        description: "",
        file: "",
        status: "",
        comma_value_if_dropdown: "",
        feature_option_type: "",
        feature_category_id: "",
        unit_id: "",
      };
      payload.title = _data.title;
      payload.description = _data.description;
      payload.file = _data.file;
      payload.status = _data.status ? "ACTIVE" : "PENDING";
      payload.comma_value_if_dropdown = _data.comma_value_if_dropdown;
      payload.feature_option_type = _data.feature_option_type;
      payload.feature_category_id = _data.feature_category_id;
      payload.unit_id = _data.unit_id;
      return payload;
    }
  };

  const handleAdd = async () => {
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = featureValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormAdd(
          CRUD_FEATURE,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Feature");
          clearCachesByServerAction("/admin/form/features");
          router.push("/admin/form/features");
          setFormError(defaultError);
        } else {
          toast.error("Error While Adding Feature");
        }
      } else {
        toast.error("Validation Error");
        setFormError(error);
      }
    } catch (e) {
      toast.error("Error While Adding");
    }
  };
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = featureValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormUpdate(
          CRUD_FEATURE,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Feature");
          clearCachesByServerAction("/admin/form/features");
          router.push("/admin/form/features");
          setFormError(defaultError);
        } else {
          toast.error("Error While Updating Feature");
          setLoading(false);
        }
      } else {
        toast.error("Validation Error");
        setFormError(error);
        setLoading(false);
      }
    } catch (e) {
      toast.error("Error While Updating");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 w-[30rem] p-4 flex-col gap-5">
      <CustomInput
        title="Title"
        value={formData.title}
        onChange={(val: string) =>
          updateState("title", val, setFormData, setFormError)
        }
        placeholder="Enter title"
        error={formError.title}
        required
      />
      <CustomInput
        title="Description"
        value={formData.description}
        onChange={(val: string) =>
          updateState("description", val, setFormData, setFormError)
        }
        placeholder="Write here..."
        multiline
        rows={8}
        error={formError.description}
        required
      />

      <CustomToggleSwitch
        title="Is Active"
        value={formData.status}
        onChange={(val: boolean) => updateState("status", val, setFormData)}
        
      />
      <CustomDropzone
        title="Image"
        value={formData.file}
        onChange={(val: any) =>
          updateState("file", val, setFormData, setFormError)
        }
        error={formError.file}
        required
      />

      <CustomSelect
        title="Feature Category"
        data={beautifiedFeatureCategory}
        value={formData.feature_category_id}
        onChange={(val: string) =>
          updateState("feature_category_id", val, setFormData, setFormError)
        }
        placeholder="Select feature category"
        error={formError.feature_category_id}
        required
      />
      <CustomSelect
        title="Unit"
        data={beautifiedUnit}
        value={formData.unit_id}
        onChange={(val: string) =>
          updateState("unit_id", val, setFormData, setFormError)
        }
        error={formError.unit_id}
        placeholder="Select feature category"
      />

      <CustomRadio
        name="Comma Value If Dropdown"
        data={commaValueIfDropdown}
        value={formData.comma_value_if_dropdown}
        onChange={(val: string) =>
          updateState("comma_value_if_dropdown", val, setFormData)
        }
      />
      <CustomRadio
        name="Feature Option Type"
        data={featureOptionType}
        value={formData.feature_option_type}
        onChange={(val: string) =>
          updateState("feature_option_type", val, setFormData)
        }
      />

      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        onClick={isEdit ? handleUpdate : handleAdd}
        disabled={loading}
      />
    </div>
  );
};

export default AddEditFeature;
