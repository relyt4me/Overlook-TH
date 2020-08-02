import fetchData from './fetchAllData';
import UserRepo from './UserRepo';
import Manager from './Manager'
import Room from './Room'

const data = {
  customerRepo: null,
  hotel: null,
};

window.onload = startApp();

function startApp() {
  fetchData()
    .then((allData) => {
      data.customerRepo = new UserRepo(allData.usersData);
    })
    .then(() => {})
    .catch((err) => console.log(err.message));
}

instantiateManager() {
  return new Manager();
}

instantiateRooms() {

}
