import fetchData from './fetchAllData';
import UserRepo from './UserRepo';

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
