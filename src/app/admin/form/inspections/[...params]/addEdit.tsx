"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../../components/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../../components/checkbox";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  CRUD_INSPECTIONS,
  CRUD_INSPECTION_CATEGORY,
} from "../../../../../../config/endPoints";
import {
  FormPatchJson,
  FormPostJson,
  PostFormAdd,
  PostFormUpdate,
} from "../../../../../../utilities/apiCall";
import {
  categoryValidation,
  inspectionValidation,
  unitValidation,
} from "../../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";
import CustomSelect, {
  CustomMultiSelect,
} from "../../../../../../components/select";
import { CustomRadio } from "../../../../../../components/radio";
import {
  commaValueIfDropdown,
  specificationOptionType,
} from "../../../../../../config/constants";

const defaultForm = {
  title: "",
  description: "",
  status: false,
  inspection_category_id: "",
  start_text: "",
  bodypart: [],
  end_text: "",
  inspection_option_type: "",
  comma_value_if_dropdown: "",
  text_for_everything_fine: "",
};

const defaultError = {
  title: "",
  description: "",
  inspection_category_id: "",
  start_text: "",
  bodypart: "",
  end_text: "",
  inspection_option_type: "",
  comma_value_if_dropdown: "",
  text_for_everything_fine: "",
};

const AddEditInspection = ({
  token,
  data,
  isEdit,
  id,
  inspection_category,
  body_part,
}: any) => {
  const editForm = isEdit
    ? {
        title: data?.title || "",
        description: data?.description || "",
        status: data?.status == "ACTIVE",
        inspection_category_id: data?.inspection_category_id || "",
        start_text: data?.start_text || "",
        bodypart: data?.bodypart || [],
        end_text: data?.end_text || "",
        inspection_option_type: data?.inception_option_type || "",
        comma_value_if_dropdown: data?.comma_value_if_dropdown || "",
        text_for_everything_fine: data?.text_for_everything_fine || "",
      }
    : defaultForm;

  const beautifiedInspectionCategory = inspection_category?.data?.map(
    (items: any) => {
      return { id: items.id, label: items.title };
    }
  );
  const beautifiedBodyPart = body_part?.data?.map((items: any) => {
    return { id: items.id, label: items.title };
  });

  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);

  const router = useRouter();

  const beautifyPayload = (_data: any) => {
    const payload = {
      title: "",
      description: "",
      status: "",
      inspection_category_id: "",
      start_text: "",
      bodypart: [],
      end_text: "",
      inception_option_type: "",
      comma_value_if_dropdown: "",
      text_for_everything_fine: "",
    };
    payload.title = _data.title;
    payload.description = _data.description;
    payload.inspection_category_id = _data.inspection_category_id;
    payload.start_text = _data.start_text;
    payload.bodypart = _data.bodypart;
    payload.end_text = _data.end_text;
    payload.inception_option_type = _data.inspection_option_type;
    payload.comma_value_if_dropdown = _data.comma_value_if_dropdown;
    payload.text_for_everything_fine = _data.text_for_everything_fine;
    payload.status = _data.status ? "ACTIVE" : "PENDING";
    return payload;
  };

  const handleAdd = async () => {
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = inspectionValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormPostJson(
          CRUD_INSPECTIONS,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Inspection");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/inspections");
          router.push("/admin/form/inspections");
        } else {
          toast.error("Error While Adding Inspection");
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
      const { isValid, error }: any = inspectionValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormPatchJson(
          CRUD_INSPECTIONS,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Inspection");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/inspections");
          router.push("/admin/form/inspections");
        } else {
          toast.error("Error While Updating Inspection");
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
      <CustomSelect
        title="Inspection Category"
        value={formData.inspection_category_id}
        data={beautifiedInspectionCategory}
        onChange={(val: string) =>
          updateState("inspection_category_id", val, setFormData, setFormError)
        }
        placeholder="Select Inspection Category"
        error={formError.inspection_category_id}
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
      <CustomInput
        title="Start Text"
        value={formData.start_text}
        onChange={(val: string) =>
          updateState("start_text", val, setFormData, setFormError)
        }
        placeholder="Enter Start Text"
        error={formError.start_text}
        required
      />
      <CustomInput
        title="End Text"
        value={formData.end_text}
        onChange={(val: string) =>
          updateState("end_text", val, setFormData, setFormError)
        }
        placeholder="Enter End Text"
        error={formError.end_text}
        required
      />
      <CustomMultiSelect
        title="Body Part"
        value={formData.bodypart}
        data={beautifiedBodyPart}
        onChange={(val: string) =>
          updateState("bodypart", val, setFormData, setFormError)
        }
        placeholder="Select Body Part"
        error={formError.bodypart}
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
        name="Inspection Option Type"
        data={specificationOptionType}
        value={formData.inspection_option_type}
        onChange={(val: string) =>
          updateState("inspection_option_type", val, setFormData)
        }
      />
      <CustomInput
        title="Text For Everything Fine"
        value={formData.text_for_everything_fine}
        onChange={(val: string) =>
          updateState(
            "text_for_everything_fine",
            val,
            setFormData,
            setFormError
          )
        }
        placeholder="Enter Text"
        error={formError.text_for_everything_fine}
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
      />
    </div>
  );
};

export default AddEditInspection;
