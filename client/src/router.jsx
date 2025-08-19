import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import AdminDashboard from './pages/admin/Dashboard';
import OwnerDashboard from './pages/owner/Dashboard';
import UserStoreList from './pages/user/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AddUser from "./pages/admin/AddUser";
import AddStore from "./pages/admin/AddStore";
import UserList from "./pages/admin/UserList";
import StoreList from "./pages/admin/StoreList";
import ChangePassword from "./pages/common/ChangePassword";


const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },

    // Admin routes
    {
        path: '/admin/dashboard',
        element: (
            <ProtectedRoute role="ADMIN">
                <AdminDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/users',
        element: (
            <ProtectedRoute role="ADMIN">
                <AddUser />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/stores',
        element: (
            <ProtectedRoute role="ADMIN">
                <AddStore />
            </ProtectedRoute>
        ),
    },

    // Owner route
    {
        path: '/owner/dashboard',
        element: (
            <ProtectedRoute role="OWNER">
                <OwnerDashboard />
            </ProtectedRoute>
        ),
    }
    ,

    // User route
    {
        path: '/stores',
        element: (
            <ProtectedRoute role="USER">
                <UserStoreList />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/all-users',
        element: (
            <ProtectedRoute role="ADMIN">
                <UserList />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/all-stores',
        element: (
            <ProtectedRoute role="ADMIN">
                <StoreList />
            </ProtectedRoute>
        ),
    },


    // Change Password route for USER and OWNER
    {
        path: '/change-password',
        element: (
            <ProtectedRoute role={['USER', 'OWNER']}>
                <ChangePassword />
            </ProtectedRoute>
        ),
    },






]);

export default router;
