import fetchData from './fetchAllData';
import UserRepo from './UserRepo';
import Manager from './Manager';
import Room from './Room';
import Booking from './Booking';
import Hotel from './Hotel';

const data = {
  customerRepo: null,
  hotel: null,
};

window.onload = startApp();

function startApp() {
  fetchData()
    .then((allData) => {
      data.customerRepo = new UserRepo(allData.usersData);
      data.hotel = instantiateHotel(allData.roomsData, allData.bookingsData);
    })
    .then(() => {
      console.log(data.customerRepo.findCustomer(70));
    })
    .catch((err) => console.log(err.message));
}

/*
click login 
  see if user name is manager
    if manager check password to be correct
      if correct
        make current user manager switch page to manager
      if not correct
        change text of input to 'Incorrect Username or Password
    if not manager >
      check if userName exist in user Repo
        if it does check if password is correct
          if correct
            make current user user from Id and change to customer page
          if not
            change text of the input to 'Incorrect Username or Password
        if does not change text of the input to 'Incorrect Username or Password'
*/

function loginClicked(event) {
  event.preventDefault();
  const enteredUsername = document.getElementById('username').value;
  const enteredPassword = document.getElementById('password').value;
  if (enteredUsername === 'manager') {
    enteredPassword === data.hotel.manager.password ? loginManager() : incorrectLogin();
  } else {
    let customersID = data.customerRepo.getCustomerID();
    customersID ? loginUser(data.customerRepo.findCustomer(customersID)) : incorrectLogin();
  }
}

function isPasswordCorrect(userID, givenPassword) {
  return data.customerRepo.customers.some((customer) => {
    return userID === customer.id && givenPassword === customer.password;
  });
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
