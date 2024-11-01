import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, isOpen, onClose }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl animate-slide-up">
        <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
            <ShoppingBag /> Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="dark:text-white" />
          </button>
        </div>
        
        <div className="p-4 flex flex-col gap-4 h-[calc(100vh-180px)] overflow-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b dark:border-gray-700 pb-4 animate-fade-in">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold dark:text-white">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-auto text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold dark:text-white">Total:</span>
            <span className="text-xl font-bold dark:text-white">${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}