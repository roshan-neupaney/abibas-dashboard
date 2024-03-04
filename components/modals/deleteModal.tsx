import Image from "next/image";
import crossIcon from "../../public/icons/cross.svg";
import { Button, CancelButton, SubmitButton } from "@/subComponents/buttons";

interface DeleteModalProps {
  open: boolean;
  handleClose: any;
  type: string;
  openModal?: any;
  handleDelete?: any;
}

const DeleteModal = ({
  open,
  handleClose,
  type,
  handleDelete,
}: DeleteModalProps) => {
  return (
    <>
      {open && (
        <div className="modal-container">
          <div className="modal">
            <div className="flex py-3 px-5 gap-4 items-center self-stretch border-b-[1px] border-solid border-[#D8DADB]">
              <div className="flex flex-1 headline-small-NH">Add Quote</div>
              <span
                className="flex p-[0.625rem] justify-center items-center "
                onClick={handleClose}
              >
                <Image src={crossIcon} height={20} width={20} alt="" />
              </span>
            </div>
            <div className="flex col py-4 px-5 gap-4">
              <div
                className="flex justify-center headline-small-NH"
                style={{ color: "#201A1B" }}
              >
                Do you want to delete this {type} ?
              </div>
              <div className="flex gap-2 justify-center">
                <SubmitButton
                  title="Delete"
                  onClick={handleDelete}
                  style={{ background: "#e60012" }}
                />
                <CancelButton title="Cancel" onClick={handleClose} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
