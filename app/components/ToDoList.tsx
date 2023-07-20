"use client";

import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useMst } from "../store/ToDoStore";
import { BsPencil } from "react-icons/bs";
import Button from "./Button";
import { MdDelete } from "react-icons/md";

const ToDoList = observer(() => {
  const { toDoList } = useMst();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

 

  const isDisabled = () => {
    return name === "" || description === "";
  };

 
  const handleFilterItems = () => {
    switch (status) {
      case "complete":
        return toDoList.completeItems;
      case "inProgress":
        return toDoList.inProgressItems;
      case "todo":
        return toDoList.todoItems;
      default:
        return toDoList.items;
    }
  };

  return (
    <div className="w-3/4 p-4 mx-auto mt-16 rounded-md container">
      <p className="text-4xl font-bold text-center flex flex-row items-center justify-center text-black p-2 max-w-5xl">TODO LIST</p>

      <div className="flex md:flex-col sm:flex-col xs:flex-col ss:flex-col lg:flex-row p-4 mt-4 items-center justify-center input-container">
        <div className="ml-2 flex">
          <label>
            <span className="text-[#7e4a35] text-xl font-bold flex justify-start">
              Title
            </span>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              placeholder="What's the task title?"
              className="text-xl text-orange-800 placeholder-orange-400  w-full  py-2 px-5 bg-orange-100 rounded-l-full outline-orange-300"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e && e.target) {
                  setName(e.target.value);
                }
              }}
            />
          </label>
        </div>
        <div className="ml-2 flex">
          <label>
            <span className="text-[#7e4a35] font-bold text-xl flex jusify-start">
              Description
            </span>
            <input
              type="text"
              name="description"
              id="description"
              autoComplete="off"
              placeholder="what's the task description?"
              className="text-xl text-orange-800 placeholder-orange-400 py-2 px-5 w-full bg-orange-100 rounded-l-full outline-orange-300"
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e && e.target) {
                  setDescription(e.target.value);
                }
              }}
            />
          </label>
        </div>
          {/* Step : Render the correct button based on editMode */}

        <div className="p-2 mt-5">
          <Button
            disabled={isDisabled()}
            label="Add"
            onClick={() => {
              toDoList.addListItem({
                name,
                description,
                status,
              });
              setName("");
              setDescription("");
            }}
          />
        </div>
      </div>

      <div className="flex justify-center md:flex-row sm:flex-row xs:flex-col items-center mt-6 text-xl font-bold space-x-4">
        <input
          type="checkbox"
          checked={status === "complete"}
          onChange={() => setStatus("complete")}
        />
        <label className="text-[#7e4a35] ">Completed</label>
        <input
          type="radio"
          value="inProgress"
          checked={status === "inProgress"}
          onChange={() => setStatus("inProgress")}
        />
        <label className="text-[#7e4a35] ">In Progress</label>
        <input
          type="radio"
          value="todo"
          checked={status === "todo"}
          onChange={() => setStatus("todo")}
        />
        <label className="text-[#7e4a35] ">To Do</label>
      </div>
      
      <div className="h-96 w-full px-3 py-3 my-12 space-y-3 rounded-xl shadow-lg bg-white">
        {handleFilterItems().map((item: any, index: number) => (
          <div
            key={`${item.name}`}
            className="flex items-center px-4 py-2 mr-2 font-medium leading-tight shadow-lg shadow-gray rounded bg-white"
          >
            <div className="flex-grow">
              <div className="flex">
                {/* Step 5: Conditionally render input or static text */}
                {editMode && selectedItem === item ? (
                  <input
                    type="text"
                    className="text-orange-500 text-3xl bg-orange-100 w-96"
                    value={editedName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditedName(e.target.value)
                    }
                  />
                ) : (
                  <div className="text-orange-500 text-4xl">{item.name}</div>
                )}
              </div>
              <div className="flex">
                {/* Step : Conditionally render input or static text */}
                {editMode && selectedItem === item ? (
                  <input
                    type="text"
                    className="text-gray-400 text-xl  bg-orange-100 w-96"
                    value={editedDescription}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditedDescription(e.target.value)
                    }
                  />
                ) : (
                  <div className="text-gray-400 text-xl">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
            <span
              className="cursor-pointer select-none"
              // Step 2: Enable edit mode when the edit icon is clicked
              onClick={() => {
                setEditMode(true);
                setSelectedItem(item);
                setEditedName(item.name);
                setEditedDescription(item.description);
              }}
              role="img"
              aria-label="edit"
            >
              <BsPencil size={25} className="text-orange-500" />
            </span>
            <span
              className="cursor-pointer select-none ml-2"
              onClick={item.remove}
              role="img"
              aria-label="delete"
            >
              <MdDelete size={25} className="text-orange-500" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ToDoList;
