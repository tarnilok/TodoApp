import { useRef } from "react";
import Image from "next/image";

//assets
import union from "../public/union.svg";

//utils
import { ApiHandler } from "../utils/ConnectApi";

//componennts
import PopupModal from "./PopupModal";

const TodosRowContainer = ({ todo, ml, fetchTrigger, setfetchTrigger }) => {
  const inputRef = useRef();
  const CheckboxTracker = async (e) => {
    const data = { checked: e.target.checked };
    await ApiHandler(`/api/todos/${todo.id}`, data, "PATCH");
    inputRef.current.style.textDecorationLine = todo.checked ? "none" : "line-through";
    inputRef.current.style.opacity = todo.checked ? "100%" : "40%";
    setfetchTrigger(!fetchTrigger);
  };
  return (
    <div className="flex mt-[32px]">
      {todo.pinned && <Image src={union} alt="union-asset" width="21px" />}
      <input
        type="checkbox"
        className={
          ml
            ? "w-[24px] h-[24px] ml-[41px] shrink-0 hover:cursor-pointer"
            : "w-[24px] h-[24px] ml-[18px] shrink-0 hover:cursor-pointer"
        }
        value={todo.checked}
        onChange={(e) => CheckboxTracker(e)}
      />
      <input
        type="text"
        value={todo.title}
        className="text-xl font-[400] text-[#010A1B] ml-[16px] mr-[5px] grow disabled:bg-[#fff]"
        ref={inputRef}
        disabled
      />
      <PopupModal todo={todo} setfetchTrigger={setfetchTrigger} fetchTrigger={fetchTrigger} />
    </div>
  );
};

export default TodosRowContainer;
