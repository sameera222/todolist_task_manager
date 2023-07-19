"use client";

import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useMst } from "../models/Root";
import { BsPencil } from "react-icons/bs";
import Button from "./Button";
import { MdDelete } from "react-icons/md";

const ToDoList = observer(() => {
  const { cart } = useMst();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const isDisabled = () => {
    return name === "" || description === "";
  };

  const handleEditItem = (item: any, newName: string) => {
    item.changeName(newName);
    // setSelectedItem(item);
    // setName(item.name);
    //  setDescription(item.description);
  };

  const handleFilterItems = () => {
    switch (status) {
      case "complete":
        return cart.completeItems;
      case "inProgress":
        return cart.inProgressItems;
      case "todo":
        return cart.todoItems;
      default:
        return cart.items;
    }
  };

  return (
    <div className="w-9/12 p-4 mx-auto mt-16 bg-[#ffdde1] rounded">
      <p className="text-2xl font-bold text-center text-[#7e4a35] p-2">
        TODO LIST
      </p>

      <div className="flex flex-row justify-center">
        <div className="mr-2">
          <label>
            <span className="text-[#7e4a35] text-xl font-bold">Title</span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="What's the task title?"
              className="w-96 ml-2 pl-4 rounded-full h-20 mt-1 bg-white p-1 text-black focus:ring-orange-500 focus:border-orange-500"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e && e.target) {
                  setName(e.target.value);
                }
              }}
            />
          </label>
        </div>
        <div className="ml-2">
          <label>
            <span className="text-[#7e4a35] font-bold text-xl">
              Description
            </span>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="what's the task description?"
              className="w-96 h-20 ml-2 mt-1 pl-4 rounded-full bg-white focus:ring-orange-500 text-black focus:border-orange-500 p-1"
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e && e.target) {
                  setDescription(e.target.value);
                }
              }}
            />
          </label>
        </div>
        <div className="p-2">
          <Button
            disabled={isDisabled()}
            label="Add"
            onClick={() => {
              cart.addCartItem({
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

      <div className="flex justify-center items-center mt-6 text-xl font-bold space-x-4">
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
      <div className="h-72 w-full px-3 py-3 my-12 space-y-3 overflow-y-scroll">
        {handleFilterItems().map((item: any, index: number) => (
          <div
            key={`${item.name}`}
            className="flex items-center px-4 py-2 mr-2 font-medium leading-tight shadow-lg shadow-gray rounded bg-white"
          >
            <div className="flex-grow">
              <div className="flex">
                <div className="text-[#7e4a35] text-4xl">{item.name}</div>
              </div>
              <div className="flex">
                <div className="text-gray-400 text-xl">{item.description}</div>
              </div>
            </div>
            <span
              className="cursor-pointer select-none"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleEditItem(item, e.target.value)
              }
              role="img"
              aria-label="edit"
            >
              <BsPencil size={30} />
            </span>
            <span
              className="cursor-pointer select-none"
              onClick={item.remove}
              role="img"
              aria-label="delete"
            >
              <MdDelete size={30} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ToDoList;
