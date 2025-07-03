import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  User,
  Phone,
  Mail,
  Calendar,
  Filter,
  Edit3,
  Trash2,
  Eye
} from 'lucide-react';
import { Guest } from '../App';

interface GuestsProps {
  guests: Guest[];
}

export const Guests: React.FC<GuestsProps> = ({ guests }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.phone.includes(searchTerm)
  );

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    vip: 'bg-purple-100 text-purple-800',
    inactive: 'bg-gray-100 text-gray-800'
  };

  const statusLabels = {
    active: 'Aktif',
    vip: 'VIP',
    inactive: 'Tidak Aktif'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#013237]">Manajemen Tamu</h1>
        <button className="bg-[#4CA771] text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#3d8a5d] transition-colors">
          <Plus className="h-5 w-5" />
          <span>Tambah Tamu</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-[#C0E6BA] p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama, email, atau nomor telepon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
            />
          </div>
          <button className="bg-[#C0E6BA] text-[#013237] px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#a8d4a2] transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Guest Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tamu</p>
              <p className="text-xl lg:text-2xl font-bold text-[#4CA771]">{guests.length}</p>
            </div>
            <User className="h-6 lg:h-8 w-6 lg:w-8 text-[#4CA771]" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tamu VIP</p>
              <p className="text-xl lg:text-2xl font-bold text-purple-600">
                {guests.filter(g => g.status === 'vip').length}
              </p>
            </div>
            <User className="h-6 lg:h-8 w-6 lg:w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tamu Aktif</p>
              <p className="text-xl lg:text-2xl font-bold text-[#4CA771]">
                {guests.filter(g => g.status === 'active').length}
              </p>
            </div>
            <User className="h-6 lg:h-8 w-6 lg:w-8 text-[#4CA771]" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reservasi</p>
              <p className="text-xl lg:text-2xl font-bold text-[#4CA771]">
                {guests.reduce((sum, g) => sum + g.totalReservations, 0)}
              </p>
            </div>
            <Calendar className="h-6 lg:h-8 w-6 lg:w-8 text-[#4CA771]" />
          </div>
        </div>
      </div>

      {/* Guests List */}
      <div className="bg-white rounded-xl shadow-sm border border-[#C0E6BA] overflow-hidden">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-[#013237] mb-4">Daftar Tamu</h3>
          <div className="space-y-4">
            {filteredGuests.length === 0 ? (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada data tamu</p>
              </div>
            ) : (
              filteredGuests.map((guest) => (
                <div key={guest.id} className="border border-[#C0E6BA] rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#4CA771] rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                          <h4 className="font-semibold text-[#013237]">{guest.name}</h4>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[guest.status]}`}>
                            {statusLabels[guest.status]}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1 space-y-1 sm:space-y-0">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600 truncate">{guest.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{guest.phone}</span>
                          </div>
                        </div>
                        {guest.address && (
                          <p className="text-sm text-gray-500 mt-1">{guest.address}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
                      <div className="grid grid-cols-3 gap-4 sm:flex sm:space-x-6">
                        <div className="text-center">
                          <p className="text-sm font-medium text-[#013237]">Reservasi</p>
                          <p className="text-lg font-bold text-[#4CA771]">{guest.totalReservations}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm font-medium text-[#013237]">Total Spending</p>
                          <p className="text-sm lg:text-base font-bold text-[#4CA771]">
                            Rp {guest.totalSpent.toLocaleString('id-ID')}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm font-medium text-[#013237]">Terakhir</p>
                          <p className="text-sm text-gray-600">{guest.lastVisit}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 bg-[#C0E6BA] text-[#013237] rounded-lg hover:bg-[#a8d4a2] transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-[#C0E6BA] text-[#013237] rounded-lg hover:bg-[#a8d4a2] transition-colors">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};