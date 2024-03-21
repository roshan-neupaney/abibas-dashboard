"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../../components/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../../components/checkbox";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_ASSETS_PART_CATEGORY } from "../../../../../../config/endPoints";
import {
  PostFormAdd,
  PostFormUpdate,
} from "../../../../../../utilities/apiCall";
import { specificationCategoryValidation } from "../../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";

const defaultForm = {
  title: "",
  description: "",
  status: false,
};

const defaultError = {
  title: "",
  description: "",
  status: false,
};

const AddEditAssetsPartCategory = ({ token, data, isEdit, id }: any) => {
  const editForm = isEdit
    ? {
        title: data?.title || "",
        description: data?.description || "",
        status: data?.status == "ACTIVE",
      }
    : defaultForm;
  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);

  const router = useRouter();

  const beautifyPayload = (_data: any) => {
    const payload = {
      title: "",
      description: "",
      status: "",
    };
    payload.title = _data.title;
    payload.description = _data.description;
    payload.status = _data.status ? "ACTIVE" : "PENDING";
    return payload;
  };

  const handleAdd = async () => {
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any =
        specificationCategoryValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormAdd(
          CRUD_ASSETS_PART_CATEGORY,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Assets Part Category");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/assets-part-category");
          router.push("/admin/form/assets-part-category");
        } else {
          toast.error("Error While Adding Assets Part Category");
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
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any =
        specificationCategoryValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormUpdate(
          CRUD_ASSETS_PART_CATEGORY,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Assets Part Category");
          setFormError(defaultError);
          router.refresh();
          router.push("/admin/form/assets-part-category");
        } else {
          toast.error("Error While Updating Assets Part Category");
        }
      } else {
        toast.error("Validation Error");
        setFormError(error);
      }
    } catch (e) {
      toast.error("Error While Updating");
    }
  };

  return (
    <div className="flex flex-1 w-[30rem] p-4 flex-col gap-5">
      <CustomInput
        title="Title"
        value={formData.title}
        onChange={(val: string) => updateState("title", val, setFormData, setFormError)}
        placeholder="Enter title"
        error={formError.title}
        required
      />
      <CustomInput
        title="Description"
        value={formData.description}
        onChange={(val: string) => updateState("description", val, setFormData, setFormError)}
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
      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        onClick={isEdit ? handleUpdate : handleAdd}
      />
    </div>
  );
};

export default AddEditAssetsPartCategory;
