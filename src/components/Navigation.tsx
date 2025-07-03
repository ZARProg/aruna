import React from 'react';
import { 
  Home, 
  Calendar, 
  Bed, 
  Users, 
  BarChart3, 
  Settings,
  Sun,
  Menu,
  X
} from 'lucide-react';

type ActivePage = 'dashboard' | 'reservations' | 'rooms' | 'guests' | 'reports' | 'settings';

interface NavigationProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  activePage, 
  setActivePage, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'reservations', label: 'Reservasi', icon: Calendar },
    { id: 'rooms', label: 'Manajemen Kamar', icon: Bed },
    { id: 'guests', label: 'Tamu', icon: Users },
    { id: 'reports', label: 'Laporan', icon: BarChart3 },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  const handleMenuClick = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#013237] text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <nav className={`
        fixed left-0 top-0 h-full w-64 bg-[#013237] text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <Sun className="h-8 w-8 text-[#4CA771]" />
            <h1 className="text-2xl font-bold text-white">Aruna</h1>
          </div>
          
          <ul className="space-y-2">
            {menuItems.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => handleMenuClick(id as ActivePage)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activePage === id
                      ? 'bg-[#4CA771] text-white shadow-md'
                      : 'text-gray-300 hover:bg-[#C0E6BA] hover:bg-opacity-20 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};