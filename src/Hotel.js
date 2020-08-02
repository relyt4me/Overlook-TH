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
    let bookingsOnDay = this.bookings.filter((booking) => {
      return booking.date === date;
    });
    return this.getBookingsTotalCost(bookingsOnDay);
  }
}

export default Hotel;
