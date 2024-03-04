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
    const { title, description, file, feature_category_id, unit_id } = payload;
    let count = 0;
    const errorMessage = {
      title: "",
      description: "",
      feature_category_id: "",
      unit_id: "",
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
    if (file.length == 0) {
      errorMessage.file = "Image is required.";
      count++;
    }
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
    const { title, description, file, specification_category_id, unit_id } =
      payload;
    let count = 0;
    const errorMessage = {
      title: "",
      description: "",
      specification_category_id: "",
      unit_id: "",
    };
    if (!title.length > 0) {
      errorMessage.title = "Title is required.";
      count++;
    }
    if (!description.length > 0) {
      errorMessage.description = "Description is required.";
      count++;
    }
    if (!specification_category_id.length > 0) {
      errorMessage.specification_category_id =
        "Specification Category is required.";
      count++;
    }
    if (!unit_id.length > 0) {
      errorMessage.unit_id = "Unit is required.";
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
