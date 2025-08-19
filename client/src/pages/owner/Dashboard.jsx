import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import Sidebar from "../../components/Sidebar";

const OwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [averages, setAverages] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get("/owner/ratings");
        setRatings(res.data.ratings);
        setAverages(res.data.averageRatings);
      } catch (err) {
        console.error("Failed to fetch owner ratings", err);
      }
    };
    fetchRatings();
  }, []);

  const getAvg = (storeId) => {
    const store = averages.find((s) => s.store_id === storeId);
    return store ? Number(store.averageRating).toFixed(2) : "0.00";
  };

  return (
    <>
      <Sidebar role="OWNER" />
      <div className="ml-64 p-6 bg-green-50 min-h-screen text-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-green-900">Owner Dashboard</h2>

        {averages.length === 0 && ratings.length === 0 ? (
          <p className="text-gray-600">No ratings received yet.</p>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-green-800">Average Ratings</h3>
              <ul className="bg-white p-4 rounded shadow border border-green-200">
                {averages.map((store) => (
                  <li key={store.store_id} className="mb-2">
                    <strong className="mr-3 text-green-700">Store #{store.store_id}:</strong> 
                    {Number(store.averageRating).toFixed(2)} / 5
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">User Ratings</h3>
              <table className="w-full table-auto bg-white shadow-md rounded overflow-hidden border border-blue-200">
                <thead>
                  <tr className="bg-blue-100 text-left">
                    <th className="p-3">User Name</th>
                    <th className="p-3">Store</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map((r) => {
                    const dateObj = new Date(r.created_at);
                    return (
                      <tr key={r.id} className="border-b border-blue-100 hover:bg-blue-50">
                        <td className="p-3">{r.userName}</td>
                        <td className="p-3">{r.storeName}</td>
                        <td className="p-3">{r.value}</td>
                        <td className="p-3">{dateObj.toLocaleDateString()}</td>
                        <td className="p-3">{dateObj.toLocaleTimeString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OwnerDashboard;
