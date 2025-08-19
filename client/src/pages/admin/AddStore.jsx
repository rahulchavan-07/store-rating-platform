import React, { useState, useEffect } from "react";
import axios from "../../services/axios";
import Sidebar from "../../components/Sidebar";

const AddStore = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    ownerId: "",
  });
  const [owners, setOwners] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await axios.get("/admin/users?role=OWNER");
        setOwners(res.data);
      } catch (err) {
        console.error("Error fetching owners:", err);
      }
    };
    fetchOwners();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("/admin/stores", form);
      setMessage("Store added successfully.");
      setForm({ name: "", location: "", ownerId: "" });
    } catch (err) {
      setMessage(" Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <Sidebar role="ADMIN" />
      <div className="ml-64 p-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Add New Store</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Store Name"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Location"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.location}
            onChange={handleChange}
            required
          />
          <select
            name="ownerId"
            className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.ownerId}
            onChange={handleChange}
            required
          >
            <option value="">Select Store Owner</option>
            {owners.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Add Store
          </button>
          {message && (
            <p
              className={`text-sm mt-2 ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
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

export default AddStore;
