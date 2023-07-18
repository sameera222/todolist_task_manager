"use client";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import Cart from "./components/ToDoList";
import { Provider, rootStore } from "./models/Root";

export default function Home() {
  return (
    <Provider value={rootStore}>
      <div className="container mx-auto">
        <Cart />
      </div>
    </Provider>
  );
}
