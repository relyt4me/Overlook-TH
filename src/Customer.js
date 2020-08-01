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
}

export default Customer;
