import React, { useEffect, useState } from "react";
import CustomSelect from "../../src/subComponents/select";
import { CancelButton, SubmitButton } from "@/subComponents/buttons";
import CustomInput from "@/subComponents/input";
import { updateState } from "../../utilities/helper";
import { CustomToggleSwitch } from "@/subComponents/checkbox";
import { CRUD_VEHICLE } from "../../config/endPoints";
import { JsonPost, JsonPatch } from "../../utilities/apiCall";
import clearCachesByServerAction from "../../hooks/revalidate";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { vehicleValidation } from "../../utilities/validation";
import CustomTextableSelect from "@/subComponents/TextableSelect";
import { CustomLogoRadio } from "@/subComponents/logoRadio";
import { CustomTitleRadio } from "@/subComponents/titleRadio";

const defaultForm = {
  title: "",
  brand_id: "",
  model_id: "",
  variant_id: "",
  made_year: "",
  price: "",
  previous_price: "",
  owner: "",
  km_driven: "",
  prefer_selling: "",
  contact_email: "",
  contact_number: "",
  address: "",
  city: "",
  km_run: "",
  status: false,
};
const defaultError = {
  title: "",
  brand_id: "",
  model_id: "",
  variant_id: "",
  made_year: "",
  owner: "",
  km_driven: "",
  prefer_selling: "",
  contact_email: "",
  contact_number: "",
  address: "",
  city: "",
  km_run: "",
  price: "",
};
const General = ({ vehicle, vehicle_enum, token, id, isEdit }: any) => {
  const [formData, setFormData] = useState(defaultForm);
  const [formError, setFormError] = useState(defaultError);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const beautifiedBrand = vehicle_enum?.data?.brand?.map((items: any) => {
    return { id: items?.id, label: items?.title, image: items.image };
  });
  console.log('beautifiedBrand', vehicle_enum?.data?.brand)
  const beautifiedModel = vehicle_enum?.data?.model?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });
  const beautifiedVariant = vehicle_enum?.data?.varient?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });
  const beautifiedManufacture = vehicle_enum?.data?.enum_made_year?.map(
    (items: any) => {
      return { id: items?.id, label: items?.title };
    }
  );
  const beautifiedOwner = vehicle_enum?.data?.enum_owner?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });
  const beautifiedDriven = vehicle_enum?.data?.enum_drive?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });
  const beautifiedPreferSelling = vehicle_enum?.data?.enum_prefer_selling?.map(
    (items: any) => {
      return { id: items?.id, label: items?.title };
    }
  );
  const beautifiedCity = vehicle_enum?.data?.enum_city?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });

  const editForm = isEdit
    ? {
        title: vehicle?.data?.title || "",
        brand_id: vehicle?.data?.brand_id,
        model_id: vehicle?.data?.model_id,
        variant_id: vehicle?.data?.varient_id,
        made_year: vehicle?.data?.made_year,
        owner: vehicle?.data?.owner,
        km_driven: vehicle?.data?.km_drive,
        prefer_selling: vehicle?.data?.prefer_selling,
        contact_email: vehicle?.data?.contact_email,
        contact_number: vehicle?.data?.contact_number,
        address: vehicle?.data?.address,
        city: vehicle?.data?.city,
        price: vehicle?.data?.price,
        previous_price: vehicle?.data?.previous_price,
        status: vehicle?.data.status === "ACTIVE",
        km_run: vehicle?.data.km_run,
      }
    : defaultForm;

  useEffect(() => {
    setFormData(editForm);
  }, []);

  const beautifyPayload = (_form: any) => {
    const payload = {
      title: "",
      brand_id: "",
      model_id: "",
      varient_id: "",
      made_year: "",
      owner: "",
      km_drive: "",
      prefer_selling: "",
      contact_email: "",
      contact_number: "",
      address: "",
      city: "",
      status: "",
      km_run: "",
      price: 0,
      previous_price: 0,
    };
    payload.title = _form.title;
    payload.brand_id = _form.brand_id;
    payload.model_id = _form.model_id;
    payload.varient_id = _form.variant_id;
    payload.made_year = _form.made_year;
    payload.owner = _form.owner;
    payload.km_drive = _form.km_driven;
    payload.prefer_selling = _form.prefer_selling;
    payload.contact_email = _form.contact_email;
    payload.contact_number = _form.contact_number;
    payload.address = _form.address;
    payload.city = _form.city;
    payload.km_run = _form.km_run;
    payload.price = Number(_form.price);
    payload.previous_price = Number(_form.previous_price);
    payload.status = _form.status ? "ACTIVE" : "PENDING";
    return payload;
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = vehicleValidation(beautifiedPayload);
      if (isValid) {
        const response = await JsonPost(CRUD_VEHICLE, beautifiedPayload, token);
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Vehicle Details");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/inventory");
          router.push("/admin/inventory");
        } else {
          toast.error("Error While Updating Vehicle Details");
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
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error }: any = vehicleValidation(beautifiedPayload);
      if (isValid) {
        const response = await JsonPatch(
          CRUD_VEHICLE,
          id,
          beautifiedPayload,
          token
        );
        const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Vehicle Details");
          setFormError(defaultError);
          clearCachesByServerAction("/admin/inventory");
          router.push("/admin/inventory");
        } else {
          toast.error("Error While Updating Vehicle Details");
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
          {/* <CustomTextableSelect
            title="Brand"
            value={formData.brand_id}
            onChange={(val: string) =>
              updateState("brand_id", val, setFormData, setFormError)
            }
            data={beautifiedBrand}
            placeholder="Select Brand"
            required
            error={formError.brand_id}
            sx={{width: '30rem'}}
          /> */}
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
          {/* <CustomTitleRadio
            value={formData.model_id}
            onChange={(val: string) =>
              updateState("model_id", val, setFormData, setFormError)
            }
            name="Model"
            data={beautifiedModel}
            required
            error={formError.model_id}
          /> */}
          <CustomTextableSelect
            title="Model"
            value={formData.model_id}
            onChange={(val: string) =>
              updateState("model_id", val, setFormData, setFormError)
            }
            data={beautifiedModel}
            placeholder="Select Model"
            required
            error={formError.model_id}
            sx={{width: '30rem'}}
          />
          <CustomSelect
            title="Variant"
            value={formData.variant_id}
            onChange={(val: string) =>
              updateState("variant_id", val, setFormData, setFormError)
            }
            data={beautifiedVariant}
            placeholder="Select Variant"
            required
            error={formError.variant_id}
            sx={{width: '30rem'}}
          />
          <CustomSelect
            title="Manufacture"
            value={formData.made_year}
            onChange={(val: string) =>
              updateState("made_year", val, setFormData, setFormError)
            }
            data={beautifiedManufacture}
            placeholder="Select Manufacture"
            required
            error={formError.made_year}
            sx={{width: '30rem'}}
          />
          <CustomSelect
            title="Owner"
            value={formData.owner}
            onChange={(val: string) =>
              updateState("owner", val, setFormData, setFormError)
            }
            data={beautifiedOwner}
            placeholder="Select Owner"
            required
            error={formError.owner}
            sx={{width: '30rem'}}
          />
          <CustomSelect
            title="Driven"
            value={formData.km_driven}
            onChange={(val: string) =>
              updateState("km_driven", val, setFormData, setFormError)
            }
            data={beautifiedDriven}
            placeholder="Select Driven"
            required
            error={formError.km_driven}
            sx={{width: '30rem'}}
          />
          <CustomInput
            title="Km Run"
            onChange={(val: string) =>
              updateState("km_run", val, setFormData, setFormError)
            }
            value={formData.km_run}
            placeholder="Ex. 40000"
            required
            error={formError.km_run}
            width="30rem"
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
            // error={formError.price}
          />
          <CustomInput
            title="Previous Price"
            onChange={(val: string) =>
              updateState("previous_price", val, setFormData, setFormError)
            }
            value={formData.previous_price}
            placeholder="Enter previous price"
            width="30rem"
          />
          <CustomSelect
            title="Prefer Selling"
            value={formData.prefer_selling}
            onChange={(val: string) =>
              updateState("prefer_selling", val, setFormData, setFormError)
            }
            data={beautifiedPreferSelling}
            placeholder="Select Prefer Selling"
            required
            error={formError.prefer_selling}
            sx={{width: '30rem'}}
          />
          <CustomInput
            title="Email"
            onChange={(val: string) =>
              updateState("contact_email", val, setFormData, setFormError)
            }
            value={formData.contact_email}
            placeholder="Enter Contact Email"
            required
            error={formError.contact_email}
            width="30rem"
          />

          <CustomInput
            title="Phone"
            onChange={(val: string) =>
              updateState("contact_number", val, setFormData, setFormError)
            }
            value={formData.contact_number}
            placeholder="Enter Phone"
            required
            error={formError.contact_number}
            width="30rem"
          />
          <CustomInput
            title="Address"
            onChange={(val: string) =>
              updateState("address", val, setFormData, setFormError)
            }
            value={formData.address}
            placeholder="Enter Address"
            required
            error={formError.address}
            width="30rem"
          />
          <CustomSelect
            title="City"
            value={formData.city}
            onChange={(val: string) =>
              updateState("city", val, setFormData, setFormError)
            }
            data={beautifiedCity}
            placeholder="Select City"
            required
            error={formError.city}
            sx={{width: '30rem'}}
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
      {/* <Overview /> */}
    </div>
  );
};

export default General;
