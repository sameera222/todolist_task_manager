"use client";
import React from "react";
import dynamic from 'next/dynamic'

import ToDoList from "./components/ToDoList";
import { Provider, rootStore } from "./models/Root";

const NoSSR = dynamic(() => import('./components/ToDoList'), { ssr: false })

export default function Home() {
  return (
    <Provider value={rootStore}>
      <div className="container mx-auto">
        <NoSSR/>
      </div>
    </Provider>
  );
}
