"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../subComponents/input";
import { updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../subComponents/checkbox";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_BLOG } from "../../../../../../config/endPoints";
import {
  JsonPatch,
  JsonPost,
  FormdataPost,
  FormdataPatch,
} from "../../../../../../utilities/apiCall";
import { specificationCategoryValidation } from "../../../../../../utilities/validation";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";
import CustomEditor from "@/subComponents/editor";
import CustomSelect from "@/subComponents/select";
import CustomDropzone from "@/subComponents/dropzone";

const defaultForm = {
  title: "",
  description: "",
  short_description: "",
  is_published: false,
  is_showcase: false,
  is_highlight: false,
  author: "",
  blog_category: "",
  file: '',
  status: false,
};

const defaultError = {
  title: "",
  description: "",
};

const AddEditBlog = ({ token, data, isEdit, id, blog_category }: any) => {
  const editForm = isEdit
    ? {
        title: data?.title || "",
        description: data?.description || "",
        status: data?.status === "ACTIVE",
        short_description: data?.short_description || '',
        is_published: data?.is_published === "ACTIVE",
        is_showcase: data?.is_showcase === "ACTIVE",
        is_highlight: data?.is_highlight === "ACTIVE",
        author: data?.author || '',
        file: data?.image || '',
        blog_category: data?.blog_category || '',
      }
    : defaultForm;

  const [formData, setFormData] = useState(editForm);
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const beautifiedBlogCategory = blog_category?.data.map((items: any) => {
    return { id: items.id, label: items?.title };
  });

  const beautifyPayload = (_data: any) => {
    const payload = {
      title: "",
      slug_url: "",
      description: "",
      status: "",
      short_description: "",
      is_published: "",
      is_showcase: "",
      is_highlight: "",
      author: "",
      file: '',
      blog_category: "",
    };
    payload.title = _data.title;
    payload.slug_url = _data.title.toLowerCase().replace(" ", "_");
    payload.description = _data.description;
    payload.short_description = _data.short_description;
    payload.blog_category = _data.blog_category;
    payload.author = _data.author;
    payload.file = data.image === _data.file ? undefined : _data.file;
    payload.status = _data.status ? "ACTIVE" : "PENDING";
    payload.is_published = _data.is_published ? "ACTIVE" : "PENDING";
    payload.is_showcase = _data.is_showcase ? "ACTIVE" : "PENDING";
    payload.is_highlight = _data.is_highlight ? "ACTIVE" : "PENDING";
    return payload;
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any =
        specificationCategoryValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPost(
          CRUD_BLOG,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Added Blog");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/blogs");
          router.push("/admin/form/blogs");
        } else {
          toast.error("Error While Adding Blog");
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
        specificationCategoryValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPatch(
          CRUD_BLOG,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Blog");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/form/blogs");
          router.push("/admin/form/blogs");
        } else {
          toast.error("Error While Updating Blog");
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
    <div className="flex flex-1 w-[40rem] p-4 flex-col gap-5">
      <CustomSelect
        title="Specification Category"
        data={beautifiedBlogCategory}
        value={formData.blog_category}
        onChange={(val: string) =>
          updateState("blog_category", val, setFormData, setFormError)
        }
        placeholder="Select Blog Category"
        // error={formError.b_category}
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
      <CustomEditor
        title="Description"
        name="blog_description"
        data={formData.description}
        onChange={(val: any) =>
          updateState("description", val, setFormData)
        }
      />
      <CustomEditor
        title="Short Description"
        name="blog_short_description"
        data={formData.short_description}
        onChange={(val: any) =>
          updateState("short_description", val, setFormData)
        }
      />
      <CustomDropzone
        title="Image"
        value={formData.file}
        onChange={(val: any) =>
          updateState("file", val, setFormData, setFormError)
        }
        // error={formError.file}
        required
      />

      <CustomInput
        title="Author"
        value={formData.author}
        onChange={(val: string) =>
          updateState("author", val, setFormData, setFormError)
        }
        placeholder="Enter author's name"
        error={formError.title}
        required
      />
      <div className="flex gap-3">
        <CustomToggleSwitch
          title="Is Active"
          value={formData.status}
          onChange={(val: boolean) => updateState("status", val, setFormData)}
        />
        <CustomToggleSwitch
          title="Is Published"
          value={formData.is_published}
          onChange={(val: boolean) =>
            updateState("is_published", val, setFormData)
          }
        />
        <CustomToggleSwitch
          title="Is Showcase"
          value={formData.is_showcase}
          onChange={(val: boolean) =>
            updateState("is_showcase", val, setFormData)
          }
        />
        <CustomToggleSwitch
          title="Is Highlight"
          value={formData.is_highlight}
          onChange={(val: boolean) =>
            updateState("is_highlight", val, setFormData)
          }
        />
      </div>
      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        onClick={isEdit ? handleUpdate : handleAdd}
        disabled={loading}
      />
    </div>
  );
};

export default AddEditBlog;
