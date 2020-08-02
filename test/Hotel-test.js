import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel';
import Room from '../src/Room';
import Booking from '../src/Booking';
import Manager from '../src/Manager';

describe.only('Hotel', () => {
  let hotel, room1, room2, room3, booking1, booking2, booking3, booking4, booking5, manager;
  before(() => {
    room1 = new Room(1, 'suite', true, 'queen', 1, 100.01);
    room2 = new Room(2, 'junior suite', false, 'twin', 2, 50);
    room3 = new Room(3, 'suite', false, 'king', 4, 300);
    booking1 = new Booking('5fwrgu4i7k55hl6sz', 9, '2020/04/22', 1, 100.01);
    booking2 = new Booking('5fwrgu4i7k55hl6t5', 43, '2020/01/24', 1, 100.01);
    booking3 = new Booking('5fwrgu4i7k55hl6t6', 13, '2020/04/22', 2, 50);
    booking4 = new Booking('5fwrgu4i7k55hl6t7', 20, '2020/01/24', 3, 300);
    booking5 = new Booking('5fwrgu4i7k55hl6t8', 12, '2020/02/16', 3, 300);
    manager = new Manager();
    hotel = new Hotel([room1, room2, room3], [booking1, booking2, booking3, booking4, booking5], manager);
  });
  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should have rooms', () => {
    expect(hotel.rooms).to.eql([room1, room2, room3]);
  });

  it('should have bookings', () => {
    expect(hotel.bookings).to.eql([booking1, booking2, booking3, booking4, booking5]);
  });

  it('should have a manager', () => {
    expect(hotel.manager).to.eql(manager);
  });

  it('should tell you if a room is available', () => {
    expect(hotel.isRoomAvailable('2020/01/24', 4)).to.equal(true);
    expect(hotel.isRoomAvailable('2020/04/25', 1)).to.equal(true);
    expect(hotel.isRoomAvailable('2020/01/28', 4)).to.equal(true);
  });

  it('should tell you if a room is not available', () => {
    expect(hotel.isRoomAvailable('2020/04/22', 2)).to.equal(false);
  });

  it('should give me the cost of a group of bookings', () => {
    expect(hotel.getBookingsTotalCost([booking1, booking3])).to.equal(150.01);
  });

  it('should get the cost of bookings from a single date', () => {
    expect(hotel.getRevenueForDay('2020/04/22')).to.equal(150.01);
    expect(hotel.getRevenueForDay('2020/01/24')).to.equal(400.01);
  });

  it('should get the a list of available rooms for a date', () => {
    expect(hotel.getAvailableRooms('2020/04/22')).to.eql([room3]);
    expect(hotel.getAvailableRooms('2020/02/16')).to.eql([room1, room2]);
    expect(hotel.getAvailableRooms('2020/08/04')).to.eql([room1, room2, room3]);
  });

  it('should get a percent of room occupied for a date', () => {
    expect(hotel.getPercentOccupied('2020/04/22')).to.equal(66);
    expect(hotel.getPercentOccupied('2020/02/16')).to.equal(33);
    expect(hotel.getPercentOccupied('2020/08/04')).to.equal(0);
  });

  it('should get update its bookings', () => {
    hotel.updateBookings([booking3, booking2, booking5]);
    expect(hotel.bookings).to.eql([booking3, booking2, booking5]);
  });
});
