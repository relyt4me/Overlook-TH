import chai from 'chai';
const expect = chai.expect;
import fetchData from '../src/fetchAllData';
const spies = require('chai-spies');
chai.use(spies);

describe('fetchData', () => {
  beforeEach(() => {
    global.fetch = (url) => {
      return Promise;
    };
    Promise.then = (callbackFunction) => {
      return Promise;
    };
    Promise.catch = (callbackFunction) => {
      return Promise;
    };
    chai.spy.on(global, ['fetch']);
  });
  it('should be a function', () => {
    expect(fetchData).to.be.a('function');
  });

  it('should return an object', () => {
    var type = typeof fetchData();
    expect(type).to.equal('object');
  });

  it('should call fetch three times', () => {
    fetchData();
    expect(global.fetch).to.have.been.called(3);
  });

  it('should be called with the correct arguments', () => {
    fetchData();
    const apiUrl = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users';
    expect(global.fetch).to.have.been.called.with(apiUrl);
  });
});
