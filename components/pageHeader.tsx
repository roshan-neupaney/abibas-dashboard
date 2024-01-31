import {Button} from "../src/subComponents/buttons";

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="headline-medium">{title}</div>
          <div className="headline-small">(87)</div>
        </div>
        <Button />
      </div>
    </>
  );
};

export default PageHeader;
