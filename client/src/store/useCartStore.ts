import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addToCart: (product) => {
                const items = get().items;
                const existingItem = items.find(i => i.id === product.id);
                if (existingItem) {
                    set({
                        items: items.map(i =>
                            i.id === product.id
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                        )
                    });
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }] });
                }
            },
            removeFromCart: (productId) => {
                set({ items: get().items.filter(i => i.id !== productId) });
            },
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }
                set({
                    items: get().items.map(i =>
                        i.id === productId ? { ...i, quantity } : i
                    )
                });
            },
            clearCart: () => set({ items: [] }),
            total: () => {
                return get().items.reduce((acc, item) => {
                    const price = item.discountPrice || item.price;
                    return acc + (price * item.quantity);
                }, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
