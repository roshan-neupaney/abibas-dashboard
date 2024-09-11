import { defaults } from "chart.js";

export const loginValidation = (payload) => {
  try {
    const { email, password } = payload;
    let count = 0;
    const errorMessage = {
      email: "",
      password: "",
    };
    if (!email.length > 0) {
      errorMessage.email = "Email is required.";
      count++;
    }
    if (!password.length > 0) {
      errorMessage.password = "Password is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.error(e);
  }
};
export const signupValidation = (payload) => {
  try {
    const { email, password, firstName, lastName, mobile } = payload;
    let count = 0;
    const errorMessage = {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      password: "",
    };
    if (!firstName.length > 0) {
      errorMessage.firstName = "Firstname is required.";
      count++;
    }
    if (!lastName.length > 0) {
      errorMessage.lastName = "Lastname is required.";
      count++;
    }
    if (!mobile.length > 0) {
      errorMessage.mobile = "Mobile is required.";
      count++;
    }
    if (!email.length > 0) {
      errorMessage.email = "Email is required.";
      count++;
    }
    if (!password.length > 0) {
      errorMessage.password = "Password is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.error(e);
  }
};

export const categoryValidation = (payload) => {
  try {
    const { title, description, file } = payload;
    let count = 0;
    const errorMessage = {
      title: "",
      description: "",
      file: "",
    };
    if (!title.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!description.length > 0) {
      errorMessage.description = "Description is required.";
      count++;
    }
    if (file?.length == 0) {
      errorMessage.file = "Image is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.errror(e);
  }
};

export const featureValidation = (payload) => {
  try {
    const { title, description, feature_category_id, unit_id } = payload;
    let count = 0;
    const errorMessage = {
      title: "",
      description: "",
      feature_category_id: "",
      unit_id: "",
      // file: '',
    };
    if (!title.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!description.length > 0) {
      errorMessage.description = "Description is required.";
      count++;
    }
    if (!feature_category_id.length > 0) {
      errorMessage.feature_category_id = "Feature Category is required.";
      count++;
    }
    if (!unit_id.length > 0) {
      errorMessage.unit_id = "Unit is required.";
      count++;
    }
    // if (file.length == 0) {
    //   errorMessage.file = "Image is required.";
    //   count++;
    // }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.errror(e);
  }
};

export const modelValidation = (payload) => {
  try {
    const { title, description, file, category_id, body_type_id, brand_id } =
      payload;
    let count = 0;
    const errorMessage = {
      title: "",
      description: "",
      category_id: "",
      body_type_id: "",
      brand_id: "",
    };
    if (!title?.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!description?.length > 0) {
      errorMessage.description = "Description is required.";
      count++;
    }
    if (!category_id?.length > 0) {
      errorMessage.category_id = "Category is required.";
      count++;
    }
    if (!body_type_id?.length > 0) {
      errorMessage.body_type_id = "Body type is required.";
      count++;
    }
    if (!brand_id?.length > 0) {
      errorMessage.brand_id = "Brand is required.";
      count++;
    }
    if (file?.length == 0) {
      errorMessage.file = "Image is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.errror(e);
  }
};

export const specificationValidation = (payload) => {
  try {
    const { title, description, file, specification_category_id } = payload;
    let count = 0;
    const errorMessage = {
      title: "",
      description: "",
      specification_category_id: "",
      // unit_id: "",
      // file: '',
    };
    if (!title?.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!description?.length > 0) {
      errorMessage.description = "Description is required.";
      count++;
    }
    if (!specification_category_id?.length > 0) {
      errorMessage.specification_category_id =
        "Specification Category is required.";
      count++;
    }
    // if (!unit_id?.length > 0) {
    //   errorMessage.unit_id = "Unit is required.";
    //   count++;
    // }
    // if (file?.length == 0) {
    //   errorMessage.file = "Image is required.";
    //   count++;
    // }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.errror(e);
  }
};

export const colorValidation = (payload) => {
  try {
    const { title, color_code } = payload;
    let count = 0;
    const errorMessage = {
      title: "",
      color_code: "",
    };
    if (!title.length > 0) {
      errorMessage.title = "Color is required.";
      count++;
    }
    if (!color_code.length > 0) {
      errorMessage.color_code = "Color Code is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.errror(e);
  }
};
export const unitValidation = (payload) => {
  try {
    const { title } = payload;
    let count = 0;
    const errorMessage = {
      title: "",
    };
    if (!title.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }

    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.errror(e);
  }
};
export const specificationCategoryValidation = (payload) => {
  try {
    const { title, description } = payload;
    let count = 0;
    const errorMessage = {
      title: "",
      description: "",
    };
    if (!title.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!description.length > 0) {
      errorMessage.description = "Description is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.errror(e);
  }
};

export const assetsPartValidation = (payload) => {
  try {
    const { title, description, file, assets_part_category_id } = payload;
    let count = 0;
    const errorMessage = {
      title: "",
      description: "",
      file: "",
      assets_part_category_id: "",
    };
    if (!title.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!description.length > 0) {
      errorMessage.description = "Description is required.";
      count++;
    }
    if (!assets_part_category_id.length > 0) {
      errorMessage.assets_part_category_id =
        "Assets Part Category is required.";
      count++;
    }
    if (file?.length == 0) {
      errorMessage.file = "Image is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.errror(e);
  }
};
export const inspectionValidation = (payload) => {
  try {
    const {
      title,
      description,
      inspection_category_id,
      start_text,
      end_text,
      bodypart,
      text_for_everything_fine,
    } = payload;
    let count = 0;
    const errorMessage = {
      title: "",
      description: "",
      inspection_category_id: "",
      start_text: "",
      bodypart: "",
      end_text: "",
      text_for_everything_fine: "",
    };
    if (!title.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!description.length > 0) {
      errorMessage.description = "Description is required.";
      count++;
    }
    if (!inspection_category_id.length > 0) {
      errorMessage.inspection_category_id = "Inspection Category is required.";
      count++;
    }
    if (!start_text?.length > 0) {
      errorMessage.start_text = "Start Text is required.";
      count++;
    }
    if (!bodypart?.length > 0) {
      errorMessage.bodypart = "Body Part is required.";
      count++;
    }
    if (!end_text?.length > 0) {
      errorMessage.end_text = "End Text is required.";
      count++;
    }
    if (!text_for_everything_fine?.length > 0) {
      errorMessage.text_for_everything_fine =
        "Text for if everything is fine is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.errror(e);
  }
};

export const enumValidation = (payload) => {
  try {
    const { title, file, order, slug, high_range, low_range } = payload;
    let count = 0;
    const errorMessage = {
      title: "",
      order: "",
      slug: "",
      high_range: "",
      low_range: "",
      // file: "",
    };
    if (!title?.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!order) {
      errorMessage.order = "Order is required.";
      count++;
    }
    if (!slug?.length > 0) {
      errorMessage.slug = "Slug is required.";
      count++;
    }
    if (!(high_range?.length > 0)) {
      errorMessage.high_range = "High Range is required.";
      count++;
    }
    if (!(low_range?.length > 0)) {
      errorMessage.low_range = "Low Range is required.";
      count++;
    }
    // if (file?.length == 0) {
    //   errorMessage.file = "Image is required.";
    //   count++;
    // }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.errror(e);
  }
};
export const shoeValidation = (payload) => {
  try {
    const {
      title,
      brand_id,
      category_id,
      price,
      description,
      details,
      color_variation,
    } = payload;

    let count = 0;
    const errorMessage = {
      title: "",
      brand_id: "",
      category_id: "",
      price: "",
      previous_price: "",
      description: "",
      details: "",
      color_variation: [],
    };
    if (!title?.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!brand_id?.length > 0) {
      errorMessage.brand_id = "Brand is required.";
      count++;
    }
    if (!category_id?.length > 0) {
      errorMessage.category_id = "Category is required.";
      count++;
    }
    if (!price?.length > 0) {
      errorMessage.price = "Price is required.";
      count++;
    }
    if (!description?.length > 0) {
      errorMessage.description = "Description Year is required.";
      count++;
    }
    if (!details?.length > 0) {
      errorMessage.details = "Details is required.";
      count++;
    }

    for (let i = 0; i < color_variation?.length; i++) {
      const colorError = {
        color: "",
        file: "",
        sizes: [],
      };
      if (!color_variation[i]?.color?.length > 0) {
        colorError.color = "Color is required";
      }
      if (color_variation[i]?.file?.length === 0) {
        colorError.file = "Image is required";
      }
      for (let j = 0; j < color_variation[i]?.sizes?.length; j++) {
        const sizeError = {
          size: "",
          stock: "",
        };
        console.log(i, errorMessage.color_variation);
        if (!color_variation[i]?.sizes[j]?.size?.length > 0) {
          sizeError.size = "Size is required";
        }
        if (!color_variation[i]?.sizes[j]?.stock?.length > 0) {
          sizeError.stock = "Stock is required";
        }
        colorError.sizes.push(sizeError);
      }
      errorMessage.color_variation.push(colorError);
    }

    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.error(e);
  }
};

export const staticPageValidation = (payload) => {
  try {
    const { title, description, enum_type } = payload;
    let count = 0;
    const errorMessage = {
      title: "",
      description: "",
      enum_type: "",
    };
    if (!title?.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!description?.length > 0) {
      errorMessage.description = "Description is required.";
      count++;
    }
    if (!enum_type?.length > 0) {
      errorMessage.enum_type = "Enum Type is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.errror(e);
  }
};

export const usersValidation = (payload) => {
  try {
    const { firstName, lastName, email, hash, role, mobile } = payload;
    let count = 0;
    const errorMessage = {
      firstName: "",
      lastName: "",
      email: "",
      hash: "",
      role: "",
      mobile: "",
    };
    if (!firstName.length > 0) {
      errorMessage.firstName = "FirstName is required.";
      count++;
    }
    if (!lastName.length > 0) {
      errorMessage.lastName = "LastName is required.";
      count++;
    }
    if (!email?.length > 0) {
      errorMessage.email = "Email is required.";
      count++;
    }
    if (!hash?.length > 0) {
      errorMessage.hash = "Password is required.";
      count++;
    }
    if (!mobile?.length > 0) {
      errorMessage.mobile = "Mobile is required.";
      count++;
    }
    if (!role?.length > 0) {
      errorMessage.role = "Role is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.errror(e);
  }
};
