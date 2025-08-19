import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import Sidebar from "../../components/Sidebar";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", location: "" });

  const fetchStores = async () => {
    try {
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ""))
      ).toString();

      const res = await axios.get(`/admin/stores?${query}`);
      setStores(res.data);
    } catch (err) {
      console.error("Failed to fetch stores", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Sidebar role="ADMIN" />
      <div className="ml-64 p-6">
        <h2 className="text-2xl font-bold mb-6">All Stores</h2>

        {/* Filter Bar Styled Same as UserList */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              name="name"
              placeholder="Filter by Name"
              className="px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Filter by Email"
              className="px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              name="location"
              placeholder="Filter by Location"
              className="px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white shadow-md rounded overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left text-sm">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Location</th>
                <th className="p-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3">{store.name}</td>
                  <td className="p-3">{store.ownerEmail}</td>
                  <td className="p-3">{store.location}</td>
                  <td className="p-3">
                    {isNaN(Number(store.rating)) ? "0.00" : Number(store.rating).toFixed(2)}
                  </td>
                </tr>
              ))}
              {stores.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No stores found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StoreList;
