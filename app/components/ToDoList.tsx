"use client";

import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useMst } from "../models/Root";
import Button from "./Button";

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
    <div className="w-full mx-auto mt-16 bg-[#deeaee]">
        <p className="text-2xl font-bold text-center text-[#7e4a35] p-2">
          TODO LIST
        </p>

      <div>
        <label className="flex-grow">
          <span className="text-[#7e4a35]">Name</span>
          <input
            type="text"
            name="name"
            id='name'
            className="w-96 ml-2 mt-1 bg-gray-900 focus:ring-orange-500 focus:border-orange-500"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e && e.target) {
                setName(e.target.value);
              }
            }}
          />
        </label>
        <label className="mt-2">
          <span className="text-[#7e4a35] ">
            Description
            </span>

          <input
            type="text"
            name="description"
            id='description'
            className="w-96 ml-2 mt-1 bg-gray-900 focus:ring-orange-500 focus:border-orange-500"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e && e.target) {
                setDescription(e.target.value);
              }
            }}
          />
        </label>
        <div>
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
      <div className="flex mt-4 space-x-4">
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
      <div className="h-64 w-full px-3 py-3 my-12 space-y-3 overflow-y-scroll border border-gray-500">
        {handleFilterItems().map((item: any, index: number) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center px-4 py-2 mr-2 font-medium leading-tight bg-gray-600 text-gray-50"
          >
            <div className="flex-grow">
              <input
                type="text"
                name="name"
                id='name'
                value={item.name}
                className="bg-transparent focus:outline-none  focus:border-orange-500"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEditItem(item, e.target.value)
                }
              />
            </div>

            <div className="flex-grow">
              <input
                type="text"
                value={item.description}
                name="description"
            id='description'
                className="bg-transparent focus:outline-none  focus:border-orange-500"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEditItem(item, e.target.value)
                }
              />
            </div>
            <span
              className=" cursor-pointer select-none"
              onClick={item.remove}
              role="img"
              aria-label="delete"
            >
              ❌
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ToDoList;
