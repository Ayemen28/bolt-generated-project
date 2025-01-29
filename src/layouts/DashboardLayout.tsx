import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Users, UserCircle, CreditCard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Users className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">UserHub</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="text-gray-700 hover:text-gray-900 p-2 rounded-md"
                title="Profile"
              >
                <UserCircle className="h-6 w-6" />
              </Link>
              <Link
                to="/subscriptions"
                className="text-gray-700 hover:text-gray-900 p-2 rounded-md"
                title="Subscriptions"
              >
                <CreditCard className="h-6 w-6" />
              </Link>
              <Link
                to="/admin"
                className="text-gray-700 hover:text-gray-900 p-2 rounded-md"
                title="Admin Dashboard"
              >
                <Settings className="h-6 w-6" />
              </Link>
              <button
                onClick={handleSignOut}
                className="text-gray-700 hover:text-gray-900 p-2 rounded-md"
                title="Sign Out"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
