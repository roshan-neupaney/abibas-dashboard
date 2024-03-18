"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../../components/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../../components/checkbox";
import CustomDropzone from "../../../../../../components/dropzone";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_SPECIFICATION } from "../../../../../../config/endPoints";
import {
  PostFormAdd,
  PostFormUpdate,
} from "../../../../../../utilities/apiCall";
import CustomSelect from "../../../../../../components/select";
import { CustomRadio } from "../../../../../../components/radio";
import { specificationValidation } from "../../../../../../utilities/validation";
import {
  commaValueIfDropdown,
  specificationOptionType,
} from "../../../../../../config/constants";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";

const defaultForm = {
  title: "",
  description: "",
  comma_value_if_dropdown: "",
  specification_option_type: "",
  specification_category_id: "",
  unit_id: "",
  status: false,
  file: "",
};

const defaultError = {
  title: "",
  description: "",
  specification_category_id: "",
  unit_id: "",
  file: "",
};

const AddEditSpecification = ({
  token,
  data,
  isEdit,
  id,
  specification_category,
  unit,
}: any) => {
  const beautifiedSpecificationCategory = specification_category?.data?.map(
    (items: any) => {
      return { id: items.id, label: items.title };
    }
  );
  const beautifiedUnit = unit?.data?.map((items: any) => {
    return { id: items.id, label: items.title };
  });

  const editForm = isEdit
    ? {
        title: data?.title || "",
        description: data?.description || "",
        comma_value_if_dropdown: data?.comma_value_if_dropdown || "",
        specification_option_type: data?.specification_option_type || "",
        specification_category_id: data?.specification_category_id || "",
        unit_id: data?.unit_id || "",
        file: data?.image || "",
        status: data?.status == "ACTIVE",
      }
    : defaultForm;
  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const beautifyPayload = (_data: any) => {
    if (data?.image === _data?.file) {
      const payload = {
        title: "",
        description: "",
        status: "",
        comma_value_if_dropdown: "",
        specification_option_type: "",
        specification_category_id: "",
        unit_id: "",
      };
      payload.title = _data.title;
      payload.description = _data.description;
      payload.status = _data.status ? "ACTIVE" : "PENDING";
      payload.comma_value_if_dropdown = _data.comma_value_if_dropdown;
      payload.specification_option_type = _data.specification_option_type;
      payload.specification_category_id = _data.specification_category_id;
      payload.unit_id = _data.unit_id;
      return payload;
    } else {
      const payload = {
        title: "",
        description: "",
        file: "",
        status: "",
        comma_value_if_dropdown: "",
        specification_option_type: "",
        specification_category_id: "",
        unit_id: "",
      };
      payload.title = _data.title;
      payload.description = _data.description;
      payload.file = _data.file;
      payload.status = _data.status ? "ACTIVE" : "PENDING";
      payload.comma_value_if_dropdown = _data.comma_value_if_dropdown;
      payload.specification_option_type = _data.specification_option_type;
      payload.specification_category_id = _data.specification_category_id;
      payload.unit_id = _data.unit_id;
      return payload;
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any =
        specificationValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormAdd(
          CRUD_SPECIFICATION,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Specification");
          clearCachesByServerAction("/admin/form/specifications");
          router.push("/admin/form/specifications");
          setFormError(defaultError);
        } else {
          toast.error("Error While Adding Specification");
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
      const { isValid, error }: any =
        specificationValidation(beautifiedPayload);
      if (isValid) {
        const response = await PostFormUpdate(
          CRUD_SPECIFICATION,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Specification");
          clearCachesByServerAction("/admin/form/specifications");
          router.push("/admin/form/specifications");
          setFormError(defaultError);
        } else {
          toast.error("Error While Updating Specification");
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
        error={formError.description}
        multiline
        rows={8}
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

      <CustomSelect
        title="Specification Category"
        data={beautifiedSpecificationCategory}
        value={formData.specification_category_id}
        onChange={(val: string) =>
          updateState("specification_category", val, setFormData, setFormError)
        }
        placeholder="Select specification category"
        error={formError.specification_category_id}
        required
      />
      <CustomSelect
        title="Unit"
        data={beautifiedUnit}
        value={formData.unit_id}
        onChange={(val: string) =>
          updateState("unit", val, setFormData, setFormError)
        }
        placeholder="Select Unit"
        error={formError.unit_id}
        required
      />

      <CustomRadio
        name="Comma Value If Dropdown"
        data={commaValueIfDropdown}
        value={formData.comma_value_if_dropdown}
        onChange={(val: string) =>
          updateState("comma_value_if_dropdown", val, setFormData)
        }
      />
      <CustomRadio
        name="Specification Option Type"
        data={specificationOptionType}
        value={formData.specification_option_type}
        onChange={(val: string) =>
          updateState("specification_option_type", val, setFormData)
        }
      />

      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        onClick={isEdit ? handleUpdate : handleAdd}
        disabled={loading}
      />
    </div>
  );
};

export default AddEditSpecification;
