"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../../components/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../../components/checkbox";
import CustomDropzone from "../../../../../../components/dropzone";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_MODEL } from "../../../../../../config/endPoints";
import {
  PostFormAdd,
  PostFormUpdate,
} from "../../../../../../utilities/apiCall";
import CustomSelect from "../../../../../../components/select";
import { modelValidation } from "../../../../../../utilities/validation";

const defaultForm = {
  title: "",
  category_id: "",
  body_type_id: "",
  brand_id: "",
  description: "",
  status: false,
  file: "",
};

const defaultError = {
  title: "",
  description: "",
  file: "",
  category_id: "",
  body_type_id: "",
  brand_id: "",
};

const AddEditModel = ({
  token,
  data,
  isEdit,
  id,
  category,
  brand,
  body_type,
}: any) => {
  const beautifiedCategory = category?.data?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });
  const beautifiedBrand = brand?.data?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });
  const beautifiedBodyType = body_type?.data?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });

  const editForm = isEdit
    ? {
        title: data?.title || "",
        category_id: data?.category_id || "",
        body_type_id: data?.body_type_id || "",
        brand_id: data?.brand_id || "",
        description: data?.description || "",
        file: data?.image || "",
        status: data?.status == "ACTIVE",
      }
    : defaultForm;

  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);

  const router = useRouter();

  const beautifyPayload = (_data: any) => {
    if (data?.image === _data.file) {
      const payload = {
        title: "",
        category_id: "",
        body_type_id: "",
        brand_id: "",
        description: "",
        status: "",
      };
      payload.title = _data.title;
      payload.category_id = _data.category_id;
      payload.body_type_id = _data.body_type_id;
      payload.brand_id = _data.brand_id;
      payload.description = _data.description;
      payload.status = _data.status ? "ACTIVE" : "PENDING";
      return payload;
    } else {
      const payload = {
        title: "",
        category_id: "",
        body_type_id: "",
        brand_id: "",
        description: "",
        file: "",
        status: "",
      };
      payload.title = _data.title;
      payload.category_id = _data.category_id;
      payload.body_type_id = _data.body_type_id;
      payload.brand_id = _data.brand_id;
      payload.description = _data.description;
      payload.file = _data.file;
      payload.status = _data.status ? "ACTIVE" : "PENDING";
      return payload;
    }
  };

  const handleAdd = async () => {
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = modelValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormAdd(
          CRUD_MODEL,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Model");
          router.push("/admin/form/model");
          setFormError(defaultError);
        } else {
          toast.error("Error While Adding Model");
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
      const { isValid, error }: any = modelValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormUpdate(
          CRUD_MODEL,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Model");
          router.push("/admin/form/model");
          setFormError(defaultError);
        } else {
          toast.error("Error While Updating Model");
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
      <CustomSelect
        title="Category"
        data={beautifiedCategory}
        value={formData.category_id}
        onChange={(val: string) => updateState("category_id", val, setFormData, setFormError)}
        placeholder="Select Category"
        error={formError.category_id}
        required
      />
      <CustomSelect
        title="Body Type"
        data={beautifiedBodyType}
        value={formData.body_type_id}
        onChange={(val: string) => updateState("body_type_id", val, setFormData, setFormError)}
        placeholder="Select Body Type"
        error={formError.body_type_id}
        required
      />
      <CustomSelect
        title="Brand"
        data={beautifiedBrand}
        value={formData.brand_id}
        onChange={(val: string) => updateState("brand_id", val, setFormData, setFormError)}
        placeholder="Select Brand"
        error={formError.brand_id}
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
        required
      />
      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        onClick={isEdit ? handleUpdate : handleAdd}
      />
    </div>
  );
};

export default AddEditModel;
