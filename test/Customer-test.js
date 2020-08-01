import chai from 'chai';
const expect = chai.expect;
import User from '../src/User';
import Customer from '../src/Customer';

describe.only('Customer', () => {
  let customer1, firstBooking, secondBooking, thirdBooking;
  before(() => {
    customer1 = new Customer(1, 'Leatha Ullrich');
    firstBooking = {
      id: '5fwrgu4i7k55hl6sz',
      userID: 1,
      date: '2020/04/22',
      roomNumber: 15,
      roomServiceCharges: [],
    };
    secondBooking = {
      id: '5fwrgu4i7k55hl6t6',
      userID: 1,
      date: '2020/01/10',
      roomNumber: 12,
      roomServiceCharges: [],
    };
    thirdBooking = {
      id: '5fwrgu4i7k55hl6t7',
      userID: 1,
      date: '2020/02/16',
      roomNumber: 7,
      roomServiceCharges: [],
    };
  });
  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(customer1).to.be.an.instanceOf(User);
  });

  it('should be an instance of Customer', () => {
    expect(customer1).to.be.an.instanceOf(Customer);
  });

  it('should inherit properties from User', () => {
    expect(customer1.id).to.equal(1);
    expect(customer1.username).to.equal('customer1');
    expect(customer1.password).to.equal('overlook2020');
  });

  it('should have a name', () => {
    expect(customer1.name).to.equal('Leatha Ullrich');
  });

  it('should have a default of no name if no argument is given', () => {
    const noName = new Customer(3);

    expect(noName.name).to.equal('NO NAME');
  });

  it('should start with an empty set of bookings', () => {
    expect(customer1.bookings).to.eql([]);
  });

  it('should be able to add bookings', () => {
    customer1.addBooking(firstBooking);

    expect(customer1.bookings[0]).to.eql(firstBooking);
  });

  it('should be able to add multiple bookings', () => {
    customer1.addBooking(firstBooking);
    customer1.addBooking(secondBooking);
    customer1.addBooking(thirdBooking);

    expect(customer1.booking.lenght).to.equal(3);
    expect(customer1.bookings).to.eql([firstBooking, secondBooking, thirdBooking]);
  });

  it('should be able to sort bookings by date', () => {
    customer1.addBooking(firstBooking);
    customer1.addBooking(secondBooking);
    customer1.addBooking(thirdBooking);

    const sortedBookings = customer1.getSortedBookings();

    expect(sortedBookings).to.eql([secondBooking, thirdBooking, firstBooking]);
  });
});
