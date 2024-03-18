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
        model: "",
        status: "",
      };
      details.id = body?.id ?? "";
      details.image = body?.image || "";
      details.title = body?.title || "";
      details.description = body?.description || "";
      details.colors = temp_color || [];
      details.fuel_type = body?.fuel_type || "";
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
