import React, { forwardRef } from "react";
import Image from "next/image";

//style
import "reactjs-popup/dist/index.css";

//assets
import threeDot from "../public/threeDot.svg";
import unionBlack from "../public/unionBlack.svg";
import update from "../public/update.svg";
import trash from "../public/trash.svg";

//library
import Popup from "reactjs-popup";
import { successToastify, errorToastify } from "../toastify/toastify";

//utils
import { ApiHandler } from "../utils/ConnectApi";

const PopupModal = ({ todo, fetchTrigger, setfetchTrigger }) => {
  // eslint-disable-next-line react/display-name
  const CustomButton = forwardRef(({ open, ...props }, ref) => (
    <button className="button" name="button" ref={ref} {...props}>
      <Image src={threeDot} alt="threeDot-asset" width="20px" className="hover:cursor-pointer" />
    </button>
  ));

  const TodoEraser = async (todo) => {
    const response = await ApiHandler(`/api/todos/${todo.id}`, "", "DELETE");
    response.status === 200
      ? successToastify("deleted🔥")
      : errorToastify("something went wrong🤷‍♂️ please try again");
    setfetchTrigger(!fetchTrigger);
  };

  const Pinner = async (todo) => {
    const data = { pinned: !todo.pinned };
    const response = await ApiHandler(`/api/todos/${todo.id}`, data, "PATCH");
    response.status === 200
      ? successToastify("updated👍")
      : errorToastify("something went wrong🤷‍♂️ please try again");
    setfetchTrigger(!fetchTrigger);
  };
  return (
    <>
      <Popup
        on={"click"}
        arrow={"top bottom"}
        position={["bottom right", "top right", "top center"]}
        trigger={(open) => <CustomButton open={open} />}
      >
        <div className="p-[18px]">
          <div className="flex hover:bg-slate-100 py-1" onClick={() => Pinner(todo)}>
            <Image src={unionBlack} alt="pin-black-asset" width="20.83px" />
            <span className="grow text-[#010A1B] leading-[25px] text-[16px] tracking-[-0.015em] font-[400] ml-[10px] hover:cursor-pointer ">
              {todo.pinned ? "Remove pinning" : "Pin on the top"}
            </span>
          </div>
          <div className="flex hover:bg-slate-100 py-2 my-[10px]">
            <Image src={update} alt="update-asset" width="20.83px" />
            <span className="grow text-[#010A1B] leading-[19px] text-[16px] tracking-[-0.015em] font-[400] ml-[11px] hover:cursor-pointer">
              Update
            </span>
          </div>
          <div className="flex hover:bg-slate-100 py-2" onClick={() => TodoEraser(todo)}>
            <Image src={trash} alt="trash-asset" width="20.83px" height="20.83px" />
            <span className="grow text-[#010A1B] leading-[19px] text-[16px] tracking-[-0.015em] font-[400] ml-[11px] hover:cursor-pointer">
              Delete
            </span>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default PopupModal;
