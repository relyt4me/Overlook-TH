class DomUManipulation {
  changeInnerTextID(id, text) {
    document.getElementById(id).innerText = text;
  }

  changeInnerHtmlID(id, html) {
    document.getElementById(id).innerHTML = html;
  }

  changeClassList(id, classes) {
    document.getElementById(id).className = classes;
  }

  viewSections(className, isHidden) {
    const allOfSection = document.querySelectorAll(className);
    allOfSection.forEach((section) => {
      section.hidden = isHidden;
    });
  }

  renderCustomerPage(customer, hotel) {
    this.changeClassList('full-body', 'customer-page');
    this.viewSections('.lgn-item', true);
    this.viewSections('.cst-item', false);
    this.viewSections('.mgr-item', true);
    this.changeInnerTextID('total-spent-by-user', hotel.getBookingsTotalCost(customer.bookings));
    this.displayCustomerBookings(customer);
  }

  displayCustomerBookings(customer) {
    this.changeInnerHtmlID('available-rooms', this.bookingsAsList(customer.bookings));
  }

  bookingsAsList(bookings) {
    const sortedBookings = this.getSortedBookings(bookings);
    const listOfBookings = sortedBookings.map((booking) => {
      return `<li id="${booking.id}" class="room-card">
          <img src="./images/luggage.png" alt="Luggage Icon" />
          <p class="room-info">Booked Room #${booking.roomNumber} for ${booking.date}</p>
        </li>`;
    });
    return listOfBookings.join('');
  }

  getSortedBookings(bookings) {
    return bookings.sort((bookingA, bookingB) => {
      let dateA = parseInt(bookingA.date.split('/').join(''));
      let dateB = parseInt(bookingB.date.split('/').join(''));
      return dateB - dateA;
    });
  }

  displayAvailableRooms(hotel, date, type) {
    const availableRooms = hotel.getAvailableRoomTypeAndDate(date, type);
    const roomsAsHtml = availableRooms.map((room) => {
      const hasBidet = room.hasBidet ? '✅' : '❌';
      return `<li id="room-${room.number}" class="room-card">
          <img src="./images/luggage.png" alt="Luggage Icon" />
          <p class="room-info">${room.numBeds} ${room.bedSize} $${room.costPerNight} Bidet ${hasBidet}</p>
          <button class="book-room-button" id="${room.number}">Book #${room.number}</button>
        </li>`;
    });
    this.changeInnerHtmlID('available-rooms', roomsAsHtml.join(''));
    if (availableRooms.length === 0) {
      this.changeInnerHtmlID('available-rooms', '<h1 style="color: red">No Rooms Available, Please Pick Another Date</h1>');
    }
  }

  renderManagerPage(startingCustomer, hotel, todaysDate) {
    this.changeClassList('full-body', 'manager-page');
    this.viewSections('.lgn-item', true);
    this.viewSections('.cst-item', true);
    this.viewSections('.mgr-item', false);
    this.viewSections('.search-err-msg', true);
    this.changeInnerTextID('searched-customer-name', startingCustomer.name);
    this.changeInnerTextID('sch-cust-spent', hotel.getBookingsTotalCost(startingCustomer.bookings));
    this.populateStatsDisplay(hotel, todaysDate);
    this.displayCustomersCurrentReservations(startingCustomer, todaysDate);
  }

  displayCustomersCurrentReservations(customer, todaysDate) {
    this.viewSections('.current-customer-bookings', false);
    this.viewSections('.add-booking-current-customer', true);
    const sortedCustomerBookings = this.getSortedBookings(customer.bookings);
    const dateToCompare = parseInt(todaysDate.split('/').join(''));
    const innerHTMLOfBookings = sortedCustomerBookings.map((booking) => {
      let futureBooking = dateToCompare < parseInt(booking.date.split('/').join('')) ? '' : 'hidden';
      return `<li class="user-booking" id="${booking.id}-booking">
          <p>Room ${booking.roomNumber} ${booking.date}</p>
          <button id="${booking.id}" ${futureBooking}>Remove</button>
        </li>`;
    });
    this.changeInnerHtmlID('user-bookings', innerHTMLOfBookings.join(''));
  }

  displayMgrAddBooking() {
    this.viewSections('.current-customer-bookings', true);
    this.viewSections('.add-booking-current-customer', false);
  }

  populateStatsDisplay(hotel, date) {
    this.changeInnerTextID('rooms-available', hotel.getAvailableRooms(date).length);
    this.changeInnerTextID('hotel-capacity', hotel.getPercentOccupied(date));
    this.changeInnerTextID('todays-revenue', hotel.getRevenueForDay(date));
  }

  displayNoCustomerFound() {
    this.viewSections('.search-err-msg', false);
    this.viewSections('.searched-customer-name', true);
  }
}

export default DomUManipulation;
