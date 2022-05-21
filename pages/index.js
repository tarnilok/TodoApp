import { useState, useEffect } from "react";
import Head from "next/head";

// export const getStaticProps = async () => {
//   const response = await fetch("http://localhost:3000/api/todos");
//   const data = await response.json();

//   return {
//     props: { todos: data },
//   };
// };

export default function Home() {
  const [todoItem, setTodoItem] = useState("");
  const [todos, setTodos] = useState([])
  
  useEffect(() => {
    const ApiFetcher = async () => {
      const response = await fetch("http://localhost:3000/api/todos");
      const data = await response.json();
      setTodos(data)
    }
    ApiFetcher()
  }, [todoItem])

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
<header></header>
      {/* {todos.map(({ id, title }) => (
        <h1 key={id}>{title}</h1>
      ))} */}
      <section>
        <input type="text" value={todoItem} onChange={(e) => setTodoItem(e.target.value)} />
        <button type="button" onClick={todoAddHandler}>
          Submit
        </button>
      </section>
    </div>
  );
}
