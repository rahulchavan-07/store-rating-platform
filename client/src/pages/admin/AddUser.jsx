import React, { useState } from "react";
import axios from "../../services/axios";
import Sidebar from "../../components/Sidebar";

const AddOwner = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "OWNER", // default value
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("/admin/users", form);
      setMessage(`${form.role} added successfully.`);
      setForm({ name: "", email: "", address: "", password: "", role: "OWNER" });
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <Sidebar role="ADMIN" />
      <div className="ml-64 p-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Add User / Store Owner</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            name="name"
            placeholder="Name"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={handleChange}
            required
            minLength={3}
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Address */}
          <input
            name="address"
            placeholder="Address"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.address}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={handleChange}
            required
          />
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Add {form.role}
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-sm mt-2 ${
                message.includes("successfully") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default AddOwner;
