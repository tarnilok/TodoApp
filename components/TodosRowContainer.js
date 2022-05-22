import { useRef } from "react";
import Image from "next/image";

//assets
import union from "../public/union.svg";
import threeDot from "../public/threeDot.svg";
import { ApiHandler } from "../utils/ConnectApi";

const TodosRowContainer = ({ pinned, title, ml, id, isChecked, setIsChecked, checked }) => {
  const inputRef = useRef();
  const CheckboxTracker = async (e) => {
    const data = { checked: e.target.checked };
    await ApiHandler(`/api/todos/${id}`, data, "PATCH");
    inputRef.current.style.textDecorationLine = checked ? "none" : "line-through";
    inputRef.current.style.opacity = checked ? "100%" : "40%";
    setIsChecked(!isChecked);
  };
  return (
    <div className="flex mt-[32px]">
      {pinned && <Image src={union} alt="union-asset" width="21px" />}
      <input
        type="checkbox"
        className={
          ml
            ? "w-[24px] h-[24px] ml-[41px] shrink-0 hover:cursor-pointer"
            : "w-[24px] h-[24px] ml-[18px] shrink-0 hover:cursor-pointer"
        }
        value={checked}
        onChange={(e) => CheckboxTracker(e)}
      />
      <input
        type="text"
        value={title}
        className="text-xl font-[400] text-[#010A1B] ml-[16px] mr-[5px] grow disabled:bg-[#fff]"
        ref={inputRef}
        disabled
      />
      <Image src={threeDot} alt="threeDot-asset" width="20px" className="hover:cursor-pointer" />
    </div>
  );
};

export default TodosRowContainer;
