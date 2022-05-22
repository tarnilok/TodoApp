import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

//components
import TodosRowContainer from "../components/TodosRowContainer";
import Header from "../components/Header";

//utils
import { ApiFetcher, ApiHandler } from "../utils/ConnectApi";

//assets
import stroke from "../public/stroke.svg";
import arrow from "../public/arrow.svg";

//toastify
import { successToastify, errorToastify } from "../toastify/toastify";

// export const getStaticProps = async () => {
//   const response = await fetch("http://localhost:3000/api/todos");
//   const data = await response.json();

//   return {
//     props: { todos: data },
//   };
// };

{
  /* appearance-none bg-[#fff] border-[1.5px] border-[#21A7F9] rounded-[6px] grid place-content-center after:absolute after-border-[#21A7F9] after:border-[1.5px] after:left-[9px] after:top-[5px] after:w-[5px] after:h-[10px]  */
}

export default function Home() {
  const [todoItem, setTodoItem] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    ApiFetcher(setTodos);
  }, [todoItem]);

  const todoAddHandler = async () => {
    if (todoItem) {
      const response = await ApiHandler("/api/todos", todoItem, "post");
      console.log(response)
      setTodoItem("");
      response.status === 201 ? successToastify("work-to-do is created successfully🚀") : errorToastify("something went wrong🤷‍♂️ Please try again")
    }
  };

  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="A Todo App designed by WesterOps" />
        <link rel="icon" href="/Vector.svg" />
      </Head>
      <Header />
      <section className="w-[718px] h-[800px] mt-[40px] bg-[#FFF] rounded-[8px] overflow-auto">
        <h2 className="text-center text-2xl text-[#194591] font-[600] mt-[17px] ">To Do List</h2>
        <hr className="mt-[16px] h-[1.5px] border-none bg-[#E5E5E5]" />
        <div className="w-[148px] h-[4px] bg-[#FF7964] mt-[-3px] ml-auto mr-auto"></div>
        <div className="pl-[72px] pr-[63px] relative flex pt-[32px]">
          <input
            type="text"
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
            className="pl-[57px] pr-[20px] py-[15px] w-[521px] h-[54px] placeholder-text-xl border-[1.5px] border-[#999C9F] rounded-[4px] focus:outline-none focus:border-blue-600"
            placeholder="Add a task..."
          />
          <div className="absolute top-[49px] left-[91px]">
            <Image src={stroke} alt="stroke-asset" width="18px" height="14px" />
          </div>
          <button
            type="button"
            onClick={todoAddHandler}
            className="bg-[#21A7F9] rounded-[4px] w-[54px] h-[54px] ml-[8px] "
          >
            <Image src={arrow} alt="arrow-asset" width="" />
          </button>
        </div>
        <div className="mt-[32px] pl-[33px] pr-[73px] h-[600px] max-h-[601px] overflow-auto scrollbar-hide">
          <TodosRowContainer pinned={true} />
          <hr className="mt-[44px] mb-[14px] h-[1.5px] border-none bg-[#E5E5E5] ml-[72px] mr-[72px]" />
          {todos
            .filter((e) => e.pinned === false)
            .map(({ id, title }) => (
              <div key={id}>
                <TodosRowContainer title={title} ml={39} />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
