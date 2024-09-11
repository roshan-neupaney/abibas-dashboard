import { FormatDate, FormatPrice } from "./helper";

export const beautifyShoeList = (_data: any) => {
  try {
    const { data } = _data;
    const filteredData = data.map((shoe: any) => {
      const details = {
        id: "",
        image: "",
        title: "",
        price: "",
        brand: "",
        category: "",
        createdAt: "",
        status: "",
      };
      details.id = shoe?.id;
      details.image = shoe?.colorVariation[0]?.image_url;
      details.title = shoe?.title;
      details.price = shoe?.price;
      details.brand = shoe?.brand?.title;
      details.category = shoe?.category?.title;
      details.createdAt = FormatDate(shoe.createdAt);
      details.status = shoe?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};
export const beautifyCategory = (data: any) => {
  try {
    const filteredData = data?.map((cat: any) => {
      const details = {
        id: "",
        title: "",
        description: "",
        status: "",
        createdAt: ""
      };
      details.id = cat?.id;
      details.title = cat?.title;
      details.description = cat?.description;
      details.status = cat?.status;
      details.createdAt = FormatDate(cat?.createdAt);
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyBodyType = (data: any) => {
  try {
    const filteredData = data.map((body: any) => {
      const details = {
        id: "",
        image: "",
        title: "",
        description: "",
        status: "",
      };
      details.id = body?.id;
      details.image = body?.image_name;
      details.title = body?.title;
      details.description = body?.description;
      details.status = body?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyModel = (data: any) => {
  try {
    const filteredData = data.map((body: any) => {
      const details = {
        id: "",
        image: "",
        title: "",
        description: "",
        category: "",
        brand: "",
        body_type: "",
        status: "",
      };
      details.id = body?.id;
      details.image = body?.image;
      details.title = body?.title;
      details.description = body?.description;
      details.category = body?.category;
      details.brand = body?.brand;
      details.body_type = body?.body_type;
      details.status = body?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyColor = (data: any) => {
  try {
    const filteredData = data.map((col: any) => {
      const details = {
        id: "",
        title: "",
        color_code: "",
        status: "",
      };
      details.id = col?.id;
      details.title = col?.title;
      details.color_code = col?.color_code;
      details.status = col?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyVariant = (data: any) => {
  try {
    const filteredData = data?.map((body: any) => {
      const temp = body?.colors == "" ? "[]" : body?.colors;
      const color = JSON.parse(temp);
      const temp_color = color?.map((items: any) => {
        return items.color_code;
      });
      const details = {
        id: "",
        image: "",
        title: "",
        description: "",
        colors: [],
        fuel_type: "",
        transmission: "",
        model: "",
        status: "",
      };
      details.id = body?.id ?? "";
      details.image = body?.image || "";
      details.title = body?.title || "";
      details.description = body?.description || "";
      details.colors = temp_color || [];
      details.fuel_type = body?.fuel_type || "";
      details.transmission = body?.transmission || "";
      details.model = body?.model || "";
      details.status = body?.status || "";
      return details;
    });
    return filteredData;
  } catch (error) {
    console.error("error", error);
  }
};

export const beautifyUnit = (data: any) => {
  try {
    const filteredData = data.map((cat: any) => {
      const details = {
        id: "",
        title: "",
        status: "",
      };
      details.id = cat?.id;
      details.title = cat?.title;
      details.status = cat?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifySpecificationCategory = (data: any) => {
  try {
    const filteredData = data.map((cat: any) => {
      const details = {
        id: "",
        image: "",
        title: "",
        description: "",
        status: "",
      };
      details.id = cat?.id;
      details.image = cat?.image;
      details.title = cat?.title;
      details.description = cat?.description;
      details.status = cat?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyFeature = (data: any) => {
  try {
    const filteredData = data.map((cat: any) => {
      const details = {
        id: "",
        image: "",
        title: "",
        description: "",
        comma_value_dropdown: "",
        feature_option_type: "",
        feature_category: "",
        unit: "",
        status: "",
      };
      details.id = cat?.id;
      details.image = cat?.image;
      details.title = cat?.title;
      details.description = cat?.description;
      details.comma_value_dropdown = cat?.comma_value_if_dropdown;
      details.feature_option_type = cat?.feature_option_type;
      details.feature_category = cat?.feature_category;
      details.unit = cat?.unit;
      details.status = cat?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};
export const beautifySpecification = (data: any) => {
  try {
    const filteredData = data.map((cat: any) => {
      const details = {
        id: "",
        image: "",
        title: "",
        description: "",
        comma_value_dropdown: "",
        specification_option_type: "",
        specification_category: "",
        status: "",
      };
      details.id = cat?.id;
      details.image = cat?.image;
      details.title = cat?.title;
      details.description = cat?.description;
      details.comma_value_dropdown = cat?.comma_value_if_dropdown;
      details.specification_option_type = cat?.specification_option_type;
      details.specification_category = cat?.specification_category;
      details.status = cat?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};
export const beautifyAssetsPart = (data: any) => {
  try {
    const filteredData = data.map((cat: any) => {
      const details = {
        id: "",
        image: "",
        title: "",
        description: "",
        assets_part_category: "",
        status: "",
      };
      details.id = cat?.id;
      details.image = cat?.image;
      details.title = cat?.title;
      details.description = cat?.description;
      details.assets_part_category = cat?.assetsPartCategory;
      details.status = cat?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};
export const beautifyInspection = (data: any) => {
  try {
    const filteredData = data.map((cat: any) => {
      const details = {
        id: "",
        title: "",
        description: "",
        inspection_category: "",
        status: "",
        start_text: "",
        end_text: "",
        inception_option_type: "",
        comma_value_if_dropdown: "",
        text_for_everything_fine: "",
      };
      details.id = cat?.id;
      details.title = cat?.title;
      details.description = cat?.description;
      details.start_text = cat?.start_text;
      details.end_text = cat?.end_text;
      details.inspection_category = cat?.inspectionCategory;
      details.inception_option_type = cat?.inception_option_type;
      details.comma_value_if_dropdown = cat?.comma_value_if_dropdown;
      details.text_for_everything_fine = cat?.text_for_everything_fine;
      details.status = cat?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyBlog = (data: any) => {
  try {
    const filteredData = data.map((cat: any) => {
      const details = {
        id: "",
        image: "",
        title: "",
        description: "",
        author: "",
        status: "",
      };
      details.id = cat?.id;
      details.title = cat?.title;
      details.image = cat?.image;
      details.description = cat?.description.replace(/<[^>]*>/g, "");
      details.author = cat?.author;
      details.status = cat?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};
export const beautifyEnums = (data: any) => {
  try {
    const filteredData = data.map((cat: any) => {
      const details = {
        id: "",
        title: "",
        order: "",
        status: "",
        image: "",
      };
      details.id = cat?.id;
      details.title = cat?.title;
      details.order = cat?.order;
      details.status = cat?.status;
      details.image = cat?.image;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyVehicleList = (_data: any, vehicleEnums: any) => {
  try {
    const { data } = _data;
    const filteredData = data?.map((vehicle: any) => {
      const details = {
        id: "",
        slugId: "",
        title: "",
        brand: "",
        model: "",
        variant: "",
        drive: "",
        manufacture: "",
        prefer_selling: "",
        owner: "",
        city: "",
        km_run: "",
        price: "",
      };
      const brandArray = vehicleEnums?.data?.brand.filter((items: any) => {
        if (vehicle.brand_id === items.id) {
          return items;
        }
      });
      const modelArray = vehicleEnums?.data?.model.filter((items: any) => {
        if (vehicle.model_id === items.id) {
          return items;
        }
      });
      const variantArray = vehicleEnums?.data?.varient.filter((items: any) => {
        if (vehicle.varient_id === items.id) {
          return items;
        }
      });
      const cityArray = vehicleEnums?.data?.enum_city.filter((items: any) => {
        if (vehicle.city === items.id) {
          return items;
        }
      });
      const driveArray = vehicleEnums?.data?.enum_drive.filter((items: any) => {
        if (vehicle.km_drive === items.id) {
          return items;
        }
      });
      const manufactureArray = vehicleEnums?.data?.enum_made_year.filter(
        (items: any) => {
          if (vehicle.made_year === items.id) {
            return items;
          }
        }
      );
      const ownerArray = vehicleEnums?.data?.enum_owner.filter((items: any) => {
        if (vehicle.owner === items.id) {
          return items;
        }
      });
      const preferSellingArray = vehicleEnums?.data?.enum_prefer_selling.filter(
        (items: any) => {
          if (vehicle.prefer_selling === items.id) {
            return items;
          }
        }
      );
      details.id = vehicle?.id + "_" + vehicle.varient_id || "";
      details.slugId = vehicle?.id + "_" + vehicle.slug;
      details.title = vehicle?.title || "";
      details.km_run = vehicle?.km_run || "";
      details.price = vehicle?.price || "";
      details.brand = brandArray[0].title;
      details.model = modelArray[0].title;
      details.variant = variantArray[0].title;
      details.city = cityArray[0].title;
      details.drive = driveArray[0].title;
      details.manufacture = manufactureArray[0].title;
      details.owner = ownerArray[0].title;
      details.prefer_selling = preferSellingArray[0].title;
      return details;
    });
    return filteredData;
  } catch (e) {}
};

export const beautifyVariants = (data: any) => {
  try {
    const filteredData = data.map((cat: any) => {
      const details = {
        id: "",
        title: "",
        order: "",
        status: "",
        // image: '',
      };
      details.id = cat?.id;
      details.title = cat?.title;
      details.order = cat?.order;
      details.status = cat?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyStaticPage = (data: any) => {
  try {
    const filteredData = data.map((cat: any) => {
      const details = {
        id: "",
        title: "",
        description: "",
        status: "",
        image: "",
      };
      details.id = cat?.id;
      details.title = cat?.title;
      details.description = cat?.description.replace(/<[^>]*>/g, "");
      details.status = cat?.status;
      details.image = cat?.image;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyUsers = (data: any) => {
  try {
    const filteredData = data.map((user: any) => {
      const details = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        mobile: "",
        status: "",
      };
      details.id = user?.id;
      details.firstName = user?.firstName;
      details.lastName = user?.lastName;
      details.email = user?.email;
      details.role = user?.role;
      details.mobile = user?.mobile;
      details.status = user?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyWatchList = (_data: any) => {
  const { data } = _data;
  try {
    const filteredData = data.map((user: any) => {
      const details = {
        id: "",
        title: "",
        email: "",
        user_id: "",
        status: "",
      };
      details.id = user?.id;
      details.title =
        user?.user?.firstName + " " + user?.user?.lastName || "N/A";
      details.email = user?.user?.email || "N/A";
      details.user_id = user?.user_id;
      details.status = user?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};
export const beautifyOfferList = (_data: any) => {
  const { data } = _data;
  try {
    const filteredData = data.map((user: any) => {
      const details = {
        id: "",
        title: "",
        email: "",
        user_id: "",
        offer_amount: "",
        status: "",
      };
      details.id = user?.id;
      details.title =
        user?.user?.firstName + " " + user?.user?.lastName || "N/A";
      details.email = user?.user?.email || "N/A";
      details.user_id = user?.user_id;
      details.offer_amount = FormatPrice(user.offer_amount);
      details.status = user?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};
export const beautifyTestDriveList = (_data: any) => {
  const { data } = _data;
  try {
    const filteredData = data.map((user: any) => {
      const details = {
        id: "",
        title: "",
        email: "",
        user_id: "",
        date: "",
        time: "",
        status: "",
      };
      details.id = user?.id;
      details.title =
        user?.user?.firstName + " " + user?.user?.lastName || "N/A";
      details.email = user?.user?.email || "N/A";
      details.user_id = user?.user_id;
      details.date = user?.date_day;
      details.time = user?.day_time;

      details.status = user?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyAllBookingList = (_data: any) => {
  const { vehicles } = _data;
  try {
    const filteredData = vehicles.map((element: any) => {
      const details = {
        id: "",
        title: "",
        email: "",
        user_id: "",
        status: "",
        media: "",
      };
      details.id = element?.id;
      details.title =
        element?.user?.firstName + " " + element?.user?.lastName || "N/A";
      details.email = element?.user?.email || "N/A";
      details.user_id = element?.user_id;
      details.media = element?.vehicle?.vehicleImages[0]?.image_name;
      details.status = element?.status;
      return details;
    });
    return filteredData;
  } catch (error) {
    console.error(error);
  }
};
export const beautifyAllWatchList = (_data: any) => {
  const { vehicles } = _data;
  try {
    const filteredData = vehicles.map((element: any) => {
      const details = {
        id: "",
        title: "",
        email: "",
        user_id: "",
        status: "",
        media: "",
      };
      details.id = element?.id;
      details.title =
        element?.user?.firstName + " " + element?.user?.lastName || "N/A";
      details.email = element?.user?.email || "N/A";
      details.user_id = element?.user_id;
      details.media = element?.vehicle?.vehicleImages[0]?.image_name || "";
      details.status = element?.status;
      return details;
    });
    return filteredData;
  } catch (error) {
    console.error(error);
  }
};
export const beautifyAllTestDriveList = (_data: any) => {
  const { vehicles } = _data;
  try {
    const filteredData = vehicles.map((element: any) => {
      const details = {
        id: "",
        title: "",
        email: "",
        user_id: "",
        date: "",
        time: "",
        status: "",
        media: "",
      };
      details.id = element?.id;
      details.title =
        element?.user?.firstName + " " + element?.user?.lastName || "N/A";
      details.email = element?.user?.email || "N/A";
      details.user_id = element?.user_id;
      details.media = element?.vehicle?.vehicleImages[0]?.image_name || "";
      details.date = element?.date_day;
      details.time = element?.day_time;
      details.status = element?.status;
      return details;
    });
    return filteredData;
  } catch (error) {
    console.error(error);
  }
};
export const beautifyAllOffersList = (_data: any) => {
  const { vehicles } = _data;
  try {
    const filteredData = vehicles.map((element: any) => {
      const details = {
        id: "",
        title: "",
        email: "",
        user_id: "",
        offer_amount: "",
        status: "",
        media: "",
      };
      details.id = element?.id;
      details.title =
        element?.user?.firstName + " " + element?.user?.lastName || "N/A";
      details.email = element?.user?.email || "N/A";
      details.user_id = element?.user_id;
      details.media = element?.vehicle?.vehicleImages[0]?.image_name || "";
      details.offer_amount = FormatPrice(element.offer_amount);
      details.status = element?.status;
      return details;
    });
    return filteredData;
  } catch (error) {
    console.error(error);
  }
};
