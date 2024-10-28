import { IMAGE_URL } from "../../config/constants";
import LazyImage from "../../components/lazyImage";

interface CustomTitleRadioProps {
  value: string;
  onChange: any;
  name: string;
  data: any;
  required?: boolean;
  error?: string;
}

export const CustomTitleRadio = ({
  value,
  onChange,
  name,
  data,
  required = false,
  error = "",
}: CustomTitleRadioProps) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="radio"
          className="label"
          style={{ color: error ? "red" : "#1a1c1e" }}
        >
          {name}
          {required ? "*" : ""}{" "}
        </label>
        <div className="gap-3 flex flex-wrap">
          {data?.map((items: any, index: number) => {
            return (
              <div key={index} className="flex gap-2 cursor-pointer">
                <label className="cursor-pointer">
                  <input
                    id={items.id}
                    type="radio"
                    className="opacity-0 w-0 h-0"
                    onChange={() => onChange(items.id)}
                  />
                  <div
                    className={`flex justify-center items-center w-fit py-2 px-3 border-2 ${
                      value === items.id
                        ? "border-blue-900"
                        : " border-blue-300"
                    } rounded-lg`}
                  >
                    <span className="title-medium">
                     {items.label}
                    </span>
                  </div>
                </label>
              </div>
            );
          })}
        </div>
        <div className="error-label h-1">{error}</div>
      </div>
    </>
  );
};
