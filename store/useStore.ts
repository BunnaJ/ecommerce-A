import { create } from 'zustand';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed';
};

type StoreState = {
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  checkout: () => Order | null; // <--- can return null if cart empty
};

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  orders: [],

  addToCart: (product) => {
    const cart = get().cart;
    const existing = cart.find(i => i.id === product.id);

    if (existing) {
      set({
        cart: cart.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (id) =>
    set({ cart: get().cart.filter(i => i.id !== id) }),

  updateQty: (id, qty) =>
    set({
      cart: get().cart.map(i =>
        i.id === id ? { ...i, quantity: qty } : i
      ),
    }),

  checkout: () => {
    const cart = get().cart;
    if (cart.length === 0) return null; // cart empty

    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total,
      status: 'completed', // can also be 'pending'
    };

    set({
      orders: [...get().orders, newOrder],
      cart: [],
    });

    return newOrder;
  },
}));
