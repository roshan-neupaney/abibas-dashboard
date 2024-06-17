"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../subComponents/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../subComponents/checkbox";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_STATIC_PAGE } from "../../../../../../config/endPoints";
import {
  FormdataPost,
  FormdataPatch,
} from "../../../../../../utilities/apiCall";
import { staticPageValidation } from "../../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";
import CustomDropzone from "@/subComponents/dropzone";
import CustomSelect from "@/subComponents/select";
import CustomEditor from "@/subComponents/editor";

const defaultForm = {
  title: "",
  description: "",
  enum_type: "",
  file: "",
  status: false,
};

const defaultError = {
  title: "",
  description: "",
  enum_type: "",
};

const AddEditStaticPage = ({ token, data, isEdit, id, enums }: any) => {
  const editForm = isEdit
    ? {
        title: data?.title || "",
        enum_type: data?.enum_type || "",
        file: data?.image || "",
        description: data?.description || "",
        status: data?.status === "ACTIVE",
      }
    : defaultForm;

  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const beautifiedStaticPage = enums.data
    .filter((items: any) => {
      if (items.slug === "static_page") {
        return items;
      }
    })
    .map((items: any) => {
      return { id: items.id, label: items.title };
    });

  const beautifyPayload = (_data: any) => {
    const payload = {
      title: "",
      enum_type: "",
      file: "",
      description: "",
      status: "",
      slug_url: "",
    };
    payload.title = _data.title;
    payload.slug_url = _data.title.toLowerCase().replaceAll(" ", "_");
    payload.description = _data.description;
    payload.enum_type = _data.enum_type;
    payload.file =
      data?.image === _data.file ? undefined : _data.file || undefined;
    payload.status = _data.status ? "ACTIVE" : "PENDING";
    return payload;
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = staticPageValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPost(
          CRUD_STATIC_PAGE,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Static Page");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/static-page");
          router.push("/admin/form/static-page");
        } else {
          toast.error("Error While Adding Static Page");
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
      const { isValid, error }: any = staticPageValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPatch(
          CRUD_STATIC_PAGE,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Static Page");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/static-page");
          router.push("/admin/form/static-page");
        } else {
          toast.error("Error While Updating Static Page");
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
    <div className="flex flex-1 w-3/5 p-4 flex-col gap-5">
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
      <CustomEditor
        title="Description"
        name="description"
        data={formData.description}
        onChange={(val: string) =>
          updateState("description", val, setFormData, setFormError)
        }
        error={formError.description}
        required
      />
      <CustomSelect
        title="Enum Type"
        data={beautifiedStaticPage}
        value={formData.enum_type}
        onChange={(val: string) =>
          updateState("enum_type", val, setFormData, setFormError)
        }
        placeholder="Select Enum Type"
        error={formError.enum_type}
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

export default AddEditStaticPage;
