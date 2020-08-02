class Room {
  constructor(roomNumber, roomType, hasBidet, bedSize, numBeds, cost) {
    this.number = roomNumber;
    this.roomType = roomType;
    this.hasBidet = hasBidet;
    this.bedSize = bedSize;
    this.numBeds = numBeds;
    this.costPerNight = parseFloat(cost) || 0;
  }
}

export default Room;
