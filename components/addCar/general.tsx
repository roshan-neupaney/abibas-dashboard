import React, { useEffect, useState } from "react";
import CustomSelect from "../../src/subComponents/select";
import { CancelButton, SubmitButton } from "@/subComponents/buttons";
import CustomInput from "@/subComponents/input";
import { updateState, UUidGenerator } from "../../utilities/helper";
import { CustomToggleSwitch } from "@/subComponents/checkbox";
import { CRUD_SHOE } from "../../config/endPoints";
import { FormdataPost, FormdataPatch } from "../../utilities/apiCall";
import clearCachesByServerAction from "../../hooks/revalidate";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { shoeValidation } from "../../utilities/validation";
import { CustomLogoRadio } from "@/subComponents/logoRadio";
import AddShoeVariation from "./addShoeVariation";
// import CustomEditor from "@/subComponents/editor";
import dynamic from "next/dynamic";

const CustomEditor = dynamic( () => import( '@/subComponents/custom-editor' ), { ssr: false } );


const uuid: string = UUidGenerator();

const defaultForm = {
  title: "",
  brand_id: "",
  category_id: "",
  type: '',
  price: "",
  previous_price: "",
  description: "",
  details: "",
  color_variation: [
    {
      id: "uuid_" + uuid,
      color: [],
      file: "",
      sizes: [
        {
          id: "uuid_" + uuid,
          size: "5",
          stock: "22",
        },
      ],
    },
  ],
  status: false,
};
const defaultError = {
  title: "",
  brand_id: "",
  category_id: "",
  price: "",
  type: '',
  previous_price: "",
  description: "",
  details: "",
  color_variation: [
    {
      color: "",
      file: "",
      sizes: [
        {
          size: "",
          stock: "",
        },
      ],
    },
  ],
};
const General = ({
  shoe,
  shoe_category,
  shoe_brand,
  token,
  _id,
  isEdit,
  color,
}: any) => {
  const [formData, setFormData] = useState(defaultForm);
  const [formError, setFormError] = useState(defaultError);
  const [deleteColorVariation, setDeleteColorVariation] = useState<string[]>(
    []
  );
  console.log(shoe.data)
  const [deleteSizeVariation, setDeleteSizeVariation] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const beautifiedBrand = shoe_brand?.data?.map((items: any) => {
    return { id: items?.id, label: items?.title, image: items.image_name };
  });
  const beautifiedCategory = shoe_category?.data?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });

  const beautifiedColor = color?.data?.map((items: any) => {
    return {
      id: items?.title.toLowerCase().replace(" ", "_"),
      label: items?.title,
    };
  });
  const editForm = isEdit
    ? {
        title: shoe?.data?.title,
        brand_id: shoe?.data?.brand_id,
        category_id: shoe?.data?.category_id,
        type: shoe?.data?.type,
        price: shoe?.data?.price,
        previous_price: shoe?.data?.previous_price,
        description: shoe?.data?.description,
        details: shoe?.data?.details,
        color_variation: shoe?.data?.colorVariation,
        status: shoe?.data?.status === "ACTIVE",
      }
    : defaultForm;

  useEffect(() => {
    setFormData(editForm);
  }, []);

  const beautifyPayload = (_form: any) => {
    const payload = {
      title: "",
      brand_id: "",
      category_id: "",
      price: "",
      type: '',
      previous_price: "",
      description: "",
      details: "",
      color_variation: [],
      status: "",
    };
    const finalColorVariation = _form.color_variation?.map((cv: any) => {
      const fileteredSV = cv.sizes?.map((sv: any) => {
        if (sv.id.includes("uuid")) return { size: sv.size, stock: sv.stock };
        return { id: sv.id, size: sv.size, stock: sv.stock };
      });
      if (cv.id.includes("uuid")) {
        return {
          color: JSON.stringify(cv.color),
          file: cv.file,
          sizes: fileteredSV,
        };
      }
      return {
        id: cv.id,
        color: JSON.stringify(cv.color),
        file: cv.file || cv.image_url,
        sizes: fileteredSV,
      };
    });
    payload.title = _form.title;
    payload.brand_id = _form.brand_id;
    payload.category_id = _form.category_id;
    payload.price = _form.price;
    payload.type = _form.type;
    payload.previous_price = _form.previous_price;
    payload.description = _form.description;
    payload.details = _form.details;
    payload.color_variation = finalColorVariation;
    payload.status = _form.status ? "ACTIVE" : "PENDING";
    return payload;
  };
  const handleAdd = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = shoeValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPost(
          CRUD_SHOE,
          beautifiedPayload,
          token
        );
        const { status, data }: any = response;
        if (status) {
          toast.success("Successfully Added Shoes");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/inventory");
          // setLoading(false);
          router.replace(`/admin/inventory/edit/${data?.slug_url}`);
        } else {
          toast.error("Error While Adding Shoes");
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
      const { isValid, error }: any = shoeValidation(beautifiedPayload);
      if (isValid) {
        const response = await FormdataPatch(
          CRUD_SHOE,
          _id,
          { ...beautifiedPayload, deleteColorVariation, deleteSizeVariation },
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Shoes");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/inventory");
          router.push("/admin/inventory");
        } else {
          toast.error("Error While Updating Shoes");
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
console.log('formData', formData)
  return (
    <div className="body-container flex gap-5 p-4">
      <div className="flex flex-col gap-4 flex-1">
        <div className="gap-5 flex-col flex">
          <CustomInput
            title="Title"
            onChange={(val: string) =>
              updateState("title", val, setFormData, setFormError)
            }
            value={formData.title}
            placeholder="Enter title"
            required
            error={formError.title}
            width="30rem"
          />
          <CustomLogoRadio
            value={formData.brand_id}
            onChange={(val: string) =>
              updateState("brand_id", val, setFormData, setFormError)
            }
            name="Brand"
            data={beautifiedBrand}
            required
            error={formError.brand_id}
          />
            <CustomInput
              title="Type"
              onChange={(val: string) =>
                updateState("type", val, setFormData, setFormError)
              }
              value={formData.type}
              placeholder="Enter type"
              required
              error={formError.type}
              width="30rem"
            />

          <CustomSelect
            value={formData.category_id}
            onChange={(val: string) =>
              updateState("category_id", val, setFormData, setFormError)
            }
            title="Category"
            data={beautifiedCategory}
            placeholder="Select Category"
            required
            error={formError.brand_id}
            sx={{ width: "30rem" }}
          />

          <CustomEditor
            title="Description"
            name='description'
            onChange={(val: string) =>
              updateState("description", val, setFormData, setFormError)
            }
            data={formData.description}
            required
            // style={{ width: "30rem" }}
            error={formError.description}
          />

          <CustomEditor
            title="Detail"
            name="detail"
            onChange={(val: string) =>
              updateState("details", val, setFormData, setFormError)
            }
            data={formData.details}
            required
            // style={{ width: "30rem" }}
            error={formError.details}
          />
          <CustomInput
            title="Price"
            onChange={(val: string) =>
              updateState("price", val, setFormData, setFormError)
            }
            value={formData.price}
            placeholder="Enter price"
            required
            width="30rem"
            type="number"
            error={formError.price}
          />
          <CustomInput
            title="Previous Price"
            onChange={(val: string) =>
              updateState("previous_price", val, setFormData, setFormError)
            }
            value={formData.previous_price}
            placeholder="Enter previous price"
            type="number"
            width="30rem"
          />
          <AddShoeVariation
            {...{
              isEdit,
              setFormData,
              beautifiedColor,
              setDeleteColorVariation,
              setDeleteSizeVariation,
            }}
            color_variation={formData?.color_variation}
            formError={formError.color_variation}
          />
          <CustomToggleSwitch
            title="Is Active"
            value={formData.status}
            onChange={(val: boolean) => updateState("status", val, setFormData)}
          />
          <div className="flex gap-2">
            <SubmitButton
              title={isEdit ? "Edit" : "Add"}
              disabled={loading}
              onClick={isEdit ? handleUpdate : handleAdd}
            />
            <CancelButton title="Cancel" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
