import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import Sidebar from "../../components/Sidebar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ id: "", name: "", email: "", address: "", role: "" });

  const fetchUsers = async () => {
    try {
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ""))
      ).toString();

      const res = await axios.get(`/admin/users?${query}`);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Sidebar role="ADMIN" />
      <div className="ml-64 p-6">
        <h2 className="text-2xl font-bold mb-6">All Users</h2>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <input
              name="id"
              placeholder="Filter by ID"
              className="px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
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
              name="address"
              placeholder="Filter by Address"
              className="px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <select
              name="role"
              className="px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            >
              <option value="">All Roles</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="OWNER">Owner</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white shadow-md rounded overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left text-sm">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Address</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.address}</td>
                  <td className="p-3">{user.role}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No users found
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

export default UserList;
