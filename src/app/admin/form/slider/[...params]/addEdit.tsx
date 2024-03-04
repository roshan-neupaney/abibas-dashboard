"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../../../../../../components/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../../components/checkbox";
import CustomDropzone from "../../../../../../components/dropzone";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_SLIDER } from "../../../../../../config/endPoints";
import {
  PostFormAdd,
  PostFormUpdate,
} from "../../../../../../utilities/apiCall";
import { categoryValidation } from "../../../../../../utilities/validation";

interface formDataType {
  title: string;
  description: string;
  status: boolean;
  file: any;
}


const defaultForm = {
  title: "",
  description: "",
  status: false,
  file: "",
};

const defaultError = {
  title: "",
  description: "",
  status: false,
  file: "",
};

const AddEditSlider = ({ token, data, isEdit, id }: any) => {
  
  const editForm = isEdit
  ? {
    title: data?.title || "",
    description: data?.description || "",
    file: data?.image || "",
    status: data?.status == "ACTIVE",
  }
  : defaultForm;
  
  const [formData, setFormData] = useState<formDataType>(editForm);
  const [formError, setFormError] = useState(defaultError);

  const router = useRouter();

  const beautifyPayload = (_data: formDataType) => {
    if (data?.image === _data.file) {
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
          CRUD_SLIDER,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Slider");
          router.push("/admin/form/slider");
          setFormError(defaultError);
        } else {
          toast.error("Error While Adding Slider");
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
      const { isValid, error }: any = categoryValidation(beautifiedPayload);
      if (isValid) {
      const response = await PostFormUpdate(
        CRUD_SLIDER,
        id,
        beautifiedPayload,
        token
      );
      const { status }: any = response;
      if (status) {
        toast.success("Successfully Updated Slider");
        router.push("/admin/form/slider");
        setFormError(defaultError);
      } else {
        toast.error("Error While Updating Slider");
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
      <CustomDropzone
        title="Image"
        value={formData.file}
        onChange={(val: any) => updateState("file", val, setFormData, setFormError)}
        error={formError.file}
      />
      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        onClick={isEdit ? handleUpdate : handleAdd}
      />
    </div>
  );
};

export default AddEditSlider;
