"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../subComponents/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../subComponents/checkbox";
import CustomDropzone from "../../../../../subComponents/dropzone";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_BRAND } from "../../../../../../config/endPoints";
import {
  FormdataPost,
  FormdataPatch,
} from "../../../../../../utilities/apiCall";
import { categoryValidation } from "../../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";
import CustomChips from "@/subComponents/inputChips";

const defaultForm = {
  title: "",
  description: "",
  status: false,
  file: "",
  order: "",
};

const defaultError = {
  title: "",
  description: "",
  status: false,
  file: "",
};

const AddEditNewsCategory = ({ token, data, isEdit, id }: any) => {
  const editForm = isEdit
    ? {
        title: data?.title || "",
        description: data?.description || "",
        file: data?.image || "",
        status: data?.status == "ACTIVE",
        order: "",
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
      file: "",
      status: "",
      order: "",
    };
    payload.title = _data.title;
    payload.description = _data.description;
    payload.file = data?.image === _data.file ? undefined : _data.file;
    payload.status = _data.status ? "ACTIVE" : "PENDING";
    payload.order = _data.order;
    return payload;
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = categoryValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPost(
          CRUD_BRAND,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added News Category");
          clearCachesByServerAction("/admin/news/news-category");
          router.push("/admin/news/news-category");
          setFormError(defaultError);
        } else {
          toast.error("Error While Adding News Category");
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
      const { isValid, error }: any = categoryValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPatch(
          CRUD_BRAND,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated News Category");
          clearCachesByServerAction("/admin/news/news-category");
          router.push("/admin/news/news-category");
          setFormError(defaultError);
        } else {
          toast.error("Error While Updating News Category");
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
      <CustomInput
        title="Order"
        value={formData.order}
        onChange={(val: string) =>
          updateState("order", val, setFormData, setFormError)
        }
        placeholder="Ex. 1"
        error={formError.title}
        type="number"
        required
      />
      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        onClick={isEdit ? handleUpdate : handleAdd}
        disabled={loading}
      />
    </div>
  );
};

export default AddEditNewsCategory;
