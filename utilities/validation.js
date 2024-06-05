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
    console.log(e);
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
    console.log(e);
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
    console.log(e);
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
    if (!title.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!description.length > 0) {
      errorMessage.description = "Description is required.";
      count++;
    }
    if (!category_id.length > 0) {
      errorMessage.category_id = "Category is required.";
      count++;
    }
    if (!body_type_id.length > 0) {
      errorMessage.body_type_id = "Body type is required.";
      count++;
    }
    if (!brand_id.length > 0) {
      errorMessage.brand_id = "Brand is required.";
      count++;
    }
    if (file.length == 0) {
      errorMessage.file = "Image is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.log(e);
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
    console.log(e);
  }
};

export const colorValidation = (payload) => {
  try {
    const { color, color_code } = payload;
    let count = 0;
    const errorMessage = {
      color: "",
      color_code: "",
    };
    if (!color.length > 0) {
      errorMessage.color = "Color is required.";
      count++;
    }
    if (!color_code.length > 0) {
      errorMessage.color_code = "Color Code is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.log(e);
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
    console.log(e);
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
    console.log(e);
  }
};

export const assetsPartValidation = (payload) => {
  try {
    const { title, description, image, assets_part_category_id } = payload;
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
    if (image?.length == 0) {
      errorMessage.file = "Image is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.log(e);
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
    console.log(e);
  }
};

export const enumValidation = (payload) => {
  try {
    const { title, file, order, slug } = payload;
    let count = 0;
    const errorMessage = {
      title: "",
      order: "",
      slug: "",
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
    // if (file?.length == 0) {
    //   errorMessage.file = "Image is required.";
    //   count++;
    // }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.log(e);
  }
};
export const vehicleValidation = (payload) => {
  try {
    const {
      title,
      brand_id,
      model_id,
      varient_id,
      made_year,
      owner,
      km_drive,
      prefer_selling,
      contact_email,
      contact_number,
      address,
      city,
      km_run,
      price,
    } = payload;
    let count = 0;
    const errorMessage = {
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
      // price: "",
    };
    if (!title?.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!brand_id?.length > 0) {
      errorMessage.brand_id = "Brand is required.";
      count++;
    }
    if (!model_id?.length > 0) {
      errorMessage.model_id = "Model is required.";
      count++;
    }
    if (!varient_id?.length > 0) {
      errorMessage.variant_id = "Variant is required.";
      count++;
    }
    if (!made_year?.length > 0) {
      errorMessage.made_year = "Manufacture Year is required.";
      count++;
    }
    if (!owner?.length > 0) {
      errorMessage.owner = "Owner is required.";
      count++;
    }
    if (!km_drive?.length > 0) {
      errorMessage.km_driven = "Driven is required.";
      count++;
    }
    if (!prefer_selling?.length > 0) {
      errorMessage.prefer_selling = "Prefer Selling is required.";
      count++;
    }
    if (!contact_email?.length > 0) {
      errorMessage.contact_email = "Email is required.";
      count++;
    }
    if (!contact_number?.length > 0) {
      errorMessage.contact_number = "Phone number is required.";
      count++;
    }
    if (!address?.length > 0) {
      errorMessage.address = "Address is required.";
      count++;
    }
    if (!city?.length > 0) {
      errorMessage.city = "City is required.";
      count++;
    }
    if (!km_run?.length > 0) {
      errorMessage.km_run = "Run distance is required.";
      count++;
    }
    // if (!price?.length > 0) {
    //   errorMessage.price = "Price is required.";
    //   count++;
    // }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.log(e);
  }
};
