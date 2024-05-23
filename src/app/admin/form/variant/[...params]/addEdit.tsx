"use client";
import React, { useState } from "react";
import CustomInput from "../../../../../subComponents/input";
import { groupBy, updateState } from "../../../../../../utilities/helper";
import { CustomToggleSwitch } from "../../../../../subComponents/checkbox";
import CustomDropzone from "../../../../../subComponents/dropzone";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CRUD_VARIANT } from "../../../../../../config/endPoints";
import {
  FormdataPost,
  FormdataPatch,
} from "../../../../../../utilities/apiCall";
import CustomSelect from "../../../../../subComponents/select";
import { CustomRadio } from "../../../../../subComponents/radio";
import Specification from "../../../../../../components/variant/specification";
import Feature from "../../../../../../components/variant/feature";
import Color from "../../../../../../components/variant/colorSelect";
import clearCachesByServerAction from "../../../../../../hooks/revalidate";

const defaultForm = {
  title: "",
  model_id: "",
  transmission: '',
  fuel_type: "",
  colors: [],
  specifications: [],
  features: [],
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

const AddEditVariant = ({
  token,
  data,
  isEdit,
  id,
  model,
  specification,
  feature,
  color,
  enums
}: any) => {
  const beautifiedModel = model?.data?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });
  const beautifiedSpecification = specification?.data?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });
  const beautifiedFeature = feature?.data?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });
  
  const result = groupBy(enums?.data, (items : any) => {
    return items?.slug;
  })
  
  const beautifiedTransmission = result.transmission.map((items) => {
    return {id: items?.title, label: items?.title}
  })
  console.log('beautifiedTransmission',beautifiedTransmission)
  

  const beautifiedColor = color?.data?.map((items: any) => {
    return {
      id: items?.id,
      label: items?.color,
      color_code: items?.color_code,
    };
  });
  const fuel = [
    { id: "PETROL", label: "Petrol" },
    { id: "DIESEL", label: "Diesel" },
    { id: "ELECTRIC", label: "Electric" },
    { id: "HYBRID", label: "Hybrid" },
  ];

  const editForm = isEdit
    ? {
        title: data?.title || "",
        model_id: data?.model_id || "",
        transmission: data?.transmission || "",
        fuel_type: data?.fuel_type || "",
        colors: JSON?.parse(data?.colors == "" ? "[]" : data?.colors) || [],
        specifications: data?.VariantSpecification,
        features: data?.VariantFeature,
        description: data?.description || "",
        file: data?.image || "",
        status: data?.status == "ACTIVE",
      }
    : defaultForm;

  const [formData, setFormData] = useState(editForm);
  const [errorForm, setErrorForm] = useState(defaultError);
  const [deleteSpecifications, setDeleteSpecifications] = useState<any>([]);
  const [deleteFeatures, setDeleteFeatures] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const beautifyPayload = (_data: any) => {
    const payload = {
      title: "",
      model_id: "",
      transmission: '',
      fuel_type: "",
      colors: [],
      specifications: [],
      features: [],
      description: "",
      status: "",
      file: "",
    };
    payload.title = _data.title;
    payload.model_id = _data.model_id;
    payload.transmission = _data.transmission;
    payload.fuel_type = _data.fuel_type;
    payload.colors = _data.colors;
    payload.description = _data.description;
    payload.features = _data.features;
    payload.specifications = _data.specifications;
    payload.status = _data.status ? "ACTIVE" : "PENDING";
    payload.file = data?.image === _data.file ? undefined : _data.file;
    return payload;
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const response = await FormdataPost(
        CRUD_VARIANT,
        beautifiedPayload,
        token
      );
      const { status }: any = response;
      if (status) {
        toast.success("Successfully Added Variant");
        clearCachesByServerAction("/admin/form/variant");
        router.push("/admin/form/variant");
      } else {
        toast.error("Error While Adding Variant");
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
      // const {is_valid, error } =
      const response = await FormdataPatch(
        CRUD_VARIANT,
        id,
        {
          ...beautifiedPayload,
          delete_specifications: deleteSpecifications,
          delete_features: deleteFeatures,
        },
        token
      );
      const { status }: any = response;
      if (status) {
        toast.success("Successfully Updated Variant");
        clearCachesByServerAction("/admin/form/variant");
        router.push("/admin/form/variant");
      } else {
        toast.error("Error While Updating Variant");
        setLoading(false);
      }
    } catch (e) {
      toast.error("Error While Updating");
      setLoading(false);
    }
  };

  console.log('formData', formData)
  return (
    <div className=" flex flex-1 p-4 flex-col gap-5">
      <div className="flex w-[30rem] flex-col gap-5">
        <CustomInput
          title="Title"
          value={formData.title}
          onChange={(val: string) => updateState("title", val, setFormData)}
          placeholder="Enter title"
        />
        <CustomSelect
          title="Model"
          data={beautifiedModel}
          value={formData.model_id}
          onChange={(val: string) => updateState("model_id", val, setFormData)}
          placeholder="Select Model"
        />
        <CustomSelect
          title="Transmission"
          data={beautifiedTransmission}
          value={formData.transmission}
          onChange={(val: string) => updateState("transmission", val, setFormData)}
          placeholder="Select Transmission"
        />

        <Color
          {...{ beautifiedColor, setFormData }}
          formData={formData.colors}
        />

        <CustomInput
          title="Description"
          value={formData.description}
          onChange={(val: string) =>
            updateState("description", val, setFormData)
          }
          placeholder="Write here..."
          multiline
          rows={8}
        />

        <CustomDropzone
          title="Image"
          value={formData.file}
          onChange={(val: any) => updateState("file", val, setFormData)}
        />

        <CustomRadio
          name="Fuel Type"
          value={formData.fuel_type}
          data={fuel}
          onChange={(val: string) => updateState("fuel_type", val, setFormData)}
        />
      </div>
      <Specification
        {...{
          beautifiedSpecification,
          setFormData,
          setDeleteSpecifications,
          specification,
        }}
        specificationData={data?.VariantSpecification}
      />
      <Feature
        {...{ beautifiedFeature, setFormData, setDeleteFeatures, feature }}
        featureData={data?.VariantFeature}
      />
      <CustomToggleSwitch
        title="Is Active"
        value={formData.status}
        onChange={(val: boolean) => updateState("status", val, setFormData)}
      />
      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        disabled={loading}
        onClick={isEdit ? handleUpdate : handleAdd}
      />
    </div>
  );
};

export default AddEditVariant;
