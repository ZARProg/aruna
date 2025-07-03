import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Bed,
  Wifi,
  Tv,
  Coffee,
  Car,
  CheckCircle,
  AlertCircle,
  Edit3,
  Trash2
} from 'lucide-react';
import { Room } from '../App';

interface RoomsProps {
  rooms: Room[];
}

export const Rooms: React.FC<RoomsProps> = ({ rooms }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const amenityIcons = {
    wifi: Wifi,
    tv: Tv,
    ac: Coffee,
    minibar: Coffee,
    balcony: Car
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.includes(searchTerm) || 
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    occupied: 'bg-red-100 text-red-800',
    maintenance: 'bg-yellow-100 text-yellow-800'
  };

  const statusLabels = {
    available: 'Tersedia',
    occupied: 'Terisi',
    maintenance: 'Maintenance'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#013237]">Manajemen Kamar</h1>
        <button className="bg-[#4CA771] text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#3d8a5d] transition-colors">
          <Plus className="h-5 w-5" />
          <span>Tambah Kamar</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-[#C0E6BA] p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nomor kamar atau tipe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
          >
            <option value="all">Semua Status</option>
            <option value="available">Tersedia</option>
            <option value="occupied">Terisi</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Room Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kamar Tersedia</p>
              <p className="text-xl lg:text-2xl font-bold text-[#4CA771]">
                {rooms.filter(r => r.status === 'available').length}
              </p>
            </div>
            <CheckCircle className="h-6 lg:h-8 w-6 lg:w-8 text-[#4CA771]" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kamar Terisi</p>
              <p className="text-xl lg:text-2xl font-bold text-red-500">
                {rooms.filter(r => r.status === 'occupied').length}
              </p>
            </div>
            <AlertCircle className="h-6 lg:h-8 w-6 lg:w-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-xl lg:text-2xl font-bold text-yellow-500">
                {rooms.filter(r => r.status === 'maintenance').length}
              </p>
            </div>
            <AlertCircle className="h-6 lg:h-8 w-6 lg:w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border border-[#C0E6BA] overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-[#4CA771] rounded-full flex items-center justify-center">
                    <Bed className="h-5 lg:h-6 w-5 lg:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-[#013237]">#{room.number}</h3>
                    <p className="text-sm text-gray-600">{room.type}</p>
                  </div>
                </div>
                <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${statusColors[room.status]}`}>
                  {statusLabels[room.status]}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{room.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Kapasitas: {room.capacity} orang</span>
                <span className="text-base lg:text-lg font-bold text-[#4CA771]">
                  Rp {room.price.toLocaleString('id-ID')}/malam
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-[#013237] mb-2">Fasilitas:</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || Coffee;
                    return (
                      <div key={index} className="flex items-center space-x-1 bg-[#EAF9E7] px-2 py-1 rounded-full">
                        <Icon className="h-3 w-3 text-[#4CA771]" />
                        <span className="text-xs text-[#013237] capitalize">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-[#C0E6BA] text-[#013237] py-2 rounded-lg hover:bg-[#a8d4a2] transition-colors flex items-center justify-center space-x-1">
                  <Edit3 className="h-4 w-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button className="flex-1 bg-red-100 text-red-800 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center space-x-1">
                  <Trash2 className="h-4 w-4" />
                  <span className="text-sm">Hapus</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};