"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../subComponents/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../subComponents/checkbox";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_ENUM } from "../../../../../../config/endPoints";
import {
  FormdataPost,
  FormdataPatch,
} from "../../../../../../utilities/apiCall";
import { enumValidation } from "../../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";
import CustomDropzone from "@/subComponents/dropzone";
import { enumSlug } from "../../../../../../config/constants";
import CustomSelect from "@/subComponents/select";

const defaultForm = {
  title: "",
  order: "",
  file: "",
  slug: "",
  status: false,
};

const defaultError = {
  title: "",
  order: "",
  // file: "",
  slug: "",
};

const AddEditEnum = ({ token, data, isEdit, id }: any) => {
  const editForm = isEdit
    ? {
        title: data?.title || "",
        order: data?.order || "",
        slug: data?.slug || "",
        status: data?.status === "ACTIVE",
        file: data?.image || "",
      }
    : defaultForm;

  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const beautifyPayload = (_data: any) => {
    const payload = {
      title: "",
      order: "",
      file: "",
      status: "",
      slug: "",
    };
    payload.title = _data.title;
    payload.order = _data.order;
    payload.slug = _data.slug;
    payload.file = data?.image === _data.file ? undefined : _data.file || undefined;
    payload.status = _data.status ? "ACTIVE" : "PENDING";
    return payload;
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = enumValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPost(CRUD_ENUM, beautifiedPayload, token);
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Enum");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/enums");
          router.push("/admin/form/enums");
        } else {
          toast.error("Error While Adding Enum");
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
      const { isValid, error }: any = enumValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPatch(
          CRUD_ENUM,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Enum");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/enums");
          router.push("/admin/form/enums");
        } else {
          toast.error("Error While Updating Enum");
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
        title="Order"
        value={formData.order}
        onChange={(val: string) =>
          updateState("order", val, setFormData, setFormError)
        }
        placeholder="Ex. 1"
        error={formError.order}
        type="number"
        required
      />
      <CustomSelect
        title="Slug"
        data={enumSlug}
        value={formData.slug}
        onChange={(val: string) =>
          updateState("slug", val, setFormData, setFormError)
        }
        placeholder="Select Slug"
        error={formError.slug}
        required
      />
      <CustomDropzone
        title="Image"
        value={formData.file}
        onChange={(val: any) =>
          updateState("file", val, setFormData, setFormError)
        }
        // error={formError.file}
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

export default AddEditEnum;
