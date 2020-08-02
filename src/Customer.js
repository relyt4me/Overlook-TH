import User from '../src/User';

class Customer extends User {
  constructor(id, name) {
    super(id);
    this.name = name || 'NO NAME';
    this.bookings = [];
  }

  addBooking(booking) {
    this.bookings.push(booking);
  }

  getSortedBookings() {
    return this.bookings.sort((bookingA, bookingB) => {
      let dateA = parseInt(bookingA.date.split('/').join(''));
      let dateB = parseInt(bookingB.date.split('/').join(''));
      return dateA - dateB;
    });
  }
}

export default Customer;
