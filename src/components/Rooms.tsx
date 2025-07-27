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
  Trash2,
  X,
  Save
} from 'lucide-react';
import { Room } from '../App';

interface RoomsProps {
  rooms: Room[];
  onAddRoom?: (room: Omit<Room, 'id'>) => void;
  onUpdateRoom?: (roomId: string, updatedRoom: Partial<Room>) => void;
  onDeleteRoom?: (roomId: string) => void;
}

export const Rooms: React.FC<RoomsProps> = ({ rooms, onAddRoom, onUpdateRoom, onDeleteRoom }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [editFormData, setEditFormData] = useState({
    number: '',
    type: '',
    price: '',
    status: 'available' as Room['status'],
    capacity: '',
    description: '',
    amenities: [] as string[]
  });

  const [addFormData, setAddFormData] = useState({
    number: '',
    type: 'Superior',
    price: '',
    status: 'available' as Room['status'],
    capacity: '',
    description: '',
    amenities: [] as string[]
  });

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

  const availableAmenities = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'tv', label: 'TV', icon: Tv },
    { id: 'ac', label: 'AC', icon: Coffee },
    { id: 'minibar', label: 'Minibar', icon: Coffee },
    { id: 'balcony', label: 'Balkon', icon: Car }
  ];

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setEditFormData({
      number: room.number,
      type: room.type,
      price: room.price.toString(),
      status: room.status,
      capacity: room.capacity.toString(),
      description: room.description,
      amenities: [...room.amenities]
    });
    setShowEditModal(true);
  };

  const handleDeleteRoom = (room: Room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = () => {
    if (!selectedRoom || !onUpdateRoom) return;

    const updatedRoom: Partial<Room> = {
      number: editFormData.number,
      type: editFormData.type,
      price: parseInt(editFormData.price),
      status: editFormData.status,
      capacity: parseInt(editFormData.capacity),
      description: editFormData.description,
      amenities: editFormData.amenities
    };

    onUpdateRoom(selectedRoom.id, updatedRoom);
    setShowEditModal(false);
    setSelectedRoom(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedRoom || !onDeleteRoom) return;
    onDeleteRoom(selectedRoom.id);
    setShowDeleteModal(false);
    setSelectedRoom(null);
  };

  const handleAmenityToggle = (amenityId: string) => {
    setEditFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleAddRoom = () => {
    if (!onAddRoom) return;

    const newRoom: Omit<Room, 'id'> = {
      number: addFormData.number,
      type: addFormData.type,
      price: parseInt(addFormData.price),
      status: addFormData.status,
      capacity: parseInt(addFormData.capacity),
      description: addFormData.description,
      amenities: addFormData.amenities
    };

    onAddRoom(newRoom);
    
    // Reset form
    setAddFormData({
      number: '',
      type: 'Superior',
      price: '',
      status: 'available',
      capacity: '',
      description: '',
      amenities: []
    });
    setShowAddModal(false);
  };

  const handleAddAmenityToggle = (amenityId: string) => {
    setAddFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  return (
    <>
      <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#013237]">Manajemen Kamar</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#4CA771] text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#3d8a5d] transition-colors"
        >
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
                <button 
                  onClick={() => handleEditRoom(room)}
                  className="flex-1 bg-[#C0E6BA] text-[#013237] py-2 rounded-lg hover:bg-[#a8d4a2] transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit3 className="h-4 w-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button 
                  onClick={() => handleDeleteRoom(room)}
                  className="flex-1 bg-red-100 text-red-800 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="text-sm">Hapus</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Edit Room Modal */}
      {showEditModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 lg:p-6 border-b border-[#C0E6BA] rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#013237]">Edit Kamar #{selectedRoom.number}</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-1">
                    Nomor Kamar
                  </label>
                  <input
                    type="text"
                    value={editFormData.number}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, number: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-1">
                    Tipe Kamar
                  </label>
                  <select
                    value={editFormData.type}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  >
                    <option value="Superior">Superior</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Presidential">Presidential</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-1">
                    Harga per Malam (Rp)
                  </label>
                  <input
                    type="number"
                    value={editFormData.price}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-1">
                    Kapasitas
                  </label>
                  <input
                    type="number"
                    value={editFormData.capacity}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, capacity: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-1">
                    Status
                  </label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, status: e.target.value as Room['status'] }))}
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  >
                    <option value="available">Tersedia</option>
                    <option value="occupied">Terisi</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={editFormData.description}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-2">
                  Fasilitas
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableAmenities.map((amenity) => (
                    <label key={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editFormData.amenities.includes(amenity.id)}
                        onChange={() => handleAmenityToggle(amenity.id)}
                        className="rounded border-[#C0E6BA] text-[#4CA771] focus:ring-[#4CA771]"
                      />
                      <amenity.icon className="h-4 w-4 text-[#4CA771]" />
                      <span className="text-sm text-[#013237]">{amenity.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-[#C0E6BA] text-[#013237] rounded-lg hover:bg-[#C0E6BA] hover:bg-opacity-20 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-2 bg-[#4CA771] text-white rounded-lg hover:bg-[#3d8a5d] transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 lg:p-6 border-b border-[#C0E6BA] rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#013237]">Tambah Kamar Baru</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-1">
                    Nomor Kamar
                  </label>
                  <input
                    type="text"
                    value={addFormData.number}
                    onChange={(e) => setAddFormData(prev => ({ ...prev, number: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                    placeholder="Contoh: 101"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-1">
                    Tipe Kamar
                  </label>
                  <select
                    value={addFormData.type}
                    onChange={(e) => setAddFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  >
                    <option value="Superior">Superior</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Presidential">Presidential</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-1">
                    Harga per Malam (Rp)
                  </label>
                  <input
                    type="number"
                    value={addFormData.price}
                    onChange={(e) => setAddFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                    placeholder="Contoh: 800000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-1">
                    Kapasitas
                  </label>
                  <input
                    type="number"
                    value={addFormData.capacity}
                    onChange={(e) => setAddFormData(prev => ({ ...prev, capacity: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                    placeholder="Contoh: 2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-1">
                    Status
                  </label>
                  <select
                    value={addFormData.status}
                    onChange={(e) => setAddFormData(prev => ({ ...prev, status: e.target.value as Room['status'] }))}
                    className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  >
                    <option value="available">Tersedia</option>
                    <option value="occupied">Terisi</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={addFormData.description}
                  onChange={(e) => setAddFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  placeholder="Deskripsi kamar..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-2">
                  Fasilitas
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableAmenities.map((amenity) => (
                    <label key={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addFormData.amenities.includes(amenity.id)}
                        onChange={() => handleAddAmenityToggle(amenity.id)}
                        className="rounded border-[#C0E6BA] text-[#4CA771] focus:ring-[#4CA771]"
                      />
                      <amenity.icon className="h-4 w-4 text-[#4CA771]" />
                      <span className="text-sm text-[#013237]">{amenity.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-[#C0E6BA] text-[#013237] rounded-lg hover:bg-[#C0E6BA] hover:bg-opacity-20 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddRoom}
                  className="flex-1 px-4 py-2 bg-[#4CA771] text-white rounded-lg hover:bg-[#3d8a5d] transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Tambah Kamar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#013237] text-center mb-2">
                Hapus Kamar #{selectedRoom.number}?
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Tindakan ini tidak dapat dibatalkan. Kamar akan dihapus secara permanen dari sistem.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-[#C0E6BA] text-[#013237] rounded-lg hover:bg-[#C0E6BA] hover:bg-opacity-20 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};