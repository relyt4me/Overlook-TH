import Customer from '../src/Customer';

class UserRepo {
  constructor(customerDataSet) {
    this.customers = this.makeUsers(customerDataSet);
  }
  makeUsers(dataSet) {
    return dataSet.map((customer) => {
      return new Customer(customer.id, customer.name);
    });
  }
}

export default UserRepo;
