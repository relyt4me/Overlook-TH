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
    this.changeInnerHtmlID('available-rooms', this.bookingsAsList(customer.bookings));
  }

  bookingsAsList(bookings) {
    const listOfBookings = bookings.map((booking) => {
      return `<li id="${booking.id}" class="room-card">
          <img src="./images/luggage.png" alt="Luggage Icon" />
          <p class="room-info">Booked Room #${booking.roomNumber} for ${booking.date}</p>
        </li>`;
    });
    return listOfBookings.join('');
  }
}

export default DomUManipulation;
