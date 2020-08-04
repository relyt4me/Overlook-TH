import User from './User';

class Manager extends User {
  constructor() {
    super();
  }

  createBooking(customerID, bookingDate, bookingRoomNumber) {
    const stringyPost = JSON.stringify({
      userID: parseInt(customerID),
      date: bookingDate,
      roomNumber: parseInt(bookingRoomNumber),
    });
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringyPost,
    })
      .then((response) => response.json())
      .then((json) => console.log('Request success: ', json))
      .catch((err) => console.log(err.message));
  }

  removeBooking(bookingId) {
    const stringyID = JSON.stringify({
      id: bookingId,
    });
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringyID,
    })
      .then((response) => response.json())
      .then((json) => console.log('Request success: ', json))
      .catch((err) => console.log(err.message));
  }
}

export default Manager;
