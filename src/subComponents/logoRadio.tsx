import { IMAGE_URL } from "../../config/constants";
import LazyImage from "../../components/lazyImage";

interface CustomLogoRadioProps {
  value: string;
  onChange: any;
  name: string;
  data: any;
  required?: boolean;
  error?: string;
}

export const CustomLogoRadio = ({
  value,
  onChange,
  name,
  data,
  required = false,
  error = "",
}: CustomLogoRadioProps) => {
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
                  
                  <div
                    className={`flex justify-center items-center w-32 h-20 py-2 border-2 ${
                      value === items.id
                        ? "border-blue-900"
                        : " border-blue-300"
                    } rounded-lg`}
                  >
                    <span className="relative h-full w-full">
                      <LazyImage
                        src={IMAGE_URL + "/small-" + items.image}
                        fill
                        alt="image"
                        quality={100}
                        className="object-contain"
                      />
                    </span>
                  </div>
                  <input
                    id={items.id}
                    type="radio"
                    className="opacity-0 w-0 h-0"
                    onChange={() => onChange(items.id)}
                  />
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
