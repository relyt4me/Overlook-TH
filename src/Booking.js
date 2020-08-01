class Booking {
  constructor(id, userID, date, roomNumber, cost) {
    this.id = id;
    this.userID = userID;
    this.date = date;
    this.roomNumber = roomNumber;
    this.roomServiceCharges = [];
    this.cost = parseFloat(cost) || 0;
  }
}

export default Booking;
