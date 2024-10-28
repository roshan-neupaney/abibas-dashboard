"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../subComponents/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../subComponents/checkbox";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_COLOR } from "../../../../../../config/endPoints";
import {
  JsonPost,
  JsonPatch,
} from "../../../../../../utilities/apiCall";
import { colorValidation } from "../../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";

const defaultForm = {
  title: "",
  color_code: "#000000",
  status: false,
};

const defaultError = {
  title: "",
  color_code: "",
};

const AddEditColor = ({ token, data, isEdit, id }: any) => {
  const editForm = isEdit
    ? {
        title: data?.title || "",
        color_code: data?.color_code || "",
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
      color_code: "",
      status: "",
    };
    payload.title = _data.title;
    payload.color_code = _data.color_code;
    payload.status = _data.status ? "ACTIVE" : "PENDING";
    return payload;
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = colorValidation(beautifiedPayload);
      if (isValid) {
        const response = await JsonPost(
          CRUD_COLOR,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Color");
          clearCachesByServerAction("/admin/form/color");
          router.push("/admin/form/color");
          setFormError(defaultError);
        } else {
          toast.error("Error While Adding Color");
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
      const { isValid, error }: any = colorValidation(beautifiedPayload);
      if (isValid) {
        const response = await JsonPatch(
          CRUD_COLOR,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Color");
          clearCachesByServerAction("/admin/form/color");
          router.push("/admin/form/color");
          setFormError(defaultError);
        } else {
          toast.error("Error While Updating Color");
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
        title="Color"
        value={formData.title}
        onChange={(val: string) =>
          updateState("title", val, setFormData, setFormError)
        }
        placeholder="Enter color"
        error={formError.title}
        required
      />
      <CustomInput
        title="Color Code"
        value={formData.color_code}
        onChange={(val: string) =>
          updateState("color_code", val, setFormData, setFormError)
        }
        placeholder="Write here..."
        type="color"
        style={{ height: "30px", width: "100px", padding: "2px 3px" }}
        error={formError.color_code}
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

export default AddEditColor;
