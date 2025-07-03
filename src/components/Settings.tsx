import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  Globe, 
  Palette,
  Save,
  Edit3,
  Camera
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Keamanan', icon: Lock },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'preferences', label: 'Preferensi', icon: Palette },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-[#4CA771] rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#013237] rounded-full flex items-center justify-center hover:bg-opacity-80 transition-colors">
                  <Camera className="h-4 w-4 text-white" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#013237]">Admin Hotel</h3>
                <p className="text-gray-600">Administrator</p>
                <p className="text-sm text-gray-500">Bergabung sejak Januari 2024</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  defaultValue="Admin Hotel"
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="admin@arunahotel.com"
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-2">No. Telepon</label>
                <input
                  type="tel"
                  defaultValue="081234567890"
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-2">Posisi</label>
                <input
                  type="text"
                  defaultValue="Administrator"
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#013237] mb-2">Alamat</label>
              <textarea
                defaultValue="Jl. Sudirman No. 123, Jakarta Selatan"
                rows={3}
                className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
              />
            </div>
            
            <button className="bg-[#4CA771] text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#3d8a5d] transition-colors">
              <Save className="h-4 w-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#013237] mb-4">Ubah Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-2">Password Saat Ini</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-2">Password Baru</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-2">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#013237] mb-4">Keamanan Akun</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#EAF9E7] rounded-lg">
                  <div>
                    <p className="font-medium text-[#013237]">Autentikasi Dua Faktor</p>
                    <p className="text-sm text-gray-600">Tambahkan lapisan keamanan ekstra</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4CA771] peer-focus:ring-opacity-25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4CA771]"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[#EAF9E7] rounded-lg">
                  <div>
                    <p className="font-medium text-[#013237]">Notifikasi Login</p>
                    <p className="text-sm text-gray-600">Terima notifikasi saat ada login baru</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4CA771] peer-focus:ring-opacity-25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4CA771]"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <button className="bg-[#4CA771] text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#3d8a5d] transition-colors">
              <Save className="h-4 w-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#013237] mb-4">Preferensi Notifikasi</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#EAF9E7] rounded-lg">
                  <div>
                    <p className="font-medium text-[#013237]">Reservasi Baru</p>
                    <p className="text-sm text-gray-600">Terima notifikasi saat ada reservasi baru</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4CA771] peer-focus:ring-opacity-25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4CA771]"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[#EAF9E7] rounded-lg">
                  <div>
                    <p className="font-medium text-[#013237]">Pembatalan Reservasi</p>
                    <p className="text-sm text-gray-600">Terima notifikasi saat ada pembatalan</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4CA771] peer-focus:ring-opacity-25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4CA771]"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[#EAF9E7] rounded-lg">
                  <div>
                    <p className="font-medium text-[#013237]">Laporan Harian</p>
                    <p className="text-sm text-gray-600">Terima ringkasan laporan harian</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4CA771] peer-focus:ring-opacity-25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4CA771]"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <button className="bg-[#4CA771] text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#3d8a5d] transition-colors">
              <Save className="h-4 w-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        );
      
      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#013237] mb-4">Preferensi Umum</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-2">Bahasa</label>
                  <select className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]">
                    <option>Bahasa Indonesia</option>
                    <option>English</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-2">Zona Waktu</label>
                  <select className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]">
                    <option>WIB (UTC+7)</option>
                    <option>WITA (UTC+8)</option>
                    <option>WIT (UTC+9)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-2">Format Tanggal</label>
                  <select className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-2">Mata Uang</label>
                  <select className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]">
                    <option>Rupiah (IDR)</option>
                    <option>US Dollar (USD)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button className="bg-[#4CA771] text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#3d8a5d] transition-colors">
              <Save className="h-4 w-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#013237]">Pengaturan</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#C0E6BA] overflow-hidden">
        <div className="flex border-b border-[#C0E6BA]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#4CA771] text-white'
                  : 'text-[#013237] hover:bg-[#EAF9E7]'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};