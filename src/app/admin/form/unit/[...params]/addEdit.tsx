"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../subComponents/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../subComponents/checkbox";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_UNIT } from "../../../../../../config/endPoints";
import {
  PostFormAdd,
  PostFormUpdate,
} from "../../../../../../utilities/apiCall";
import { unitValidation } from "../../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";

const defaultForm = {
  title: "",
  status: false,
};

const defaultError = {
  title: "",
};

const AddEditUnit = ({ token, data, isEdit, id }: any) => {
  const editForm = isEdit
    ? {
        title: data?.title || "",
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
      status: "",
    };
    payload.title = _data.title;
    payload.status = _data.status ? "ACTIVE" : "PENDING";
    return payload;
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = unitValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormAdd(CRUD_UNIT, beautifiedPayload, token);
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Unit");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/unit");
          router.push("/admin/form/unit");
        } else {
          toast.error("Error While Adding Unit");
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
      const { isValid, error }: any = unitValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormUpdate(
          CRUD_UNIT,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Unit");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/unit");
          router.push("/admin/form/unit");
        } else {
          toast.error("Error While Updating Unit");
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

export default AddEditUnit;
