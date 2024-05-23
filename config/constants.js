// import { Metadata } from "next";
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
  id: "",
};

export const commaValueIfDropdown = [
  { id: "REQUIRED", label: "Required" },
  { id: "OPTIONAL", label: "Optional" },
];

export const specificationOptionType = [
  { id: "TEXT", label: "Text" },
  { id: "DROPDOWN", label: "Dropdown" },
];

export const enumSlug = [
  { id: "enum_owner", label: "Owner" },
  { id: "enum_made_year", label: "Manufacture Year" },
  { id: "enum_drive", label: "Drive" },
  { id: "enum_prefer_sell", label: "Prefer Sell" },
  { id: "enum_city", label: "City" },
  { id: "price_range", label: "Price Range" },
  { id: "transmission", label: "Transmission" },
];

export const metadata = {
  title: "",
};
