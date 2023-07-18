'use client';

import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useMst } from "../models/Root";
import Button from "./Button";

const Cart = observer(() => {
  const { cart } = useMst();

  const [name, setName] = useState("");
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(20);
  const [status, setStatus] = useState("todo");

  const isDisabled = () => {
    return name === "" || price === 0;
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
    <div className="w-full mx-auto mt-16">
      <p className="text-2xl font-bold text-center">TODO List</p>
      <label className="block">
        <span className="text-gray-200">Name</span>
        <input
          type="text"
          className="block w-full mt-1 bg-gray-900 focus:ring-orange-500 focus:border-orange-500"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e && e.target) {
              setName(e.target.value);
            }
          }}
        />
      </label>
      <label className="block mt-2">
        <span className="text-gray-200">Decription</span>
        {/* <input
          type="number"
          className="block w-full mt-1 bg-gray-900 focus:ring-orange-500 focus:border-orange-500"
          min="0.0"
          step="any"
          value={price}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e && e.target) {
              setPrice(Number(e.target.value));
            }
          }}
        /> */}
         <input
          type="text"
          className="block w-full mt-1 bg-gray-900 focus:ring-orange-500 focus:border-orange-500"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e && e.target) {
              setDescription(e.target.value);
            }
          }}
        />
      </label>
      <div className="flex items-center mt-4">
        <div className="flex flex-col flex-grow space-y-2">
          <span
            style={{ fontVariant: "tabular-nums" }}
            className="text-lg font-bold leading-tight"
          >
            {/* ToDo Items: {cart.totalItems} */}
          </span>
          <span
            style={{ fontVariant: "tabular-nums" }}
            className="flex-grow text-lg font-bold leading-tight"
          >
            {/* Total: {cart.totalPrice} */}
          </span>
        </div>
        <Button
          disabled={isDisabled()}
          label="Add"
          onClick={() => {
            cart.addCartItem({
              name,
              price,
              status,
            });
            setName("");
            setPrice(20);
          }}
        />
      </div>
      <div className="flex mt-4 space-x-4">
        <input
          type="checkbox"
          checked={status === "complete"}
          onChange={() => setStatus("complete")}
        />
        <label className="text-gray-200">Completed</label>
        <input
          type="radio"
          value="inProgress"
          checked={status === "inProgress"}
          onChange={() => setStatus("inProgress")}
        />
        <label className="text-gray-200">In Progress</label>
        <input
          type="radio"
          value="todo"
          checked={status === "todo"}
          onChange={() => setStatus("todo")}
        />
        <label className="text-gray-200">To Do</label>
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
                value={item.name}
                className="bg-transparent focus:outline-none  focus:border-orange-500"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEditItem(item, e.target.value)
                }
              />
            </div>
            {/* <div>
            {item.price}</div> */}
            <div className="flex-grow">
              <input
                type="text"
                value={item.description}
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

export default Cart;
