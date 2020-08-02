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
}

export default Hotel;
