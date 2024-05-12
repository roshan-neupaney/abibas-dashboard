"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../subComponents/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../subComponents/checkbox";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_ASSETS_PARTS } from "../../../../../../config/endPoints";
import {
  PostFormAdd,
  PostFormUpdate,
} from "../../../../../../utilities/apiCall";
import {
  assetsPartValidation,
} from "../../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";
import CustomSelect from "../../../../../subComponents/select";
import CustomDropzone from "../../../../../subComponents/dropzone";

interface AssetsPartsProps {
  token: string | undefined;
  data: any;
  isEdit: boolean;
  id: string;
  assets_part_category: any;
}

interface formType {
  title: string;
  description: string;
  file: any,
  assets_part_category_id: string,
  status: boolean,
}

const defaultForm = {
  title: "",
  description: "",
  file: "",
  assets_part_category_id: "",
  status: false,
};

const defaultError = {
  title: "",
  description: "",
  file: "",
  assets_part_category_id: "",
  status: false,
};

const AddEditAssetsPart = ({
  token,
  data,
  isEdit,
  id,
  assets_part_category,
}: AssetsPartsProps) => {
  const editForm = isEdit
    ? {
        title: data?.title || "",
        description: data?.description || "",
        status: data?.status == "ACTIVE",
        assets_part_category_id: data?.assets_part_category_id,
        file: data?.image,
      }
    : defaultForm;
  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);

  const beautifiedAssetsPartCategory = assets_part_category?.data?.map(
    (items: any) => {
      return { id: items.id, label: items.title };
    }
  );

  const router = useRouter();

  const beautifyPayload = (_data: formType) => {
    if (data?.image === _data?.file) {
      const payload = {
        title: "",
        description: "",
        status: "",
        assets_part_category_id: "",
      };
      payload.title = _data.title;
      payload.description = _data.description;
      payload.assets_part_category_id = _data.assets_part_category_id;
      payload.status = _data.status ? "ACTIVE" : "PENDING";
      return payload;
    } else {
      const payload = {
        title: "",
        description: "",
        file: "",
        status: "",
        assets_part_category_id: "",
      };
      payload.title = _data.title;
      payload.description = _data.description;
      payload.assets_part_category_id = _data.assets_part_category_id;
      payload.file = _data.file;
      payload.status = _data.status ? "ACTIVE" : "PENDING";
      return payload;
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error } : any = assetsPartValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormAdd(
          CRUD_ASSETS_PARTS,
          beautifiedPayload,
          token
        );
        const { status } : any = response;
        if (status) {
          toast.success("Successfully Added Assets Part");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/assets-parts");
          router.push("/admin/form/assets-parts");
        } else {
          toast.error("Error While Adding Assets Part");
          setLoading(false);
        }
      } else {
        toast.error("Validation Error");
        setLoading(false);
        setFormError(error);
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
      assetsPartValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormUpdate(
          CRUD_ASSETS_PARTS,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Assets Part");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/assets-parts");
          router.push("/admin/form/assets-parts");
        } else {
          toast.error("Error While Updating Assets Part");
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
      <CustomSelect
        title="Assets Part Category"
        value={formData.assets_part_category_id}
        data={beautifiedAssetsPartCategory}
        onChange={(val: string) =>
          updateState("assets_part_category_id", val, setFormData, setFormError)
        }
        placeholder="Select Assets Part Category"
        error={formError.assets_part_category_id}
        required
      />
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
      <CustomDropzone
        title="Image"
        value={formData.file}
        onChange={(val: any) =>
          updateState("file", val, setFormData, setFormError)
        }
        error={formError.file}
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

export default AddEditAssetsPart;
