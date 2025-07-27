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
  onAddGuest?: (guest: Omit<Guest, 'id'>) => void;
  onUpdateGuest?: (guestId: string, updatedGuest: Partial<Guest>) => void;
  onDeleteGuest?: (guestId: string) => void;
}

export const Guests: React.FC<GuestsProps> = ({ guests, onAddGuest, onUpdateGuest, onDeleteGuest }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [addFormData, setAddFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'active' as Guest['status']
  });
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'active' as Guest['status']
  });

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
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#4CA771] text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#3d8a5d] transition-colors"
        >
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
                        <button 
                          onClick={() => {
                            setSelectedGuest(guest);
                            setEditFormData({
                              name: guest.name,
                              email: guest.email,
                              phone: guest.phone,
                              address: guest.address || '',
                              status: guest.status
                            });
                            setShowEditModal(true);
                          }}
                          className="p-2 bg-[#C0E6BA] text-[#013237] rounded-lg hover:bg-[#a8d4a2] transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedGuest(guest);
                            setEditFormData({
                              name: guest.name,
                              email: guest.email,
                              phone: guest.phone,
                              address: guest.address || '',
                              status: guest.status
                            });
                            setShowEditModal(true);
                          }}
                          className="p-2 bg-[#C0E6BA] text-[#013237] rounded-lg hover:bg-[#a8d4a2] transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedGuest(guest);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                        >
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

      {/* Add Guest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 lg:p-6 border-b border-[#C0E6BA] rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#013237]">Tambah Tamu Baru</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={addFormData.name}
                  onChange={(e) => setAddFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={addFormData.email}
                  onChange={(e) => setAddFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  placeholder="Masukkan email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  value={addFormData.phone}
                  onChange={(e) => setAddFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  placeholder="Masukkan no. telepon"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Alamat
                </label>
                <textarea
                  value={addFormData.address}
                  onChange={(e) => setAddFormData(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                  placeholder="Masukkan alamat"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Status
                </label>
                <select
                  value={addFormData.status}
                  onChange={(e) => setAddFormData(prev => ({ ...prev, status: e.target.value as Guest['status'] }))}
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                >
                  <option value="active">Aktif</option>
                  <option value="vip">VIP</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-[#C0E6BA] text-[#013237] rounded-lg hover:bg-[#C0E6BA] hover:bg-opacity-20 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    if (onAddGuest) {
                      const newGuest: Omit<Guest, 'id'> = {
                        ...addFormData,
                        joinDate: new Date().toISOString().split('T')[0],
                        totalReservations: 0,
                        totalSpent: 0,
                        lastVisit: '-'
                      };
                      onAddGuest(newGuest);
                      setAddFormData({
                        name: '',
                        email: '',
                        phone: '',
                        address: '',
                        status: 'active'
                      });
                      setShowAddModal(false);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-[#4CA771] text-white rounded-lg hover:bg-[#3d8a5d] transition-colors"
                >
                  Tambah Tamu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Guest Modal */}
      {showEditModal && selectedGuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 lg:p-6 border-b border-[#C0E6BA] rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#013237]">Edit Tamu</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Alamat
                </label>
                <textarea
                  value={editFormData.address}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Status
                </label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, status: e.target.value as Guest['status'] }))}
                  className="w-full px-3 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
                >
                  <option value="active">Aktif</option>
                  <option value="vip">VIP</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-[#C0E6BA] text-[#013237] rounded-lg hover:bg-[#C0E6BA] hover:bg-opacity-20 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    if (onUpdateGuest && selectedGuest) {
                      onUpdateGuest(selectedGuest.id, editFormData);
                      setShowEditModal(false);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-[#4CA771] text-white rounded-lg hover:bg-[#3d8a5d] transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Guest Modal */}
      {showDeleteModal && selectedGuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#013237] text-center mb-2">
                Hapus Tamu {selectedGuest.name}?
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Tindakan ini tidak dapat dibatalkan. Data tamu dan reservasi terkait akan dihapus secara permanen.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-[#C0E6BA] text-[#013237] rounded-lg hover:bg-[#C0E6BA] hover:bg-opacity-20 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    if (onDeleteGuest && selectedGuest) {
                      onDeleteGuest(selectedGuest.id);
                      setShowDeleteModal(false);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};