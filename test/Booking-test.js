import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/Booking';

describe.only('Booking', () => {
  let booking;
  before(() => {
    booking = new Booking('5fwrgu4i7k55hl6sz', 9, '2020/04/22', 15, 358.4);
  });
  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of User', () => {
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

  it('should have a cost', () => {
    expect(booking.cost).to.equal(358.4);
  });

  it('should ensure the cost is a number and return 0 if NaN', () => {
    const bookingOops = (booking = new Booking('5fwrgu4i7k55hl6sz', 9, '2020/04/22', 15, '358.4'));
    const bookingOops2 = (booking = new Booking('5fwrgu4i7k55hl6sz', 9, '2020/04/22', 15, 'potatoe'));

    expect(bookingOops.cost).to.equal(358.4);
    expect(bookingOops2.cost).to.equal(0);
  });
});
