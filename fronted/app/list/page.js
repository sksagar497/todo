"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = (props) => {
  const router = useRouter();
  const userId = props.userId;
  const [todos, setTodos] = useState(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (showList && !todos) {
      handleSubmit();
    }
  }, [userId, showList]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3005/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete your task");
      }
      alert("Your Task is deleted successfully");
      handleSubmit();
    } catch (err) {
      alert("Failed to delete your task: " + err.message);
      console.error("Failed to delete your task:", err.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/todos?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to get your list");
      }
      const todosData = await response.json();

      setTodos(todosData);
      setShowList(true);
    } catch (err) {
      alert("Error fetching data: " + err.message);
      console.error("Failed to get your list:", err.message);
    }
  };

  const handleSort = async (status) => {
    console.log("handleSort is called...");
    try {
      const response = await fetch(
        `http://localhost:3005/todos/filter?userId=${userId}&status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log("000000------");
        throw new Error("Failed to get your list");
      }
      const todosData = await response.json();
      setTodos(todosData);
    } catch (err) {
      alert("Error fetching data: " + err.message);
      console.error("Failed to get your list:", err.message);
    }
  };
  const toggleList = () => {
    console.log(todos);
    setShowList(!showList); // Toggle showList state
    if (!showList) {
      setTodos(null); // Clear todos when hiding the list
    }
  };

  return (
    <div className="flex flex-col mt-0 bg-orange-400 p-10">
      <div className="flex space-between justify-center mb-1">
        <button
          className="bg-orange-600 hover:bg-orange-400 text-white font-semibold py-2 px-4 rounded mr-5"
          onClick={toggleList}
        >
          Your all list
        </button>
        {/* <button
          className="bg-orange-600 hover:bg-orange-400 text-white font-semibold py-2 px-4 rounded mr-5"
          onClick={() => handleSort("pending")}
        >
          Pending
        </button> */}
        <select
          className="bg-orange-600 hover:bg-orange-400 text-white font-semibold py-2 px-4 rounded mr-5"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="Complete">Complete</option>
          <option value="pending">Pending</option>
        </select>
        {/* <button
          className="bg-orange-600 hover:bg-orange-400 text-white font-semibold py-2 px-4 rounded"
          onClick={() => handleSort("Complete")}
        >
          Complete
        </button> */}
      </div>
      <div>
        {todos && (
          <ol>
            {todos.map((todo) => (
              <li key={todo.id}>
                <div className="border border-orange-300 bg-orange-200 px-2 py-1 rounded-md">
                  <span className="font-bold text-gray-700 pr-3">Name:</span>{" "}
                  <span>{todo.name}</span>
                  <br />
                  <span className="font-bold text-gray-700 pr-3">
                    Description:
                  </span>{" "}
                  <span>{todo.description}</span>
                  <br />
                  <span className="font-bold text-gray-700 pr-3">
                    Status:
                  </span>{" "}
                  <span>{todo.status}</span>
                  <br />
                  <span className="font-bold text-gray-700 pr-3">Time: </span>
                  <span>{todo.time}</span>
                </div>
                <div className="flex flex-col mt-0">
                  <button
                    className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded  flex flex-row "
                    onClick={() => handleDelete(todo.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 ml-40"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                  <button
                    className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mb-2 flex flex-row "
                    onClick={() => router.push(`/edit?id=${todo.id}`)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 ml-40"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default Page;
