import { CustomToggleSwitch } from "@/subComponents/checkbox";
import React, { useEffect, useState } from "react";
import { groupBy, groupByObject, updateState } from "../../utilities/helper";

interface VariantInspectionProps {
  inspection: any;
  setFormData: any;
  inspectionData: any;
  setDeleteInspections: any;
}

const VariantInspection = ({
  inspectionData,
  inspection,
  setFormData,
  setDeleteInspections,
}: VariantInspectionProps) => {
  const result: any = groupByObject(inspectionData, (items: any) => {
    return items.inspection.id;
  });

  const [inspectionsForm, setInspectionsForm] = useState<any>(result || {});

  const addInspection = (id: string, status: boolean) => {
    setInspectionsForm((prev: any) => {
      if (status) {
        return {
          ...prev,
          [id]: {
            ...prev[id],
            inspectionId: id,
            status: status ? "ACTIVE" : "PENDING",
            id: inspectionsForm[id]?.id ? inspectionsForm[id]?.id : undefined,
          },
        };
      } else {
        if (inspectionsForm[id]?.id) {
          setDeleteInspections((prev: any) => {
            return [...prev, { id: inspectionsForm[id]?.id }];
          });
        }
        delete prev[id];
        return {
          ...prev,
        };
      }
    });
  };

  useEffect(() => {
    updateState("inspections", Object.values(inspectionsForm), setFormData);
  }, [inspectionsForm]);

  return (
    <div
      className="flex self-stretch py-2 px-2 gap-3 flex-col"
      style={{ border: "1px solid #D8DADB", borderRadius: "4px" }}
    >
      <div className="flex">
        <div className="title-medium flex flex-1">Inspection</div>
      </div>
      <div className="flex px-4 flex-col gap-6">
        {inspection?.map((items: any, index: number) => {
          return (
            <div className="flex flex-1 flex-col gap-3" key={index}>
              <label className="body-medium">{items?.category}</label>
              <div className="flex gap-4">
                {items.value.map((elements: any, i: number) => {
                  const id = elements?.id;
                  return (
                    <React.Fragment key={'child-'+i}>
                      <CustomToggleSwitch
                        title={elements?.title}
                        value={inspectionsForm[id]?.status === "ACTIVE"}
                        onChange={(val: boolean) =>
                          addInspection(elements?.id, val)
                        }
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VariantInspection;
