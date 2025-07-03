import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Reservations } from './components/Reservations';
import { Rooms } from './components/Rooms';
import { Guests } from './components/Guests';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';

type ActivePage = 'dashboard' | 'reservations' | 'rooms' | 'guests' | 'reports' | 'settings';

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  joinDate: string;
  totalReservations: number;
  totalSpent: number;
  lastVisit: string;
  status: 'active' | 'vip' | 'inactive';
}

export interface Room {
  id: string;
  number: string;
  type: string;
  price: number;
  status: 'available' | 'occupied' | 'maintenance';
  amenities: string[];
  capacity: number;
  description: string;
}

export interface Reservation {
  id: string;
  guest: string;
  guestId: string;
  email: string;
  phone: string;
  room: string;
  roomId: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  price: number;
  nights: number;
  totalAmount: number;
  createdAt: string;
}

function App() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample data - in a real app, this would come from a backend
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: '1',
      name: 'Ahmad Wijaya',
      email: 'ahmad@email.com',
      phone: '081234567890',
      address: 'Jl. Sudirman No. 123, Jakarta',
      joinDate: '2023-06-15',
      totalReservations: 5,
      totalSpent: 7500000,
      lastVisit: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Sari Dewi',
      email: 'sari@email.com',
      phone: '081234567891',
      address: 'Jl. Gatot Subroto No. 456, Jakarta',
      joinDate: '2023-08-22',
      totalReservations: 3,
      totalSpent: 3600000,
      lastVisit: '2024-01-10',
      status: 'active'
    },
    {
      id: '3',
      name: 'Budi Santoso',
      email: 'budi@email.com',
      phone: '081234567892',
      address: 'Jl. Thamrin No. 789, Jakarta',
      joinDate: '2023-03-10',
      totalReservations: 8,
      totalSpent: 12000000,
      lastVisit: '2024-01-12',
      status: 'vip'
    },
  ]);

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      number: '101',
      type: 'Superior',
      price: 800000,
      status: 'available',
      amenities: ['wifi', 'tv', 'ac'],
      capacity: 2,
      description: 'Kamar nyaman dengan pemandangan kota'
    },
    {
      id: '2',
      number: '102',
      type: 'Deluxe',
      price: 1200000,
      status: 'available',
      amenities: ['wifi', 'tv', 'ac', 'minibar'],
      capacity: 3,
      description: 'Kamar luas dengan fasilitas lengkap'
    },
    {
      id: '3',
      number: '201',
      type: 'Suite',
      price: 2000000,
      status: 'available',
      amenities: ['wifi', 'tv', 'ac', 'minibar', 'balcony'],
      capacity: 4,
      description: 'Suite mewah dengan balkon pribadi'
    },
  ]);

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: '1',
      guest: 'Ahmad Wijaya',
      guestId: '1',
      email: 'ahmad@email.com',
      phone: '081234567890',
      room: '101',
      roomId: '1',
      roomType: 'Superior',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      status: 'confirmed',
      price: 800000,
      nights: 3,
      totalAmount: 2400000,
      createdAt: '2024-01-10'
    },
  ]);

  const addReservation = (newReservation: Omit<Reservation, 'id' | 'createdAt'>) => {
    const reservation: Reservation = {
      ...newReservation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReservations(prev => [...prev, reservation]);
    
    // Update room status to occupied
    setRooms(prev => prev.map(room => 
      room.id === newReservation.roomId 
        ? { ...room, status: 'occupied' as const }
        : room
    ));

    // Update guest data if exists, or add new guest
    const existingGuest = guests.find(g => g.email === newReservation.email);
    if (existingGuest) {
      setGuests(prev => prev.map(guest => 
        guest.id === existingGuest.id
          ? {
              ...guest,
              totalReservations: guest.totalReservations + 1,
              totalSpent: guest.totalSpent + newReservation.totalAmount,
              lastVisit: newReservation.checkIn
            }
          : guest
      ));
    } else {
      const newGuest: Guest = {
        id: Date.now().toString(),
        name: newReservation.guest,
        email: newReservation.email,
        phone: newReservation.phone,
        joinDate: new Date().toISOString().split('T')[0],
        totalReservations: 1,
        totalSpent: newReservation.totalAmount,
        lastVisit: newReservation.checkIn,
        status: 'active'
      };
      setGuests(prev => [...prev, newGuest]);
    }
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard reservations={reservations} rooms={rooms} guests={guests} />;
      case 'reservations':
        return (
          <Reservations 
            reservations={reservations}
            rooms={rooms}
            onAddReservation={addReservation}
          />
        );
      case 'rooms':
        return <Rooms rooms={rooms} />;
      case 'guests':
        return <Guests guests={guests} />;
      case 'reports':
        return <Reports reservations={reservations} rooms={rooms} guests={guests} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard reservations={reservations} rooms={rooms} guests={guests} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EAF9E7]">
      <Navigation 
        activePage={activePage} 
        setActivePage={setActivePage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="lg:ml-64 p-4 lg:p-8">
        {renderActivePage()}
      </main>
    </div>
  );
}

export default App;