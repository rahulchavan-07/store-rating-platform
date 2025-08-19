import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChartPie, FaSignOutAlt, FaUserPlus, FaUsers, FaStore } from "react-icons/fa";

const Sidebar = ({ role: propRole }) => {
    const navigate = useNavigate();
    const [role, setRole] = useState(propRole || localStorage.getItem("role"));

    useEffect(() => {
        if (propRole) {
            localStorage.setItem("role", propRole);
            setRole(propRole);
        }
    }, [propRole]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const adminLinks = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <FaChartPie /> },
        { name: "Add User", path: "/admin/users", icon: <FaUserPlus /> },
        { name: "Add Store", path: "/admin/stores", icon: <FaStore /> },
        { name: "View Users", path: "/admin/all-users", icon: <FaUsers /> },
        { name: "View Stores", path: "/admin/all-stores", icon: <FaStore /> },
        { name: "Logout", action: handleLogout, icon: <FaSignOutAlt /> },
    ];


    const userLinks = [
        { name: "Stores", path: "/stores", icon: <FaStore /> },
        { name: "Change Password", path: "/change-password", icon: <FaUserPlus /> },
        { name: "Logout", action: handleLogout, icon: <FaSignOutAlt /> },
    ];

    const ownerLinks = [
        { name: "Dashboard", path: "/owner/dashboard", icon: <FaChartPie /> },
        { name: "Change Password", path: "/change-password", icon: <FaUserPlus /> },
        { name: "Logout", action: handleLogout, icon: <FaSignOutAlt /> },
    ];



    let links = [];
    if (role?.toUpperCase() === "ADMIN") links = adminLinks;
    else if (role?.toUpperCase() === "USER") links = userLinks;
    else if (role?.toUpperCase() === "OWNER") links = ownerLinks;

    return (
        <div className="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 p-5">
            <h2 className="text-xl font-bold mb-5">{role} Dashboard</h2>
            <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link.name} className="p-2 hover:bg-gray-700 rounded">
                        {link.path ? (
                            <Link to={link.path} className="flex items-center cursor-pointer">
                                <span className="mr-2">{link.icon}</span>
                                {link.name}
                            </Link>
                        ) : (
                            <button onClick={link.action} className="flex items-center w-full cursor-pointer">
                                <span className="mr-2">{link.icon}</span>
                                {link.name}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
