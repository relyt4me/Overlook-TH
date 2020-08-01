function fetchData() {
  let usersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then((response) => response.json())
    .then((data) => {
      return data.users;
    })
    .catch((err) => console.log(err.message));
  let roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then((response) => response.json())
    .then((data) => {
      return data.rooms;
    })
    .catch((err) => console.log(err.message));
  let bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then((response) => response.json())
    .then((data) => {
      return data.bookings;
    })
    .catch((err) => console.log(err.message));
  return Promise.all([usersData, roomsData, bookingsData]).then((data) => {
    let allData = {};
    allData.usersData = data[0];
    allData.roomsData = data[1];
    allData.bookingsData = data[2];
    return allData;
  });
}

export default fetchData;
