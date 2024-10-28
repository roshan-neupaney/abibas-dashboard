import CustomTextableSelect from "@/subComponents/TextableSelect";
import CustomInput from "@/subComponents/input";
import CustomSelect from "@/subComponents/select";
import React, { useEffect, useState } from "react";

const FeatureItems = ({
  beautifiedFeature,
  item,
  updateForm,
  feature,
  varFeature,
}: any) => {
  const statusData = [
    { id: "ACTIVE", label: "Active" },
    { id: "PENDING", label: "Pending" },
  ];
  const [isArray, setIsArray] = useState<any>([]);

  useEffect(() => {
      if(varFeature?.specification?.feature_option_type === 'DROPDOWN') {
        const array = varFeature?.specification?.comma_value_if_dropdown
            .split(",")
            .map((val: any) => {
              return { id: val, label: val };
            });
          setIsArray(array);
    }
  }, [varFeature?.specification?.feature_option_type,varFeature?.specification?.comma_value_if_dropdown ])

  const beautifyArrayValue = (id: any) => {
    feature.data?.filter((items: any) => {
      if (items.id === id) {
        if (items.feature_option_type === "DROPDOWN") {
          const array = items?.comma_value_if_dropdown
            .split(",")
            .map((val: any) => {
              return { id: val, label: val };
            });
          setIsArray(array);
        } else {
          setIsArray([]);
        }
        updateForm("value", '', item.id);
      }
    });
  };

  return (
    <div className="flex flex-1 gap-4 items-center my-2">
      <CustomTextableSelect
        title="Feature"
        value={item.featureId}
        data={beautifiedFeature}
        onChange={(val: string) => {
          updateForm("featureId", val, item.id);
          beautifyArrayValue(val);
        }}
        placeholder="Select Feature"
      />
      {isArray?.length > 0 ? (
        <CustomSelect
          title="Value"
          value={item.value}
          data={isArray}
          onChange={(val: string) => updateForm("value", val, item.id)}
          placeholder="Select Value"
        />
      ) : (
        <CustomInput
          title="Value"
          value={item.value}
          onChange={(val: string) => updateForm("value", val, item.id)}
          placeholder="Enter value"
        />
      )}
      <CustomSelect
        title="Status"
        value={item.status}
        data={statusData}
        onChange={(val: string) => updateForm("status", val, item.id)}
        placeholder="Select Status"
      />
    </div>
  );
};

export default FeatureItems;
