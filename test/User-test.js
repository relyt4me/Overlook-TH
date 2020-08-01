import chai from 'chai';
const expect = chai.expect;
import User from '../src/User';

describe('User', () => {
  let customer, manager;
  before(() => {
    customer = new User(1);
    manager = new User();
  });
  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(customer).to.be.an.instanceOf(User);
  });

  it('should have an id', () => {
    expect(customer.id).to.equal(1);
  });

  it('should have an defualt id of "manager" if no id is given', () => {
    expect(manager.id).to.equal('manager');
  });

  it('should have a username', () => {
    expect(customer.username).to.equal('customer1');
  });

  it('should have the username of manager if no id was given', () => {
    expect(manager.username).to.equal('manager');
  });

  it('should have the default password', () => {
    expect(customer.password).to.equal('overlook2020');
    expect(manager.password).to.equal('overlook2020');
  });
});
