import chai from 'chai';
const expect = chai.expect;
import User from '../src/User';
import Manager from '../src/Manager';

describe('Customer', () => {
  let manager;
  before(() => {
    manager = new Manager();
  });
  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(manager).to.be.an.instanceOf(User);
  });

  it('should be an instance of Manager', () => {
    expect(manager).to.be.an.instanceOf(Manager);
  });

  it('should inherit properties from User', () => {
    expect(manager.id).to.equal('manager');
    expect(manager.username).to.equal('manager');
    expect(manager.password).to.equal('overlook2020');
  });

  it('should be able to create a booking', () => {});

  it('should be able to remove a booking', () => {});
});
