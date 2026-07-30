"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("cart")) || [
        // Dummy item agar cart khali ho taake layout test ho sake
        {
          id: "1",
          title: "Custom CBD Boxes",
          price: 150,
          quantity: 500,
          image: "",
        },
      ];
      setCartItems(items);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateQuantity = (index, newQty) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, newQty);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16 font-sans mt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingBag className="text-[#ffa015]" /> Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
            <Link
              href="/"
              className="inline-block bg-[#ffa015] text-white font-bold uppercase text-xs tracking-widest px-8 py-3 rounded-lg hover:bg-[#e08800] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 font-semibold">
                      BOX
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm md:text-base">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Unit Price: ${item.price || 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(index, parseInt(e.target.value) || 1)
                      }
                      className="w-16 border border-gray-300 rounded-md text-center py-1 text-sm outline-none focus:border-[#ffa015]"
                    />
                    <span className="font-bold text-gray-900 text-sm w-20 text-right">
                      ${(item.price || 0) * (item.quantity || 1)}
                    </span>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div className="bg-white p-6 rounded-xl shadow-sm h-fit space-y-4">
              <h3 className="font-bold text-gray-900 text-lg border-b pb-3">
                Order Summary
              </h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span className="text-[#ffa015]">${subtotal.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full mt-4 bg-[#ffa015] hover:bg-[#e08800] text-white font-bold uppercase text-xs tracking-widest py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
