import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/Booking';

describe('Booking', () => {
  let booking;
  before(() => {
    booking = new Booking('5fwrgu4i7k55hl6sz', 9, '2020/04/22', 15, 358.4);
  });
  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(booking).to.be.an.instanceOf(Booking);
  });

  it('should have an id', () => {
    expect(booking.id).to.equal('5fwrgu4i7k55hl6sz');
  });

  it('should have an userID', () => {
    expect(booking.userID).to.equal(9);
  });

  it('should have a date', () => {
    expect(booking.date).to.equal('2020/04/22');
  });

  it('should have a room number', () => {
    expect(booking.roomNumber).to.equal(15);
  });

  it('should have no service charges by default', () => {
    expect(booking.roomServiceCharges).to.eql([]);
  });
});
