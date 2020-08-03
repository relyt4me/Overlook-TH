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

  findCustomer(id) {
    return this.customers.find((customer) => id === customer.id);
  }

  findCustomerByName(name) {
    return this.customers.find((customer) => name === customer.name);
  }

  getCustomerID(username) {
    const matchingCustomer = this.customers.find((customer) => username === customer.username);
    if (matchingCustomer) {
      return matchingCustomer.id;
    }
  }
}

export default UserRepo;
