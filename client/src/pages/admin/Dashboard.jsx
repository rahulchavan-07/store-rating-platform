import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
  const [latestUsers, setLatestUsers] = useState([]);
  const [latestStores, setLatestStores] = useState([]);
  const [latestRatings, setLatestRatings] = useState([]);
  const [averageRatings, setAverageRatings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Stats
        const { data: dashboard } = await axios.get("/admin/dashboard");
        setStats({
          totalUsers: dashboard.totalUsers ?? 0,
          totalStores: dashboard.totalStores ?? 0,
          totalRatings: dashboard.totalRatings ?? 0,
        });

        // Latest Users
        const { data: users } = await axios.get("/admin/users");
        setLatestUsers(users.slice(-10).reverse());

        // Latest Stores
        const { data: stores } = await axios.get("/admin/stores");
        setLatestStores(stores.slice(-10).reverse());

        // Latest Ratings - Sorted by Date DESC
        try {
          const { data } = await axios.get("/admin/ratings");
          const sortedRatings = [...data].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setLatestRatings(sortedRatings.slice(0, 5));
        } catch {
          setLatestRatings([]);
        }

        // Average Ratings per store
        try {
          const { data } = await axios.get("/admin/average-ratings");
          setAverageRatings(data);
        } catch {
          setAverageRatings([]);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar role="ADMIN" />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-green-50 min-h-screen text-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-green-900">Admin Dashboard</h1>

        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow text-center border-l-4 border-green-400">
            <h2 className="text-lg font-semibold text-green-700">Total Users</h2>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center border-l-4 border-blue-400">
            <h2 className="text-lg font-semibold text-blue-700">Total Stores</h2>
            <p className="text-3xl font-bold">{stats.totalStores}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center border-l-4 border-yellow-400">
            <h2 className="text-lg font-semibold text-yellow-700">Total Ratings</h2>
            <p className="text-3xl font-bold">{stats.totalRatings}</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Latest Users */}
          <div className="bg-white p-4 rounded-lg shadow border border-green-200">
            <h2 className="text-lg font-semibold mb-2 text-green-800">Latest Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 border border-green-200">
                <thead>
                  <tr className="border-b border-green-200">
                    <th className="py-2 px-4 border-r border-green-200">Name</th>
                    <th className="py-2 px-4">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {latestUsers.map((u) => (
                    <tr key={u.id} className="border-b border-green-100">
                      <td className="py-2 px-4 border-r border-green-100">{u.name}</td>
                      <td className="py-2 px-4">{u.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Latest Stores */}
          <div className="bg-white p-4 rounded-lg shadow border border-blue-200">
            <h2 className="text-lg font-semibold mb-2 text-blue-800">Latest Stores</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 border border-blue-200">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="py-2 px-4 border-r border-blue-200">Name</th>
                    <th className="py-2 px-4">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {latestStores.map((s) => (
                    <tr key={s.id} className="border-b border-blue-100">
                      <td className="py-2 px-4 border-r border-blue-100">{s.name}</td>
                      <td className="py-2 px-4">{s.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Latest Ratings */}
          <div className="bg-white p-4 rounded-lg shadow border border-yellow-200">
            <h2 className="text-lg font-semibold mb-2 text-yellow-800">Latest Ratings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 mb-4 border border-yellow-200">
                <thead>
                  <tr className="border-b border-yellow-200">
                    <th className="py-2 px-4 border-r border-yellow-200">User</th>
                    <th className="py-2 px-4 border-r border-yellow-200">Store</th>
                    <th className="py-2 px-4 border-r border-yellow-200">Rating</th>
                    <th className="py-2 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {latestRatings.length > 0 ? (
                    latestRatings.map((r) => (
                      <tr key={r.id} className="border-b border-yellow-100">
                        <td className="py-2 px-4 border-r border-yellow-100">{r.user_name}</td>
                        <td className="py-2 px-4 border-r border-yellow-100">{r.store_name}</td>
                        <td className="py-2 px-4 border-r border-yellow-100">{r.rating}</td>
                        <td className="py-2 px-4">{new Date(r.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-gray-400">
                        No recent ratings
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Average Ratings */}
            <h2 className="text-lg font-semibold mb-2 text-green-800">
              Average Ratings per Store
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 border border-green-200">
                <thead>
                  <tr className="border-b border-green-200">
                    <th className="py-2 px-4 border-r border-green-200">Store</th>
                    <th className="py-2 px-4">Average Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {averageRatings.length > 0 ? (
                    averageRatings.map((ar) => (
                      <tr key={ar.store_id} className="border-b border-green-100">
                        <td className="py-2 px-4 border-r border-green-100">{ar.store_name}</td>
                        <td className="py-2 px-4">{ar.averageRating ?? "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="py-2 px-4 text-gray-400">
                        No average ratings yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
