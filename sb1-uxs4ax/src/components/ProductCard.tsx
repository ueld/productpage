import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{product.description}</p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-md">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-md transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={16} className={quantity <= 1 ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'} />
              </button>
              <span className="w-8 text-center font-medium dark:text-white">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-md transition-colors"
              >
                <Plus size={16} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              onAddToCart(product, quantity);
              setQuantity(1);
            }}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all hover:shadow-md"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}