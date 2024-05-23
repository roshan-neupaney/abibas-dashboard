"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../subComponents/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../subComponents/checkbox";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_SPECIFICATION_CATEGORY } from "../../../../../../config/endPoints";
import {
  FormdataPost,
  FormdataPatch,
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
};

const AddEditSpecificationCategory = ({ token, data, isEdit, id }: any) => {
  const editForm = isEdit
    ? {
        title: data?.title || "",
        description: data?.description || "",
        status: data?.status == "ACTIVE",
      }
    : defaultForm;

  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any =
        specificationCategoryValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPost(
          CRUD_SPECIFICATION_CATEGORY,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Specification Category");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/specification-category");
          router.push("/admin/form/specification-category");
        } else {
          toast.error("Error While Adding Specification Category");
          setLoading(false);
          
        }
      } else {
        toast.error("Validation Error");
        setFormError(error);
        setLoading(false);
        
      }
    } catch (e) {
      toast.error("Error While Adding");
      setLoading(false);
      
    }
  };
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any =
      specificationCategoryValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPatch(
          CRUD_SPECIFICATION_CATEGORY,
          id,
          beautifiedPayload,
          token
          );
          const { status }: any = response;
          if (status) {
            toast.success("Successfully Updated Specification Category");
            setFormError(defaultError);
            clearCachesByServerAction("/admin/form/specification-category");
            router.push("/admin/form/specification-category");
          } else {
            toast.error("Error While Updating Specification Category");
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
      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        onClick={isEdit ? handleUpdate : handleAdd}
        disabled={loading}
      />
    </div>
  );
};

export default AddEditSpecificationCategory;
