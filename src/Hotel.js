class Hotel {
  constructor(rooms, bookings, manager) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.manager = manager;
  }
  isRoomAvailable(date, roomNumber) {
    let matchingBooking = this.bookings.find((booking) => {
      return booking.date === date && booking.roomNumber === roomNumber;
    });
    return matchingBooking ? false : true;
  }

  getBookingsTotalCost(setOfBookings) {
    return setOfBookings.reduce((totalCost, booking) => {
      let bookingRoom = this.rooms.find((room) => booking.roomNumber === room.number);
      return totalCost + bookingRoom.costPerNight;
    }, 0);
  }

  getRevenueForDay(date) {
    return this.getBookingsTotalCost(this.bookingsOnDay(date));
  }

  getAvailableRooms(date) {
    let daysBookingsRoomNums = this.bookingsOnDay(date).map((booking) => {
      return booking.roomNumber;
    });
    return this.rooms.filter((room) => {
      return !daysBookingsRoomNums.includes(room.number);
    });
  }

  getAvailableRoomTypeAndDate(date, type) {
    let availableRoomOnDate = this.getAvailableRooms(date);
    return availableRoomOnDate.filter((room) => {
      return room.roomType === type;
    });
  }

  bookingsOnDay(date) {
    return this.bookings.filter((booking) => {
      return booking.date === date;
    });
  }

  getPercentOccupied(date) {
    let fractionOfRooms = this.getAvailableRooms(date).length / this.rooms.length;
    return 100 - parseInt(fractionOfRooms * 100);
  }

  updateBookings(bookings) {
    this.bookings = bookings;
  }
}

export default Hotel;
