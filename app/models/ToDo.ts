// 'use client'
import {
  types,
  Instance,
  SnapshotIn,
  getParent,
  destroy
} from "mobx-state-tree";

export const Tag = types.model({
  name: types.string
});

export const CartItem = types
  .model({
    name: types.string,
    price: types.number,
    status: types.optional(
      types.enumeration(["complete", "inProgress", "todo"]),
      "todo"
    ),
    tags: types.optional(types.array(Tag), [])
  })
  .actions(self => ({
    changeName(newName: string) {
      self.name = newName;
    },
    changePrice(newPrice: number) {
      self.price = newPrice;
    },
    changeStatus(newStatus: "complete" | "inProgress" | "todo") {
      self.status = newStatus;
    },
    remove() {
      getParent<typeof Cart>(self, 2).remove(self);
    }
  }));

export const Cart = types
  .model({
    items: types.optional(types.array(CartItem), [])
  })
  .actions(self => ({
    addCartItem(
      cartItem: SnapshotIn<typeof CartItem> | Instance<typeof CartItem>
    ) {
      self.items.push(cartItem);
    },
    remove(item: SnapshotIn<typeof CartItem>) {
      destroy(item);
    }
  }))
  .views(self => ({
    get totalItems() {
      return self.items.length;
    },
    get totalPrice() {
      return self.items.reduce((sum, entry) => sum + entry.price, 0);
    },
    get completeItems() {
      return self.items.filter(item => item.status === "complete");
    },
    get inProgressItems() {
      return self.items.filter(item => item.status === "inProgress");
    },
    get todoItems() {
      return self.items.filter(item => item.status === "todo");
    }
  }));
