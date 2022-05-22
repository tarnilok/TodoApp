import Image from "next/image";

//assets
import union from "../public/union.svg";
import threeDot from "../public/threeDot.svg";

const TodosRowContainer = ({ pinned, title, ml }) => {
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
      />
      <input
        type="text"
        value={title}
        className="text-xl font-[400] text-[#010A1B] ml-[16px] mr-[5px] grow disabled:bg-[#fff]"
        disabled
      />
      <Image src={threeDot} alt="threeDot-asset" width="20px" className="hover:cursor-pointer" />
    </div>
  );
};

export default TodosRowContainer;
