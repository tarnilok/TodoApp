import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

//assets
import logo from "../public/logo.svg";
import stroke from "../public/stroke.svg";
import arrow from "../public/arrow.svg";

// export const getStaticProps = async () => {
//   const response = await fetch("http://localhost:3000/api/todos");
//   const data = await response.json();

//   return {
//     props: { todos: data },
//   };
// };

export default function Home() {
  const [todoItem, setTodoItem] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const ApiFetcher = async () => {
      const response = await fetch("http://localhost:3000/api/todos");
      const data = await response.json();
      setTodos(data);
    };
    ApiFetcher();
  }, [todoItem]);

  const todoAddHandler = async () => {
    if (todoItem) {
      const response = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ title: todoItem }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTodoItem("");
    }
  };

  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="A Todo App designed by WesterOps" />
        <link rel="icon" href="/Vector.svg" />
      </Head>
      <header>
        <div className="flex justify-center">
          <Image
            src={logo}
            alt="westerops-logo"
            width="215px"
            className="bg-[#FFF] rounded-[5px]"
          />
        </div>
      </header>
      {/* {todos.map(({ id, title }) => (
        <h1 key={id}>{title}</h1>
      ))} */}
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
          <div className="absolute left-[10px] top-[49px] left-[91px]">
            <Image src={stroke} alt="stroke-asset" width="18px" height="14px" />
          </div>
          <button type="button" onClick={todoAddHandler} className="bg-[#21A7F9] rounded-[4px] w-[54px] h-[54px] ml-[8px]">
            <Image src={arrow} alt="arrow-asset" width=""/>
          </button>
        </div>
      </section>
    </div>
  );
}
