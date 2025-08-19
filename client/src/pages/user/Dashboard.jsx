import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState({ name: "", address: "" });
  const [ratingSubmitting, setRatingSubmitting] = useState(null);

  const fetchStores = async () => {
    try {
      const res = await axios.get("/stores");
      setStores(res.data);
    } catch (err) {
      console.error("Failed to fetch stores", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleRating = async (storeId, value) => {
    setRatingSubmitting(storeId);
    try {
      await axios.post("/ratings", { store_id: storeId, value });
      await fetchStores();
    } catch (err) {
      console.error("Failed to submit rating", err);
    }
    setRatingSubmitting(null);
  };

  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.name.toLowerCase()) &&
      s.location.toLowerCase().includes(search.address.toLowerCase())
  );

  return (
    <>
      <Sidebar role="USER" />
      <div className="ml-64 p-6">
        <h2 className="text-2xl font-bold mb-4">Stores</h2>

       
        <div className="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded shadow">
          <input
            placeholder="Search by Name"
            className="px-4 py-2 border border-gray-300 rounded w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
          />
          <input
            placeholder="Search by Address"
            className="px-4 py-2 border border-gray-300 rounded w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search.address}
            onChange={(e) => setSearch({ ...search, address: e.target.value })}
          />
        </div>

        <table className="w-full bg-white shadow-md table-auto rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Address</th>
              <th className="p-3">Avg Rating</th>
              <th className="p-3">Your Rating</th>
              <th className="p-3">Submit/Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.map((store) => (
              <tr key={store.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{store.name}</td>
                <td className="p-3">{store.location}</td>
                <td className="p-3">
                  {typeof store.averageRating === "number"
                    ? store.averageRating.toFixed(2)
                    : "0.00"}
                </td>
                <td className="p-3">{store.userRating || "Not Rated"}</td>
                <td className="p-3">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      className={`text-2xl mx-1 ${
                        store.userRating >= val
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      disabled={ratingSubmitting === store.id}
                      onClick={() => handleRating(store.id, val)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      aria-label={`Rate ${val} stars`}
                    >
                      ★
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
