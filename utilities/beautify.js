export const beautifyCategory = (data) => {
  try {
    const filteredData = data.map((cat) => {
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

export const beautifyBodyType = (data) => {
  try {
    const filteredData = data.map((body) => {
      const details = {
        id: "",
        image: "",
        title: "",
        description: "",
        status: "",
      };
      details.id = body?.id;
      details.image = body?.image;
      details.title = body?.title;
      details.description = body?.description;
      details.status = body?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyModel = (data) => {
  try {
    const filteredData = data.map((body) => {
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

export const beautifyColor = (data) => {
  try {
    const filteredData = data.map((cat) => {
      const details = {
        id: "",
        color: "",
        color_code: "",
        status: "",
      };
      details.id = cat?.id;
      details.color = cat?.color;
      details.color_code = cat?.color_code;
      details.status = cat?.status;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyVariant = (data) => {
  try {
    const filteredData = data?.map((body) => {
      const temp = body?.colors == "" ? "[]" : body?.colors;
      const color = JSON.parse(temp);
      const temp_color = color?.map((items) => {
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
    console.log("error", error);
  }
};

export const beautifyUnit = (data) => {
  try {
    const filteredData = data.map((cat) => {
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

export const beautifySpecificationCategory = (data) => {
  try {
    const filteredData = data.map((cat) => {
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

export const beautifyFeature = (data) => {
  try {
    const filteredData = data.map((cat) => {
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
export const beautifySpecification = (data) => {
  try {
    const filteredData = data.map((cat) => {
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
export const beautifyAssetsPart = (data) => {
  try {
    const filteredData = data.map((cat) => {
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
export const beautifyInspection = (data) => {
  try {
    const filteredData = data.map((cat) => {
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
      details.image = cat?.image;
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

export const beautifyBlog = (data) => {
  try {
    const filteredData = data.map((cat) => {
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
export const beautifyEnums = (data) => {
  try {
    const filteredData = data.map((cat) => {
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

export const beautifyVehicleList = (_data, vehicleEnums) => {
  try {
    const { data } = _data;
    const filteredData = data?.map((vehicle) => {
      const details = {
        id: "",
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
      const brandArray = vehicleEnums?.data?.brand.filter((items) => {
        if (vehicle.brand_id === items.id) {
          return items;
        }
      });
      const modelArray = vehicleEnums?.data?.model.filter((items) => {
        if (vehicle.model_id === items.id) {
          return items;
        }
      });
      const variantArray = vehicleEnums?.data?.varient.filter((items) => {
        if (vehicle.varient_id === items.id) {
          return items;
        }
      });
      const cityArray = vehicleEnums?.data?.enum_city.filter((items) => {
        if (vehicle.city === items.id) {
          return items;
        }
      });
      const driveArray = vehicleEnums?.data?.enum_drive.filter((items) => {
        if (vehicle.km_drive === items.id) {
          return items;
        }
      });
      const manufactureArray = vehicleEnums?.data?.enum_made_year.filter(
        (items) => {
          if (vehicle.made_year === items.id) {
            return items;
          }
        }
      );
      const ownerArray = vehicleEnums?.data?.enum_owner.filter((items) => {
        if (vehicle.owner === items.id) {
          return items;
        }
      });
      const preferSellingArray = vehicleEnums?.data?.enum_prefer_selling.filter(
        (items) => {
          if (vehicle.prefer_selling === items.id) {
            return items;
          }
        }
      );
      details.id = vehicle?.id + "_" + vehicle.varient_id || "";
      details.title = vehicle?.title || "";
      details.status = vehicle?.status || "";
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

export const beautifyVariants = (data) => {
  try {
    const filteredData = data.map((cat) => {
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
      details.image = cat?.image;
      return details;
    });
    return filteredData;
  } catch (error) {}
};

export const beautifyStaticPage = (data) => {
  try {
    const filteredData = data.map((cat) => {
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

export const beautifyUsers = (data) => {
  try {
    const filteredData = data.map((user) => {
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
