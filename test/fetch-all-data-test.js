import chai from 'chai';
const expect = chai.expect;
import FetchData from '../src/fetchAllData';
const spies = require('chai-spies');
chai.use(spies);

describe('fetchData', () => {
  it('should be a function', () => {
    expect(FetchData).to.be.a('function');
  });
});
