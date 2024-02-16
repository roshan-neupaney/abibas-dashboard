'use client'
import { Button } from "../src/subComponents/buttons";
import arrowIcon from "../public/icons/icon-arrow-left.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  addRoute?: string;
  length?: number;
  showBack?: boolean;
}

const PageHeader = ({
  title,
  addRoute,
  length,
  showBack = false,
}: PageHeaderProps) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2">
          {showBack && (
            <div className="back-button" onClick={() => router.back() }>
              <Image src={arrowIcon} width={20} height={20} alt="" />
            </div>
          )}
          <div className="headline-medium">{title}</div>
          <div className="headline-small-NH">{length && 87}</div>
        </div>
        {addRoute && <Button addRoute={addRoute} title="Add New" addIcon />}
      </div>
    </>
  );
};

export default PageHeader;
