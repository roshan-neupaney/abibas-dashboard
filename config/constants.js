export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;


export const tablePaginationSizes = [
  { value: 10 },
  { value: 20 },
  { value: 30 },
  { value: 50 },
  { value: 100 },
];

export const defaultStateModal = {
  state: false,
  id: '',
};

export const commaValueIfDropdown = [
  { id: "REQUIRED", label: "Required" },
  { id: "OPTIONAL", label: "Optional" },
];

export const specificationOptionType = [
  { id: "TEXT", label: "Text" },
  { id: "DROPDOWN", label: "Dropdown" },
];