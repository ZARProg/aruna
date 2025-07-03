import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar,
  DollarSign,
  Users,
  Bed,
  Download,
  Filter,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Reservation, Room, Guest } from '../App';

interface ReportsProps {
  reservations: Reservation[];
  rooms: Room[];
  guests: Guest[];
}

export const Reports: React.FC<ReportsProps> = ({ reservations, rooms, guests }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const monthlyRevenue = reservations.reduce((sum, r) => sum + r.totalAmount, 0);
  const occupancyRate = Math.round((rooms.filter(r => r.status === 'occupied').length / rooms.length) * 100);
  const avgStayDuration = reservations.length > 0 
    ? (reservations.reduce((sum, r) => sum + r.nights, 0) / reservations.length).toFixed(1)
    : '0';
  const repeatGuests = guests.filter(g => g.totalReservations > 1).length;

  const monthlyStats = {
    revenue: monthlyRevenue,
    reservations: reservations.length,
    occupancyRate,
    avgStayDuration: parseFloat(avgStayDuration),
    totalGuests: guests.length,
    repeatGuests
  };

  // Sample revenue data for chart
  const revenueData = [
    { month: 'Jan', revenue: monthlyRevenue * 0.7 },
    { month: 'Feb', revenue: monthlyRevenue * 0.8 },
    { month: 'Mar', revenue: monthlyRevenue * 0.9 },
    { month: 'Apr', revenue: monthlyRevenue * 0.75 },
    { month: 'May', revenue: monthlyRevenue * 0.85 },
    { month: 'Jun', revenue: monthlyRevenue },
  ];

  const roomTypeStats = rooms.reduce((acc, room) => {
    const existing = acc.find(item => item.type === room.type);
    const roomReservations = reservations.filter(r => r.roomType === room.type);
    const revenue = roomReservations.reduce((sum, r) => sum + r.totalAmount, 0);
    
    if (existing) {
      existing.bookings += roomReservations.length;
      existing.revenue += revenue;
    } else {
      acc.push({
        type: room.type,
        bookings: roomReservations.length,
        revenue
      });
    }
    return acc;
  }, [] as Array<{ type: string; bookings: number; revenue: number }>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#013237]">Laporan & Statistik</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-[#C0E6BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CA771]"
          >
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
            <option value="quarter">Kuartal Ini</option>
            <option value="year">Tahun Ini</option>
          </select>
          <button className="bg-[#4CA771] text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#3d8a5d] transition-colors">
            <Download className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendapatan Bulan Ini</p>
              <p className="text-xl lg:text-2xl font-bold text-[#4CA771]">
                Rp {monthlyStats.revenue.toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-green-600 mt-1">+12% dari bulan lalu</p>
            </div>
            <DollarSign className="h-6 lg:h-8 w-6 lg:w-8 text-[#4CA771]" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reservasi</p>
              <p className="text-xl lg:text-2xl font-bold text-[#4CA771]">{monthlyStats.reservations}</p>
              <p className="text-sm text-green-600 mt-1">+8% dari bulan lalu</p>
            </div>
            <Calendar className="h-6 lg:h-8 w-6 lg:w-8 text-[#4CA771]" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tingkat Okupansi</p>
              <p className="text-xl lg:text-2xl font-bold text-[#4CA771]">{monthlyStats.occupancyRate}%</p>
              <p className="text-sm text-green-600 mt-1">+5% dari bulan lalu</p>
            </div>
            <Bed className="h-6 lg:h-8 w-6 lg:w-8 text-[#4CA771]" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rata-rata Lama Menginap</p>
              <p className="text-xl lg:text-2xl font-bold text-[#4CA771]">{monthlyStats.avgStayDuration} hari</p>
              <p className="text-sm text-gray-500 mt-1">Sama dengan bulan lalu</p>
            </div>
            <TrendingUp className="h-6 lg:h-8 w-6 lg:w-8 text-[#4CA771]" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tamu</p>
              <p className="text-xl lg:text-2xl font-bold text-[#4CA771]">{monthlyStats.totalGuests}</p>
              <p className="text-sm text-green-600 mt-1">+15% dari bulan lalu</p>
            </div>
            <Users className="h-6 lg:h-8 w-6 lg:w-8 text-[#4CA771]" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#C0E6BA]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tamu Berulang</p>
              <p className="text-xl lg:text-2xl font-bold text-[#4CA771]">{monthlyStats.repeatGuests}</p>
              <p className="text-sm text-gray-500 mt-1">
                {monthlyStats.totalGuests > 0 ? Math.round((monthlyStats.repeatGuests / monthlyStats.totalGuests) * 100) : 0}% dari total tamu
              </p>
            </div>
            <Users className="h-6 lg:h-8 w-6 lg:w-8 text-[#4CA771]" />
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-[#C0E6BA] p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#013237]">Trend Pendapatan</h3>
          <BarChart3 className="h-5 w-5 text-[#4CA771]" />
        </div>
        <div className="h-48 lg:h-64 flex items-end justify-between space-x-2 lg:space-x-4">
          {revenueData.map((data, index) => {
            const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
            const height = maxRevenue > 0 ? (data.revenue / maxRevenue) * 100 : 0;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-[#4CA771] rounded-t-lg min-h-[20px]"
                  style={{ height: `${Math.max(height, 10)}%` }}
                />
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium text-[#013237]">{data.month}</p>
                  <p className="text-xs text-gray-600">
                    Rp {(data.revenue / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Room Type Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-[#C0E6BA] p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#013237]">Analisis Tipe Kamar</h3>
            <PieChart className="h-5 w-5 text-[#4CA771]" />
          </div>
          <div className="space-y-4">
            {roomTypeStats.length === 0 ? (
              <div className="text-center py-8">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada data reservasi</p>
              </div>
            ) : (
              roomTypeStats.map((room, index) => {
                const totalBookings = roomTypeStats.reduce((sum, r) => sum + r.bookings, 0);
                const percentage = totalBookings > 0 ? ((room.bookings / totalBookings) * 100).toFixed(1) : '0';
                
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#EAF9E7] rounded-lg">
                    <div>
                      <p className="font-medium text-[#013237]">{room.type}</p>
                      <p className="text-sm text-gray-600">{room.bookings} reservasi</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#4CA771]">
                        Rp {room.revenue.toLocaleString('id-ID')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {percentage}% dari total
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#C0E6BA] p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-[#013237] mb-6">Laporan Harian</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#EAF9E7] rounded-lg">
              <div>
                <p className="font-medium text-[#013237]">Check-in Hari Ini</p>
                <p className="text-sm text-gray-600">
                  {reservations.filter(r => r.checkIn === new Date().toISOString().split('T')[0]).length} tamu
                </p>
              </div>
              <div className="w-12 h-12 bg-[#4CA771] rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#EAF9E7] rounded-lg">
              <div>
                <p className="font-medium text-[#013237]">Check-out Hari Ini</p>
                <p className="text-sm text-gray-600">
                  {reservations.filter(r => r.checkOut === new Date().toISOString().split('T')[0]).length} tamu
                </p>
              </div>
              <div className="w-12 h-12 bg-[#4CA771] rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#EAF9E7] rounded-lg">
              <div>
                <p className="font-medium text-[#013237]">Pendapatan Hari Ini</p>
                <p className="text-sm text-gray-600">
                  Rp {reservations
                    .filter(r => r.checkIn === new Date().toISOString().split('T')[0])
                    .reduce((sum, r) => sum + r.totalAmount, 0)
                    .toLocaleString('id-ID')}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#4CA771] rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};