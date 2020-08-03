const chai = require('chai');
import { expect } from 'chai';
import DomManipulation from '../src/DomManipulation';
const spies = require('chai-spies');
chai.use(spies);

describe('DomUpdates', () => {
  let domUpdater, myElement, listOfSections;

  before(() => {});

  beforeEach(() => {
    domUpdater = new DomManipulation();
    global.document = {};
    myElement = { innerText: 'this', className: 'wonderbread' };
    listOfSections = [{ hidden: false }];
    chai.spy.on(document, ['getElementById'], () => {
      return myElement;
    });
    chai.spy.on(document, ['querySelectorAll'], () => {
      return listOfSections;
    });
  });

  it('should be a function', () => {
    expect(DomManipulation).to.be.a('function');
  });

  it('should be an instance of a DomManipulation', () => {
    expect(domUpdater).to.be.an.instanceOf(DomManipulation);
  });

  it('should call getElementByID with the correct arguments in changeInnerTextID', () => {
    domUpdater.changeInnerTextID('total-spent-by-user', 'HELLO');

    expect(document.getElementById).to.have.been.called.with('total-spent-by-user');
  });

  it('should be able to change the innerText of the element', () => {
    domUpdater.changeInnerTextID('total-spent-by-user', 'HELLO');

    expect(myElement.innerText).to.equal('HELLO');
  });

  it('should call getElementByID with the correct arguments in changeClassList', () => {
    domUpdater.changeClassList('full-body', 'HELLO');

    expect(document.getElementById).to.have.been.called.with('full-body');
  });

  it('should be able to change the classList of the element', () => {
    domUpdater.changeClassList('full-body', 'HELLO');

    expect(myElement.className).to.equal('HELLO');
  });

  it('should call querySelectorAll with the correct arguments in viewSections', () => {
    domUpdater.viewSections('.cst-item', true);

    expect(document.querySelectorAll).to.have.been.called.with('.cst-item');
  });

  it('should be able to hide all of the elements with viewSection', () => {
    domUpdater.viewSections('full-body', true);

    expect(listOfSections[0].hidden).to.equal(true);
  });

  it('should be able to sort bookings by date', () => {
    let firstBooking = {
      id: '5fwrgu4i7k55hl6sz',
      userID: 1,
      date: '2020/04/22',
      roomNumber: 15,
      roomServiceCharges: [],
    };
    let secondBooking = {
      id: '5fwrgu4i7k55hl6t6',
      userID: 1,
      date: '2020/01/10',
      roomNumber: 12,
      roomServiceCharges: [],
    };
    let thirdBooking = {
      id: '5fwrgu4i7k55hl6t7',
      userID: 1,
      date: '2020/02/16',
      roomNumber: 7,
      roomServiceCharges: [],
    };
    const allBookings = [firstBooking, secondBooking, thirdBooking];

    const sortedBookings = domUpdater.getSortedBookings(allBookings);

    expect(sortedBookings).to.eql([firstBooking, thirdBooking, secondBooking]);
  });
});
