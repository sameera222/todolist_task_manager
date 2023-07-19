"use client";
import React from "react";
import dynamic from 'next/dynamic'
import ToDoList from "./components/ToDoList";
import { Provider, rootStore } from "./store/ToDoStore";

const NoSSR = dynamic(() => import('./components/ToDoList'), { ssr: false })

export default function Home() {
  return (
        // Provide the rootStore to the application using the Provider component
    <Provider value={rootStore}>
      <div className="container mx-auto ">
        <NoSSR/>
      </div>
    </Provider>
  );
}
