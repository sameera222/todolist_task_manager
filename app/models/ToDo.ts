
import {
  types,
  Instance,
  SnapshotIn,
  getParent,
  destroy
} from "mobx-state-tree";

// Define the 'Tag' model with 'name' and 'description' properties
export const Tag = types.model({
  name: types.string,              // Property 'name' of type 'string'
  description: types.string,       // Property 'description' of type 'string'
});

// Define the 'listItem' model with 'name', 'description', 'status', and optional 'tags' properties
export const listItem = types
  .model({
    name: types.string,                                      // Property 'name' of type 'string'
    description: types.string,                               // Property 'description' of type 'string'
    status: types.optional(                                  // Property 'status' of type 'enumeration' with default value 'todo'
      types.enumeration(["complete", "inProgress", "todo"]),
      "todo"
    ),
    tags: types.optional(types.array(Tag), [])               // Optional property 'tags' of type array of 'Tag' objects with default empty array
  })
  // Define actions to modify 'listItem' properties
  .actions(self => ({
    // Action to change the 'name' property
    changeName(newName: string) {
      self.name = newName;
    },
    // Action to change the 'description' property
    changeDescription(newPrice: string) {
      self.description = newPrice;
    },
    // Action to change the 'status' property
    changeStatus(newStatus: "complete" | "inProgress" | "todo") {
      self.status = newStatus;
    },
    // Action to remove the 'listItem' from its parent 'ToDo' model
    remove() {
      getParent<typeof ToDo>(self, 2).remove(self);
    }
  }));

// Define the 'ToDo' model with an array of 'listItem' objects
export const ToDo = types
  .model({
    items: types.optional(types.array(listItem), [])         // Property 'items' of type array of 'listItem' objects with default empty array
  })
  // Define actions to modify 'ToDo' model
  .actions(self => ({
    // Action to add a new 'listItem' to 'items'
    addListItem(
      listItemToDo: SnapshotIn<typeof listItem> | Instance<typeof listItem>
    ) {
      self.items.push(listItemToDo);
    },
    // Action to remove a 'listItem' from 'items'
    remove(item: SnapshotIn<typeof listItem>) {
      destroy(item);
    }
  }))
  // Define views to compute derived data from the 'ToDo' model
  .views(self => ({
    // Computed view to get the total number of 'listItem's
    get totalItems() {
      return self.items.length;
    },
    // Computed view to get an array of 'listItem's with 'status' 'complete'
    get completeItems() {
      return self.items.filter(item => item.status === "complete");
    },
    // Computed view to get an array of 'listItem's with 'status' 'inProgress'
    get inProgressItems() {
      return self.items.filter(item => item.status === "inProgress");
    },
    // Computed view to get an array of 'listItem's with 'status' 'todo'
    get todoItems() {
      return self.items.filter(item => item.status === "todo");
    }
  }));

  
