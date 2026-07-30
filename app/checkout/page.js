"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Lock } from "lucide-react";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "United Kingdom",
    postalCode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully! (PayPal integration pending)");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16 font-sans mt-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Billing & Shipping Details */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-3">
              Shipping Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#ffa015]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#ffa015]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#ffa015]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#ffa015]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#ffa015]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#ffa015]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#ffa015]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={form.postalCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#ffa015]"
                />
              </div>
            </div>
          </div>

          {/* Payment Placeholder & Submit */}
          <div className="bg-white p-6 rounded-2xl shadow-sm h-fit space-y-6">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-3">
              Payment Method
            </h2>

            <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl text-xs text-orange-800 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Lock size={14} /> Secure Checkout
              </p>
              <p>
                PayPal integration will be added here soon. You can place the
                order now.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#ffa015] hover:bg-[#e08800] text-white font-bold uppercase text-xs tracking-widest py-4 rounded-xl transition-colors shadow-md"
            >
              Place Order Now
            </button>

            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs pt-2">
              <ShieldCheck size={16} /> Encrypted & Safe Transactions
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
