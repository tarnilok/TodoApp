import Head from "next/head";
import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:3000/api/todos");
  const data = await response.json();
  
  return {
    props: { todos: data },
  };
};

export default function Home({ todos }) {
  
  const Submitter = async (e) => {
    e.preventDefault()
    const {title : {value: inputValue}} = e.target
    const newTodo = {title: inputValue}
 
    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    // const data = await response.json()
    // console.log(data)
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="A Todo App designed by WesterOps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {todos.map((e) => (
        <h1 key={e.id}>{e.title}</h1>
      ))}
      <section>
        <form onSubmit={e => Submitter(e)}>
          <input type="text" name="title" />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}
