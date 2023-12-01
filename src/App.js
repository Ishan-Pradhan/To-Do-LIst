import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [lists, setLists] = useState(() => {
    const localValue = localStorage.getItem("LISTS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("LISTS", JSON.stringify(lists));
  }, [lists]);

  function handleNewLists(list) {
    setLists((lists) => [...lists, list]);
  }

  function handleToggleList(id) {
    setLists((lists) =>
      lists.map((list) =>
        list.id === id ? { ...list, completed: !list.completed } : list
      )
    );
  }

  function handleDeleteList(id) {
    setLists((lists) => lists.filter((list) => list.id !== id));
  }

  return (
    <div className="container border-0 max-w-sm p-1  md:container md:max-w-xl md:border md:p-10 m-auto mt-20 ">
      <div className="max-w-sm  flex justify-center flex-col items-center m-auto md:max-w-[500px]">
        <Logo />
        <Form onAddLists={handleNewLists} />
        <Lists
          lists={lists}
          onToggleList={handleToggleList}
          onHandleDelete={handleDeleteList}
        />
      </div>
    </div>
  );
}

function Logo() {
  return <h1 className="text-4xl text-yellow-400 align-middle">To-Do List</h1>;
}

function Form({ onAddLists }) {
  const [todo, setTodo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (todo === "") {
      return;
    }
    const newList = { todo, completed: false, id: Date.now() };

    onAddLists(newList);

    setTodo("");
  }
  return (
    <form className="my-5 flex gap-5 m-auto" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-b text-xl border-black focus:outline-none"
        value={todo}
        placeholder="Add a task"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="transition ease-in-out delay-150 bg-yellow-300 text-xl px-5 py-[1px] rounded-lg hover:bg-yellow-400">
        Add
      </button>
    </form>
  );
}

function Lists({ lists, onToggleList, onHandleDelete }) {
  return (
    <ul className="w-full">
      {lists.map((list) => (
        <TodoWork
          list={list}
          onToggleList={onToggleList}
          onHandleDelete={onHandleDelete}
          key={list.id}
        />
      ))}
    </ul>
  );
}

function TodoWork({ list, onToggleList, onHandleDelete }) {
  return (
    <div>
      <li className="flex  gap-4 justify-between items-center border-b border-b-yellow-500 p-3 w-full ">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            onChange={() => {
              onToggleList(list.id);
            }}
            checked={list.completed}
          />
          <span
            className="text-xl"
            style={
              list.completed
                ? {
                    textDecoration: "line-through",

                    color: "#777",
                  }
                : {}
            }
          >
            {list.todo}
          </span>
        </div>
        <div className="flex justify-center items-center gap-2 ">
          <button className="text-2xl text-blue-500 hover:text-blue-700">
            &#x2710;
          </button>
          <button
            className="text-4xl text-red-500 hover:text-red-700"
            onClick={() => onHandleDelete(list.id)}
          >
            &times;
          </button>
        </div>
      </li>
    </div>
  );
}
