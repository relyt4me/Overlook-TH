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
let dom, currentUser, searchedCustomer;

window.onload = startApp();

document.addEventListener('click', (event) => {
  if (event.target.id === 'login-button') {
    loginClicked(event);
  } else if (event.target.id === 'view-my-bookings') {
    event.preventDefault();
    dom.displayCustomerBookings(currentUser);
  } else if (event.target.className === 'book-room-button') {
    bookThisRoom(currentUser.id, document.getElementById('room-date-search').value, event.target.id);
  } else if (event.target.id === 'show-current-customer-info') {
    dom.displayCustomersCurrentReservations(searchedCustomer, '2020/08/04');
  } else if (event.target.id === 'show-add-customer-booking') {
    dom.displayMgrAddBooking();
  } else if (event.target.id === 'customer-search-btn') {
    event.preventDefault();
    customerSearchClicked();
  } else if (event.target.id === 'booking-submit-button') {
    event.preventDefault();
    bookRoomByManager();
  } else if (event.target.className === 'remove-booking-btn') {
    deleteRoomByManager(event);
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
  currentUser = data.hotel.manager;
  searchedCustomer = data.customerRepo.customers[0];
  dom.renderManagerPage(searchedCustomer, data.hotel, '2020/08/04');
}

function loginCustomer(id) {
  currentUser = data.customerRepo.findCustomer(id);
  dom.renderCustomerPage(currentUser, data.hotel);
}

function isPasswordCorrect(userID, givenPassword) {
  return data.customerRepo.customers.some((customer) => {
    return userID === customer.id && givenPassword === customer.password;
  });
}

function searchRoomsForCustomer() {
  let chosenDate = document.getElementById('room-date-search').value;
  chosenDate = chosenDate.replace(/-/g, '/');
  const chosenRoomType = document.getElementById('room-choice').value;
  dom.displayAvailableRooms(data.hotel, chosenDate, chosenRoomType);
}

function bookThisRoom(userID, date, roomNumber) {
  let chosenDate = date.replace(/-/g, '/');
  data.hotel.manager
    .createBooking(userID, chosenDate, roomNumber)
    .then(() => fetchData())
    .then((allData) => {
      data.customerRepo = new UserRepo(allData.usersData);
      data.hotel = instantiateHotel(allData.roomsData, allData.bookingsData);
    })
    .then(() => {
      addUserBookings();
      currentUser = data.customerRepo.findCustomer(userID);
      dom.displayCustomerBookings(currentUser);
    })
    .catch((err) => console.log(err.message));
}

function customerSearchClicked() {
  const matchingCustomer = data.customerRepo.findCustomerByName(document.getElementById('customer-name').value);
  if (matchingCustomer) {
    searchedCustomer = matchingCustomer;
    dom.renderManagerPage(searchedCustomer, data.hotel, '2020/08/04');
  } else {
    dom.displayNoCustomerFound();
  }
}

function bookRoomByManager() {
  const desiredDate = document.getElementById('booking-date').value.replace(/-/g, '/');
  const desiredRoom = parseInt(document.getElementById('booking-room-num').value);
  if (data.hotel.isRoomAvailable(desiredDate, desiredRoom)) {
    data.hotel.manager
      .createBooking(searchedCustomer.id, desiredDate, desiredRoom)
      .then(() => fetchData())
      .then((allData) => {
        data.customerRepo = new UserRepo(allData.usersData);
        data.hotel = instantiateHotel(allData.roomsData, allData.bookingsData);
      })
      .then(() => {
        addUserBookings();
        currentUser = data.hotel.manager;
        dom.changeInnerTextID('booking-availability-message', 'Booked!');
      })
      .catch((err) => console.log(err.message));
  } else {
    dom.changeInnerTextID('booking-availability-message', 'Unavailable');
  }
}

function deleteRoomByManager(event) {
  const bookingID = parseInt(event.target.id);
  data.hotel.manager
    .removeBooking(bookingID)
    .then(() => fetchData())
    .then((allData) => {
      data.customerRepo = new UserRepo(allData.usersData);
      data.hotel = instantiateHotel(allData.roomsData, allData.bookingsData);
    })
    .then(() => {
      addUserBookings();
      currentUser = data.hotel.manager;
      dom.displayCustomersCurrentReservations(searchedCustomer, '2020/08/04');
    })
    .catch((err) => console.log(err.message));
}
