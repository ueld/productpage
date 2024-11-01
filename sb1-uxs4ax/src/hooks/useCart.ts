import { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems(current => {
      const existingItem = current.find(item => item.id === product.id);
      if (existingItem) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { ...product, quantity }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  return { items, addItem, updateQuantity, removeItem };
}