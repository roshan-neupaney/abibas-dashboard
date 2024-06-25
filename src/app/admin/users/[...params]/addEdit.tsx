"use client";
import React, { useState } from "react";
import CustomInput from "../../../../subComponents/input";
import { updateState } from "../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../subComponents/checkbox";
import CustomDropzone from "../../../../subComponents/dropzone";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_USER } from "../../../../../config/endPoints";
import { JsonPost, JsonPatch, } from "../../../../../utilities/apiCall";
import {
  categoryValidation,
  usersValidation,
} from "../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../hooks/revalidate";
import CustomSelect from "@/subComponents/select";
import { UserRoles } from "../../../../../config/constants";

const defaultForm = {
  firstName: "",
  lastName: "",
  email: "",
  hash: "",
  role: "",
  mobile: "",
  status: false,
};

const defaultError = {
  firstName: "",
  lastName: "",
  email: "",
  hash: "",
  role: "",
  mobile: "",
  status: false,
};

const AddEditUser = ({ token, data, isEdit, id }: any) => {
  const editForm = isEdit
    ? {
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        email: data?.email || "",
        hash: "",
        role: data?.role || "",
        mobile: data?.mobile || "",
        status: data?.status == "ACTIVE",
      }
    : defaultForm;

  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const beautifyPayload = (_data: any) => {
    const payload = {
      firstName: "",
      lastName: "",
      email: "",
      hash: "",
      role: "",
      mobile: "",
      status: "",
    };
    payload.firstName = _data.firstName;
    payload.lastName = _data.lastName;
    payload.email = _data.email;
    payload.hash = _data.hash;
    payload.role = _data.role;
    payload.mobile = _data.mobile;
    payload.status = _data.status ? "ACTIVE" : "PENDING";
    return payload;
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = usersValidation(beautifiedPayload);
      if (isValid) {
        const response = await JsonPost(
          CRUD_USER,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added User");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/users");
          router.push("/admin/users");
        } else {
          toast.error("Error While Adding User");
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
      const { isValid, error }: any = usersValidation(beautifiedPayload);
      if (isValid) {
        const response = await JsonPatch(
          CRUD_USER,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated User");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/users");
          router.push("/admin/users");
        } else {
          toast.error("Error While Updating User");
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
        title="Firstname"
        value={formData.firstName}
        onChange={(val: string) =>
          updateState("firstName", val, setFormData, setFormError)
        }
        placeholder="Enter Firstname"
        error={formError.firstName}
        required
      />
      <CustomInput
        title="Lastname"
        value={formData.lastName}
        onChange={(val: string) =>
          updateState("lastName", val, setFormData, setFormError)
        }
        placeholder="Enter Lastname"
        error={formError.lastName}
        required
      />
      <CustomInput
        title="Email"
        value={formData.email}
        onChange={(val: string) =>
          updateState("email", val, setFormData, setFormError)
        }
        placeholder="Enter email"
        error={formError.email}
        required
      />
      <CustomInput
        title="Password"
        value={formData.hash}
        onChange={(val: string) =>
          updateState("hash", val, setFormData, setFormError)
        }
        placeholder="Enter password"
        error={formError.hash}
        required
      />
      <CustomInput
        title="Mobile no."
        value={formData.mobile}
        onChange={(val: string) =>
          updateState("mobile", val, setFormData, setFormError)
        }
        placeholder="Write here..."
        error={formError.mobile}
        required
      />
      <CustomSelect
        title="Role"
        value={formData.role}
        data={UserRoles}
        onChange={(val: string) =>
          updateState("role", val, setFormData, setFormError)
        }
        placeholder="Select Role"
        required
        error={formError.role}
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

export default AddEditUser;
