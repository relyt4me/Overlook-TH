import User from '../src/User';

class Customer extends User {
  constructor(id, name) {
    super(id);
    this.name = name;
    this.bookings = [];
  }
}

export default Customer;
