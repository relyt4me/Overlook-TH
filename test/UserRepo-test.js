import chai from 'chai';
const expect = chai.expect;
import UserRepo from '../src/UserRepo';
import Customer from '../src/Customer';

describe('UserRepo', () => {
  let userRepo, userData;
  before(() => {
    userData = [
      {
        id: 1,
        name: 'Leatha Ullrich',
      },
      {
        id: 2,
        name: 'Rocio Schuster',
      },
      {
        id: 3,
        name: 'Kelvin Schiller',
      },
      {
        id: 4,
        name: 'Kennedi Emard',
      },
      {
        id: 5,
        name: 'Rhiannon Little',
      },
    ];
    userRepo = new UserRepo(usersData);
  });
  it('should be a function', () => {
    expect(UserRepo).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(userRepo).to.be.an.instanceOf(UserRepo);
  });

  it('should instatiate users from dataset', () => {
    const instatiatedCustomers = userRepo.makeUsers();
    expect(instatiatedCustomers[0]).to.be.an.instanceOf(Customer);
  });

  it('should have an array of instantiated customers', () => {
    expect(userRepo.customers.length).to.equal(5);
  });

  it('should have each customer be instantiated from the userData passed in', () => {
    const myCustomer = new Customer();

    expect(userRepo.customers[0]).to.eql(myCustomer);
  });

  it('should be able to find a customer', () => {
    const myCustomer = new Customer();

    expect(userRepo.findCustomer(2)).to.eql(myCustomer);
  });
});