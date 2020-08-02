import fetchData from './fetchAllData';
import UserRepo from './UserRepo';
import Manager from './Manager';
import Room from './Room';
import Booking from './Booking';
import Hotel from './Hotel';
import DomManipulation from './DomManipulation';

const data = {
  customerRepo: null,
  hotel: null,
};
let dom;

window.onload = startApp();

document.addEventListener('click', (event) => {
  if (event.target.id === 'login-button') {
    loginClicked(event);
  }
});

function startApp() {
  dom = new DomManipulation();
  fetchData()
    .then((allData) => {
      data.customerRepo = new UserRepo(allData.usersData);
      data.hotel = instantiateHotel(allData.roomsData, allData.bookingsData);
    })
    .then(() => {
      document.getElementById('login-button').disabled = false;
    })
    .catch((err) => console.log(err.message));
}

function loginClicked(event) {
  event.preventDefault();
  const enteredUsername = document.getElementById('username').value;
  const enteredPassword = document.getElementById('password').value;
  let customersID = data.customerRepo.getCustomerID(enteredUsername);
  if (enteredUsername === 'manager' && enteredPassword === data.hotel.manager.password) {
    loginManager();
  } else if (customersID && isPasswordCorrect(customersID, enteredPassword)) {
    loginUser();
  } else {
    dom.changeInnerTextID('error-msg', 'Incorrect Username or Password');
  }
}

function instantiateHotel(roomData, bookingData) {
  const rooms = instantiateRooms(roomData);
  const bookings = instantiateBookings(bookingData);
  return new Hotel(rooms, bookings, instantiateManager());
}

function instantiateManager() {
  return new Manager();
}

function instantiateRooms(roomData) {
  const allRooms = roomData.map((room) => {
    return new Room(room.number, room.RoomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight);
  });
  return allRooms;
}

function instantiateBookings(bookingData) {
  const allBookings = bookingData.map((booking) => {
    return new Booking(booking.id, booking.udserID, booking.date, booking.roomNumber);
  });
  return allBookings;
}

function isPasswordCorrect(userID, givenPassword) {
  return data.customerRepo.customers.some((customer) => {
    return userID === customer.id && givenPassword === customer.password;
  });
}
