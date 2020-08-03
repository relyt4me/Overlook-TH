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
let dom, currentUser;

window.onload = startApp();

document.addEventListener('click', (event) => {
  if (event.target.id === 'login-button') {
    loginClicked(event);
  } else if (event.target.id === 'view-my-bookings') {
    event.preventDefault();
    dom.displayCustomerBookings(currentUser);
  } else if (event.target.className === 'book-room-button') {
    bookThisRoom(currentUser.id, document.getElementById('room-date-search'), event.target.id);
  }
});

document.addEventListener('change', (event) => {
  if (event.target.id === 'room-choice' || event.target.id === 'room-date-search') {
    searchRoomsForCustomer();
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
      addUserBookings();
    })
    .catch((err) => console.log(err.message));
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
    return new Room(room.number, room.roomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight);
  });
  return allRooms;
}

function instantiateBookings(bookingData) {
  const allBookings = bookingData.map((booking) => {
    return new Booking(booking.id, booking.userID, booking.date, booking.roomNumber);
  });
  return allBookings;
}

function addUserBookings() {
  data.hotel.bookings.forEach((booking) => {
    data.customerRepo.customers.forEach((customer) => {
      if (booking.userID === customer.id) {
        customer.addBooking(booking);
      }
    });
  });
}

function loginClicked(event) {
  event.preventDefault();
  const enteredUsername = document.getElementById('username').value;
  const enteredPassword = document.getElementById('password').value;
  let customersID = data.customerRepo.getCustomerID(enteredUsername);
  if (enteredUsername === 'manager' && enteredPassword === data.hotel.manager.password) {
    loginManager();
  } else if (customersID && isPasswordCorrect(customersID, enteredPassword)) {
    loginCustomer(customersID);
  } else {
    dom.changeInnerTextID('error-msg', 'Incorrect Username or Password');
  }
}

function loginManager() {
  //some dom updates
  currentUser = data.hotel.manager;
  console.log(currentUser);
}

function loginCustomer(id) {
  //some dom updates
  currentUser = data.customerRepo.findCustomer(id);
  dom.renderCustomerPage(currentUser, data.hotel);
  console.log(currentUser);
}

function isPasswordCorrect(userID, givenPassword) {
  return data.customerRepo.customers.some((customer) => {
    return userID === customer.id && givenPassword === customer.password;
  });
}

function searchRoomsForCustomer() {
  console.log(document.getElementById('room-date-search').value);
  let chosenDate = document.getElementById('room-date-search').value;
  chosenDate = chosenDate.replace(/-/g, '/');
  const chosenRoomType = document.getElementById('room-choice').value;
  dom.displayAvailableRooms(data.hotel, chosenDate, chosenRoomType);
}

function bookThisRoom(userID, date, roomNumber) {}
