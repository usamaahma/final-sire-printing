"use client";
import { useState, useEffect } from "react";
import MyAccountLayout from "../../components/my-account/MyAccountLayout";

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [profileSubTab, setProfileSubTab] = useState("info"); // "info" ya "addresses"
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Address states
  const [addresses, setAddresses] = useState({ shipping: null, billing: null });
  const [isEditing, setIsEditing] = useState(false);
  const [editType, setEditType] = useState("shipping"); // "shipping" ya "billing"
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    province: "",
    zipCode: "",
    country: "",
  });

  // Fetch Addresses Function
  const fetchAddresses = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const result = await res.json();
      if (result.success && result.user) {
        const userId = result.user.id;
        const addrRes = await fetch(`/api/addresses?userId=${userId}`);
        const addrData = await addrRes.json();

        if (addrData.success) {
          const ship = addrData.data.find((a) => a.addressType === "shipping");
          const bill = addrData.data.find((a) => a.addressType === "billing");
          setAddresses({ shipping: ship || null, billing: bill || null });
        }
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      let endpoint = "";
      if (tab === "Order History") endpoint = "/api/orders";
      else if (tab === "Invoices") endpoint = "/api/invoices";

      if (tab === "Approved Designs") {
        // Pehle current user ki details fetch karo taake ID mil jaye
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();

        if (meData.success && meData.user) {
          const userId = meData.user._id || meData.user.id;
          const res = await fetch(`/api/designs?userId=${userId}`);
          if (!res.ok) {
            setData([]);
            setLoading(false);
            return;
          }
          const result = await res.json();
          setData(result.data || []);
        } else {
          setData([]);
        }
      } else if (endpoint) {
        const res = await fetch(endpoint);
        if (!res.ok) {
          setData([]);
          setLoading(false);
          return;
        }
        const result = await res.json();
        setData(result.data || []);
      } else {
        setData([]);
        if (tab === "Profile") {
          fetchAddresses();
        }
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setData([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const handleEditClick = (type, addressObj) => {
    setEditType(type);
    if (addressObj) {
      setFormData(addressObj);
    } else {
      setFormData({
        name: "",
        companyName: "",
        phoneNumber: "",
        streetAddress: "",
        city: "",
        province: "",
        zipCode: "",
        country: "",
      });
    }
    setIsEditing(true);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      const userId = meData.user.id;

      const existingAddress =
        editType === "shipping" ? addresses.shipping : addresses.billing;

      let res;
      if (existingAddress) {
        // Update (PUT)
        res = await fetch(`/api/addresses/${existingAddress._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, addressType: editType, userId }),
        });
      } else {
        // Create (POST)
        res = await fetch("/api/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, addressType: editType, userId }),
        });
      }

      if (res.ok) {
        alert("Address saved successfully!");
        setIsEditing(false);
        fetchAddresses();
      } else {
        alert("Failed to save address");
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <MyAccountLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {loading ? (
        <div className="text-center py-20 font-bold text-gray-500">
          Loading...
        </div>
      ) : (
        <>
          {activeTab === "Profile" && (
            <div>
              {/* Profile Sub-Navigation Tabs */}
              <div className="flex space-x-4 mb-8 border-b pb-4">
                <button
                  onClick={() => {
                    setProfileSubTab("info");
                    setIsEditing(false);
                  }}
                  className={`px-6 py-2 rounded-lg font-bold transition ${
                    profileSubTab === "info"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Personal Info
                </button>
                <button
                  onClick={() => setProfileSubTab("addresses")}
                  className={`px-6 py-2 rounded-lg font-bold transition ${
                    profileSubTab === "addresses"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Addresses
                </button>
              </div>

              {/* Sub-Tab 1: Personal Info */}
              {profileSubTab === "info" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block font-semibold mb-2">
                        Full Name
                      </label>
                      <input
                        className="w-full p-3 border rounded-lg"
                        defaultValue="Usama Ahmad"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Email</label>
                      <input
                        className="w-full p-3 border rounded-lg"
                        defaultValue="usamaahmad8798@gmail.com"
                      />
                    </div>
                  </div>
                  <button className="bg-[#ffa015] text-white px-8 py-3 rounded-lg font-bold">
                    Update Profile
                  </button>
                </div>
              )}

              {/* Sub-Tab 2: Addresses (Shipping & Billing) */}
              {profileSubTab === "addresses" && (
                <div>
                  {isEditing ? (
                    <form
                      onSubmit={handleSaveAddress}
                      className="space-y-4 bg-gray-50 p-6 rounded-xl border"
                    >
                      <h3 className="text-xl font-bold capitalize text-gray-800">
                        {editType} Address
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="p-3 border rounded-lg w-full bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Company Name (Optional)"
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyName: e.target.value,
                            })
                          }
                          className="p-3 border rounded-lg w-full bg-white"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Phone Number"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                        className="p-3 border rounded-lg w-full bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Street Address"
                        required
                        value={formData.streetAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            streetAddress: e.target.value,
                          })
                        }
                        className="p-3 border rounded-lg w-full bg-white"
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="City"
                          required
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className="p-3 border rounded-lg bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Province / State"
                          required
                          value={formData.province}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              province: e.target.value,
                            })
                          }
                          className="p-3 border rounded-lg bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Zip Code"
                          required
                          value={formData.zipCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              zipCode: e.target.value,
                            })
                          }
                          className="p-3 border rounded-lg bg-white"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Country"
                        required
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        className="p-3 border rounded-lg w-full bg-white"
                      />
                      <div className="flex space-x-4 pt-2">
                        <button
                          type="submit"
                          className="bg-[#ffa015] text-white px-6 py-2.5 rounded-lg font-bold"
                        >
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-bold"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-2 gap-6">
                      {/* Shipping Address Card */}
                      <div className="p-6 border rounded-xl bg-white shadow-sm flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                            Shipping Address
                          </h3>
                          {addresses.shipping ? (
                            <div className="space-y-1 text-gray-600 text-sm">
                              <p className="font-semibold text-black">
                                {addresses.shipping.name}
                              </p>
                              {addresses.shipping.companyName && (
                                <p>{addresses.shipping.companyName}</p>
                              )}
                              <p>{addresses.shipping.streetAddress}</p>
                              <p>
                                {addresses.shipping.city},{" "}
                                {addresses.shipping.province} -{" "}
                                {addresses.shipping.zipCode}
                              </p>
                              <p>{addresses.shipping.country}</p>
                              <p className="pt-2 font-medium">
                                Phone: {addresses.shipping.phoneNumber}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gray-400 italic py-4">
                              No shipping address added yet.
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            handleEditClick("shipping", addresses.shipping)
                          }
                          className="mt-6 bg-black text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition"
                        >
                          {addresses.shipping
                            ? "Edit Shipping Address"
                            : "Add Shipping Address"}
                        </button>
                      </div>

                      {/* Billing Address Card */}
                      <div className="p-6 border rounded-xl bg-white shadow-sm flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                            Billing Address
                          </h3>
                          {addresses.billing ? (
                            <div className="space-y-1 text-gray-600 text-sm">
                              <p className="font-semibold text-black">
                                {addresses.billing.name}
                              </p>
                              {addresses.billing.companyName && (
                                <p>{addresses.billing.companyName}</p>
                              )}
                              <p>{addresses.billing.streetAddress}</p>
                              <p>
                                {addresses.billing.city},{" "}
                                {addresses.billing.province} -{" "}
                                {addresses.billing.zipCode}
                              </p>
                              <p>{addresses.billing.country}</p>
                              <p className="pt-2 font-medium">
                                Phone: {addresses.billing.phoneNumber}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gray-400 italic py-4">
                              No billing address added yet.
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            handleEditClick("billing", addresses.billing)
                          }
                          className="mt-6 bg-black text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition"
                        >
                          {addresses.billing
                            ? "Edit Billing Address"
                            : "Add Billing Address"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "Approved Designs" && (
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="p-4">Sr. No</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Material</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4">{i + 1}</td>
                      <td className="p-4 font-medium text-gray-800">
                        {item.product}
                      </td>
                      <td className="p-4 text-gray-600">{item.material}</td>
                      <td className="p-4 text-gray-600">{item.qty}</td>
                      <td className="p-4 text-gray-600">${item.price}</td>
                      <td className="p-4 text-green-600 font-bold">
                        {item.status}
                      </td>
                      <td className="p-4">
                        <button className="text-[#ffa015] font-bold hover:underline">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-8 text-gray-400">
                      No approved designs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === "Order History" && (
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="p-4">Tracking ID</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4">{item.trackingId}</td>
                      <td className="p-4">{item.product}</td>
                      <td className="p-4">{item.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-6 text-gray-500">
                      No order history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === "Invoices" && (
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="p-4">Tracking ID</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Download</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4">{item.trackingId}</td>
                      <td className="p-4">${item.price}</td>
                      <td className="p-4 text-[#ffa015] font-bold">
                        Download PDF
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-6 text-gray-500">
                      No invoices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === "Sample Quote" && (
            <div className="text-center py-10 text-gray-500">
              Coming soon: Request a sample quote here.
            </div>
          )}
        </>
      )}
    </MyAccountLayout>
  );
}
