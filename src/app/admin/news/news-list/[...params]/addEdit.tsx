"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../subComponents/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../subComponents/checkbox";
import CustomDropzone from "../../../../../subComponents/dropzone";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_BRAND } from "../../../../../../config/endPoints";
import {
  FormdataPost,
  FormdataPatch,
} from "../../../../../../utilities/apiCall";
import { categoryValidation } from "../../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";
import CustomSelect from "@/subComponents/select";
import CustomChips from "@/subComponents/inputChips";

const defaultForm = {
  title: "",
  category: '',
  short_title: '',
  description: "",
  file: "",
  image_caption: '',
  pdf_file: '',
  tags: [],
  meta_tags: [],
  meta_keywords: [],
  author: '',
  publish_date: '',
  is_published: false,
  is_highlight: '',
  is_showcase: '',
  status: false,
};

const defaultError = {
  title: "",
  description: "",
  status: false,
  file: "",
};

const AddEditNews = ({ token, data, isEdit, id }: any) => {
  const editForm = isEdit
    ? {
        title: data?.title || "",
        description: data?.description || "",
        file: data?.image || "",
        status: data?.status == "ACTIVE",
        category: '',
        short_title: '',
        pdf_file: '',
        image_caption: '',
        tags: [],
  meta_tags: [],
  meta_keywords: [],
  author: '',
  publish_date: '',
      }
    : defaultForm;

  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const beautifyPayload = (_data: any) => {
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
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = categoryValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPost(
          CRUD_BRAND,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Brand");
          clearCachesByServerAction("/admin/news/news-list");
          router.push("/admin/news/news-list");
          setFormError(defaultError);
        } else {
          toast.error("Error While Adding Brand");
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
      const { isValid, error }: any = categoryValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPatch(
          CRUD_BRAND,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Brand");
          clearCachesByServerAction("/admin/news/news-list");
          router.push("/admin/news/news-list");
          setFormError(defaultError);
        } else {
          toast.error("Error While Updating Brand");
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
      <CustomSelect
        title="Category"
        data={[]}
        value={formData.category}
        onChange={(val: string) =>
          updateState("category", val, setFormData, setFormError)
        }
        placeholder="Select category"
        error={formError.title}
        required
      />
      <CustomInput
        title="Short title"
        value={formData.short_title}
        onChange={(val: string) =>
          updateState("short_title", val, setFormData, setFormError)
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
        <CustomInput
          title="Image Caption"
          value={formData.image_caption}
          onChange={(val: string) =>
            updateState("image_caption", val, setFormData, setFormError)
          }
          placeholder="Enter title"
          error={formError.title}
          required
        />
      <CustomDropzone
        title="Pdf File"
        value={formData.pdf_file}
        onChange={(val: any) =>
          updateState("pdf_file", val, setFormData, setFormError)
        }
        error={formError.file}
        required
      />
      <CustomChips
        title="Tags"
        value={formData.tags}
        onChange={(val: []) =>
          updateState("tags", val, setFormData, setFormError)
        }
        placeholder="Press Enter to add a tag"
        error={formError.title}
        required
      />
      <CustomChips
        title="Meta Tags"
        value={formData.meta_tags}
        onChange={(val: []) =>
          updateState("meta_tags", val, setFormData, setFormError)
        }
        placeholder="Press Enter to add a meta tag"
        error={formError.title}
        required
      />
      <CustomChips
        title="Meta Keyword"
        value={formData.meta_keywords}
        onChange={(val: []) =>
          updateState("meta_keywords", val, setFormData, setFormError)
        }
        placeholder="Press Enter to add a tag keyword"
        error={formError.title}
        required
      />
      <CustomSelect
        title="Author"
        data={[]}
        value={formData.author}
        onChange={(val: string) =>
          updateState("author", val, setFormData, setFormError)
        }
        placeholder="Select Author"
        error={formError.title}
        required
      />
      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        onClick={isEdit ? handleUpdate : handleAdd}
        disabled={loading}
      />
    </div>
  );
};

export default AddEditNews;
