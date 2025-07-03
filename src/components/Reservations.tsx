import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  User,
  Bed,
  CheckCircle,
  Clock,
  X,
  AlertCircle
} from 'lucide-react';
import { Reservation, Room } from '../App';

interface ReservationsProps {
  reservations: Reservation[];
  rooms: Room[];
  onAddReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => void;
}

export const Reservations: React.FC<ReservationsProps> = ({ 
  reservations, 
  rooms, 
  onAddReservation 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    guest: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomId: '',
    specialRequests: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filteredReservations = reservations.filter(reservation =>
    reservation.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.room.includes(searchTerm) ||
    reservation.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    confirmed: 'Dikonfirmasi',
    pending: 'Pending',
    cancelled: 'Dibatalkan'
  };

  const availableRooms = rooms.filter(room => room.status === 'available');

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.guest.trim()) errors.guest = 'Nama tamu wajib diisi';
    if (!formData.email.trim()) errors.email = 'Email wajib diisi';
    if (!formData.email.includes('@')) errors.email = 'Format email tidak valid';
    if (!formData.phone.trim()) errors.phone = 'Nomor telepon wajib diisi';
    if (!formData.checkIn) errors.checkIn = 'Tanggal check-in wajib diisi';
    if (!formData.checkOut) errors.checkOut = 'Tanggal check-out wajib diisi';
    if (!formData.roomId) errors.roomId = 'Pilih kamar wajib diisi';
    
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (checkInDate < today) {
        errors.checkIn = 'Tanggal check-in tidak boleh di masa lalu';
      }
      
      if (checkOutDate <= checkInDate) {
        errors.checkOut = 'Tanggal check-out harus setelah check-in';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const selectedRoom = rooms.find(room => room.id === formData.roomId);
    if (!selectedRoom) return;
    
    const nights = calculateNights(formData.checkIn, formData.checkOut);
    const totalAmount = selectedRoom.price * nights;
    
    const newReservation: Omit<Reservation, 'id' | 'createdAt'> = {
      guest: formData.guest,
      guestId: '', // Will be set in App component
      email: formData.email,
      phone: formData.phone,
      room: selectedRoom.number,
      roomId: selectedRoom.id,
      roomType: selectedRoom.type,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      status: 'confirmed',
      price: selectedRoom.price,
      nights,
      totalAmount
    };
    
    onAddReservation(newReservation);
    
    // Reset form
    setFormData({
      guest: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      roomId: '',
      specialRequests: ''
    });
    setFormErrors({});
    setShowAddForm(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#013237]">Manajemen Reservasi</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#4CA771] text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#3d8a5d] transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Reservasi</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-[#C0E6BA] p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari tamu, email, atau nomor kamar..."
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

      {/* Reservations Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reservasi</p>
              <p className="text-xl lg:text-2xl font-bold text-[#4CA771]">{reservations.length}</p>
            </div>
            <Calendar className="h-6 lg:h-8 w-6 lg:w-8 text-[#4CA771]" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dikonfirmasi</p>
              <p className="text-xl lg:text-2xl font-bold text-green-600">
                {reservations.filter(r => r.status === 'confirmed').length}
              </p>
            </div>
            <CheckCircle className="h-6 lg:h-8 w-6 lg:w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-xl lg:text-2xl font-bold text-yellow-600">
                {reservations.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-6 lg:h-8 w-6 lg:w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pendapatan</p>
              <p className="text-lg lg:text-xl font-bold text-[#4CA771]">
                Rp {reservations.reduce((sum, r) => sum + r.totalAmount, 0).toLocaleString('id-ID')}
              </p>
            </div>
            <Calendar className="h-6 lg:h-8 w-6 lg:w-8 text-[#4CA771]" />
          </div>
        </div>
      </div>

      {/* Reservations List */}
      <div className="bg-white rounded-xl shadow-sm border border-[#C0E6BA] overflow-hidden">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-[#013237] mb-4">Daftar Reservasi</h3>
          <div className="space-y-4">
            {filteredReservations.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada reservasi</p>
              </div>
            ) : (
              filteredReservations.map((reservation) => (
                <div key={reservation.id} className="border border-[#C0E6BA] rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#4CA771] rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-[#013237] truncate">{reservation.guest}</h4>
                        <p className="text-sm text-gray-600 truncate">{reservation.email}</p>
                        <p className="text-sm text-gray-600">{reservation.phone}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:flex lg:items-center lg:space-x-6 gap-4 lg:gap-0">
                      <div className="text-center lg:text-left">
                        <p className="text-sm font-medium text-[#013237]">Kamar</p>
                        <p className="text-lg font-bold text-[#4CA771]">{reservation.room}</p>
                        <p className="text-xs text-gray-500">{reservation.roomType}</p>
                      </div>
                      
                      <div className="text-center lg:text-left">
                        <p className="text-sm font-medium text-[#013237]">Check-in</p>
                        <p className="text-sm text-gray-600">{reservation.checkIn}</p>
                      </div>
                      
                      <div className="text-center lg:text-left">
                        <p className="text-sm font-medium text-[#013237]">Check-out</p>
                        <p className="text-sm text-gray-600">{reservation.checkOut}</p>
                      </div>
                      
                      <div className="text-center lg:text-left">
                        <p className="text-sm font-medium text-[#013237]">Total</p>
                        <p className="text-lg font-bold text-[#4CA771]">
                          Rp {reservation.totalAmount.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-gray-500">{reservation.nights} malam</p>
                      </div>
                      
                      <div className="col-span-2 lg:col-span-1 text-center lg:text-left">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[reservation.status]}`}>
                          {statusLabels[reservation.status]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Reservation Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 lg:p-6 border-b border-[#C0E6BA] rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#013237]">Tambah Reservasi</h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setFormErrors({});
                    setFormData({
                      guest: '',
                      email: '',
                      phone: '',
                      checkIn: '',
                      checkOut: '',
                      roomId: '',
                      specialRequests: ''
                    });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Nama Tamu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.guest}
                  onChange={(e) => handleInputChange('guest', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771] ${
                    formErrors.guest ? 'border-red-500' : 'border-[#C0E6BA]'
                  }`}
                  placeholder="Masukkan nama tamu"
                />
                {formErrors.guest && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {formErrors.guest}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771] ${
                    formErrors.email ? 'border-red-500' : 'border-[#C0E6BA]'
                  }`}
                  placeholder="Masukkan email"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {formErrors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  No. Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771] ${
                    formErrors.phone ? 'border-red-500' : 'border-[#C0E6BA]'
                  }`}
                  placeholder="Masukkan no. telepon"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {formErrors.phone}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-1">
                    Check-in <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771] ${
                      formErrors.checkIn ? 'border-red-500' : 'border-[#C0E6BA]'
                    }`}
                  />
                  {formErrors.checkIn && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {formErrors.checkIn}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#013237] mb-1">
                    Check-out <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771] ${
                      formErrors.checkOut ? 'border-red-500' : 'border-[#C0E6BA]'
                    }`}
                  />
                  {formErrors.checkOut && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {formErrors.checkOut}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#013237] mb-1">
                  Pilih Kamar <span className="text-red-500">*</span>
                </label>
                <select 
                  value={formData.roomId}
                  onChange={(e) => handleInputChange('roomId', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771] ${
                    formErrors.roomId ? 'border-red-500' : 'border-[#C0E6BA]'
                  }`}
                >
                  <option value="">Pilih kamar tersedia</option>
                  {availableRooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.number} - {room.type} (Rp {room.price.toLocaleString('id-ID')}/malam)
                    </option>
                  ))}
                </select>
                {formErrors.roomId && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {formErrors.roomId}
                  </p>
                )}
                {availableRooms.length === 0 && (
                  <p className="text-yellow-600 text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Tidak ada kamar tersedia
                  </p>
                )}
              </div>

              {formData.checkIn && formData.checkOut && formData.roomId && (
                <div className="bg-[#EAF9E7] p-4 rounded-lg">
                  <h4 className="font-medium text-[#013237] mb-2">Ringkasan Reservasi</h4>
                  {(() => {
                    const selectedRoom = rooms.find(r => r.id === formData.roomId);
                    const nights = calculateNights(formData.checkIn, formData.checkOut);
                    const total = selectedRoom ? selectedRoom.price * nights : 0;
                    
                    return (
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Kamar:</span>
                          <span>{selectedRoom?.number} - {selectedRoom?.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Durasi:</span>
                          <span>{nights} malam</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Harga per malam:</span>
                          <span>Rp {selectedRoom?.price.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between font-bold text-[#4CA771] border-t pt-1">
                          <span>Total:</span>
                          <span>Rp {total.toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormErrors({});
                    setFormData({
                      guest: '',
                      email: '',
                      phone: '',
                      checkIn: '',
                      checkOut: '',
                      roomId: '',
                      specialRequests: ''
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-[#C0E6BA] text-[#013237] rounded-lg hover:bg-[#C0E6BA] hover:bg-opacity-20 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={availableRooms.length === 0}
                  className="flex-1 px-4 py-2 bg-[#4CA771] text-white rounded-lg hover:bg-[#3d8a5d] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};