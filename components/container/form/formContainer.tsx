import React from "react";

interface FormContainerProps {
  children: any;
}

const FormContainer = ({ children }: FormContainerProps) => {
  return <div className="form-container">{children}</div>;
};

export default FormContainer;
