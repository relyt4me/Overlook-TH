class Booking {
  constructor(id, userID, date, roomNumber) {
    this.id = id;
    this.userID = userID;
    this.date = date;
    this.roomNumber = roomNumber;
    this.roomServiceCharges = [];
  }
}

export default Booking;
