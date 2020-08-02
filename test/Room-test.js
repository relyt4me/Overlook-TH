import chai from 'chai';
const expect = chai.expect;
import Room from '../src/Room';

describe('Room', () => {
  let room;
  before(() => {
    room = new Room(4, 'single room', false, 'queen', 1, 429.44);
  });
  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of Room', () => {
    expect(room).to.be.an.instanceOf(Room);
  });

  it('should have an number', () => {
    expect(room.number).to.equal(4);
  });

  it('should have a room type', () => {
    expect(room.roomType).to.equal('single room');
  });

  it('should be able to have a bidet or not', () => {
    expect(room.hasBidet).to.equal(false);
  });

  it('should have a bedSize', () => {
    expect(room.bedSize).to.equal('queen');
  });

  it('should have a number of beds', () => {
    expect(room.numBeds).to.equal(1);
  });

  it('should have cost for a night', () => {
    expect(room.costPerNight).to.equal(429.44);
  });

  it('should have a cost that is always a number', () => {
    const funnyRoom = new Room(5, 'suite', true, 'queen', 4, '205');
    const funnyRoom2 = new Room(9, 'suite', true, 'queen', 4, 'green-bay');
    expect(funnyRoom.costPerNight).to.eql(205);
    expect(funnyRoom2.costPerNight).to.eql(0);
  });
});
