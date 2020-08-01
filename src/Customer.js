import User from '../src/User';

class Customer extends User {
  constructor(id, name) {
    super(id);
    this.name = name;
  }
}

export default Customer;
