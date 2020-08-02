import chai from 'chai';
const expect = chai.expect;
import User from '../src/User';
import Manager from '../src/Manager';
const spies = require('chai-spies');
chai.use(spies);

describe('Manager', () => {
  let manager;
  before(() => {
    manager = new Manager();
  });
  beforeEach(() => {
    global.fetch = () => {
      return Promise;
    };
    Promise.then = () => {
      return Promise;
    };
    Promise.catch = () => {
      return Promise;
    };
    chai.spy.on(global, ['fetch']);
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

  // Spies test to implement later
  // it('should be able to create a booking', () => {});

  // it('should call fetch once when posting a booking', () => {});

  // it('should use the correct parameters when posting a booking', () => {});

  // it('should be able to remove a booking', () => {});

  // it('should call fetch once when removing a booking', () => {});

  // it('should call then twice when removing a booking', () => {});

  // it('should use the correct parameters when removing a booking', () => {});
});
