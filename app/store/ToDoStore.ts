// import { createContext, useContext } from 'react';
// import { types } from 'mobx-state-tree';

// // Todo model
// const Todo = types
//   .model('Todo', {
//     id: types.identifier,
//     title: types.string,
//     completed: false,
//   })
//   .actions(self => ({
//     toggle() {
//       self.completed = !self.completed;
//     },
//     setTitle(newTitle: string) {
//       self.title = newTitle;
//     },
//   }));

// // TodoStore
// const TodoStore = types
//   .model('TodoStore', {
//     todos: types.array(Todo),
//   })
//   .actions(self => ({
//     addTodo: (todo: typeof Todo.Type) => {
//       self.todos.push(todo);
//     },
//     removeTodo: (todo: typeof Todo.Type) => {
//       self.todos.remove(todo);
//     },
//   }));

// // RootStore
// const RootStore = types.model('RootStore', {
//   todoStore: TodoStore,
// });

// // Initial state
// const initialState = {
//   todoStore: {
//     todos: [],
//   },
// };

// // Store context
// const StoreContext = createContext(initialState);

// // Store provider
// const StoreProvider: React.FC = ({ children }) => {
//   const rootStore = RootStore.create(initialState);

//   return (
//     <StoreContext.Provider value={rootStore}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// // Custom hook to access the store
// const useStore = () => useContext(StoreContext);

// export { Todo, TodoStore, RootStore, StoreProvider, useStore };
import { types } from 'mobx-state-tree';
import Todo from '../models/ToDo';

const TodoStore = types
  .model('TodoStore', {
    todos: types.array(Todo),
  })
  .actions(self => ({
    addTodo(todo: typeof Todo.Type) {
      self.todos.push(todo);
    },
    removeTodo(todo: typeof Todo.Type) {
      self.todos.remove(todo);
    },
  }));

export default TodoStore;
