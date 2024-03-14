"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../../../../../../components/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../../components/checkbox";
import CustomDropzone from "../../../../../../components/dropzone";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_INSPECTION_CATEGORY } from "../../../../../../config/endPoints";
import {
  PostFormAdd,
  PostFormUpdate,
} from "../../../../../../utilities/apiCall";
import { categoryValidation } from "../../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";

const defaultForm = {
  title: "",
  description: "",
  status: false,
  file: "",
};

const defaultError = {
  title: "",
  description: "",
  file: "",
};

const AddEditInspectionCategory = ({ token, data, isEdit, id }: any) => {
  const editForm = isEdit
    ? {
        title: data?.title || "",
        description: data?.description || "",
        file: data?.image || "",
        status: data?.status == "ACTIVE",
      }
    : defaultForm;

  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);

  const router = useRouter();

  const beautifyPayload = (_data: any) => {
    if (data?.image === _data?.file) {
      const payload = {
        title: "",
        description: "",
        status: "",
      };
      payload.title = _data.title;
      payload.description = _data.description;
      payload.status = _data.status ? "ACTIVE" : "PENDING";
      return payload;
    } else {
      const payload = {
        title: "",
        description: "",
        file: "",
        status: "",
      };
      payload.title = _data.title;
      payload.description = _data.description;
      payload.file = _data.file;
      payload.status = _data.status ? "ACTIVE" : "PENDING";
      return payload;
    }
  };

  const handleAdd = async () => {
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = categoryValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormAdd(
          CRUD_INSPECTION_CATEGORY,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Inspection Category");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/inspection-category");
          // router.refresh();
          router.push("/admin/form/inspection-category");
        } else {
          toast.error("Error While Adding Inspection Category");
        }
      } else {
        toast.error("Validation Error");
        setFormError(error);
      }
    } catch (e) {
      toast.error("Error While Adding");
      console.log(e);
    }
  };
  const handleUpdate = async () => {
    try {
      const beautifiedPayload = beautifyPayload(formData);
      console.log("beautifiedPayload", beautifiedPayload);
      const { isValid, error }: any = categoryValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormUpdate(
          CRUD_INSPECTION_CATEGORY,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Inspection Category");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/inspection-category");
          router.push("/admin/form/inspection-category");
        } else {
          toast.error("Error While Updating Inspection Category");
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
      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        onClick={isEdit ? handleUpdate : handleAdd}
      />
    </div>
  );
};

export default AddEditInspectionCategory;
