
// Import required modules from 'mobx-state-tree', 'react', and the custom 'ToDo' model
'use client'
import { Instance, onSnapshot, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { ToDo } from "../models/ToDo";

// Define the 'RootModel' containing a single property 'toDoList' of type 'ToDo'
const RootModel = types.model({
  toDoList: ToDo,
});

// Create the initial state of the application using 'RootModel' with an empty 'toDoList'
let initialState = RootModel.create({
  toDoList: { items: [] },
});

// Check if the code is running in the browser environment
if (process.browser) {
  // Attempt to retrieve the data from local storage
  const data = localStorage.getItem("rootState");
  if (data) {
    // If data exists, parse it into a JSON object
    const json = JSON.parse(data);
    // Check if the parsed JSON object matches the structure defined in 'RootModel'
    if (RootModel.is(json)) {
      // If it matches, create a new MST instance using the parsed data as the initial state
      initialState = RootModel.create(json);
    }
  }
}

// Create the 'rootStore' using the initial state
export const rootStore = initialState;

// Set up a snapshot listener to save the application state to local storage on every change
onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
  localStorage.setItem("rootState", JSON.stringify(snapshot));
});

// Create a type alias for the instance of 'RootModel'
export type RootInstance = Instance<typeof RootModel>;

// Create a context to provide the MST store to React components
const RootStoreContext = createContext<null | RootInstance>(null);

// Export the 'Provider' component which will provide the MST store to the application
export const Provider = RootStoreContext.Provider;

// Custom hook to access the MST store from React components
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
