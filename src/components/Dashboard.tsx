import React from 'react';
import { 
  Users, 
  Bed, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Reservation, Room, Guest } from '../App';

interface DashboardProps {
  reservations: Reservation[];
  rooms: Room[];
  guests: Guest[];
}

export const Dashboard: React.FC<DashboardProps> = ({ reservations, rooms, guests }) => {
  const availableRooms = rooms.filter(room => room.status === 'available').length;
  const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
  const occupancyRate = Math.round((occupiedRooms / rooms.length) * 100);
  const monthlyRevenue = reservations.reduce((sum, r) => sum + r.totalAmount, 0);

  const stats = [
    { 
      title: 'Total Tamu', 
      value: guests.length.toString(), 
      change: '+12%', 
      icon: Users,
      color: 'bg-[#4CA771]'
    },
    { 
      title: 'Kamar Tersedia', 
      value: availableRooms.toString(), 
      change: `${Math.round((availableRooms / rooms.length) * 100)}%`, 
      icon: Bed,
      color: 'bg-[#4CA771]'
    },
    { 
      title: 'Reservasi Bulan Ini', 
      value: reservations.length.toString(), 
      change: '+8%', 
      icon: Calendar,
      color: 'bg-[#4CA771]'
    },
    { 
      title: 'Okupansi', 
      value: `${occupancyRate}%`, 
      change: '+5%', 
      icon: TrendingUp,
      color: 'bg-[#4CA771]'
    },
  ];

  const recentReservations = reservations
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#013237]">Dashboard</h1>
        <p className="text-gray-600 text-sm lg:text-base">Selamat datang kembali! Berikut ringkasan hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xl lg:text-2xl font-bold text-[#013237] mt-1">{stat.value}</p>
                <p className="text-sm text-[#4CA771] mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-5 lg:h-6 w-5 lg:w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-[#C0E6BA] p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-[#013237] mb-4">Reservasi Terbaru</h3>
          <div className="space-y-4">
            {recentReservations.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada reservasi</p>
              </div>
            ) : (
              recentReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-4 bg-[#EAF9E7] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#4CA771] rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-[#013237] truncate">{reservation.guest}</p>
                      <p className="text-sm text-gray-600">Kamar {reservation.room}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#013237]">{reservation.checkIn}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {reservation.status === 'confirmed' ? (
                        <CheckCircle className="h-4 w-4 text-[#4CA771]" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className={`text-xs capitalize ${
                        reservation.status === 'confirmed' ? 'text-[#4CA771]' : 'text-yellow-500'
                      }`}>
                        {reservation.status === 'confirmed' ? 'Dikonfirmasi' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#C0E6BA] p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-[#013237] mb-4">Status Kamar</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#EAF9E7] rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#4CA771] rounded-full flex items-center justify-center">
                  <Bed className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#013237]">Kamar Tersedia</p>
                  <p className="text-sm text-gray-600">Siap untuk tamu baru</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#4CA771]">{availableRooms}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#013237]">Kamar Terisi</p>
                  <p className="text-sm text-gray-600">Sedang digunakan</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-red-500">{occupiedRooms}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#013237]">Maintenance</p>
                  <p className="text-sm text-gray-600">Dalam perbaikan</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-yellow-500">
                {rooms.filter(r => r.status === 'maintenance').length}
              </span>
            </div>
          </div>

          {monthlyRevenue > 0 && (
            <div className="mt-4 p-4 bg-[#EAF9E7] rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#013237]">Pendapatan Bulan Ini</p>
                  <p className="text-sm text-gray-600">Total dari semua reservasi</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#4CA771]">
                    Rp {monthlyRevenue.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};