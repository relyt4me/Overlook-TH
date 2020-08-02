const chai = require('chai');
import { expect } from 'chai';
import DomManipulation from '../src/DomManipulation';
const spies = require('chai-spies');
chai.use(spies);

describe.only('DomUpdates', () => {
  let domUpdater;

  before(() => {});

  beforeEach(() => {
    domUpdater = new DomManipulation();
    global.document = {};
    chai.spy.on(document, ['getElementById', 'querySelectorAll'], () => {
      return { innerText: '' };
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

  it('should call getElementByID with the correct arguments in changeClassList', () => {
    domUpdater.changeClassList('full-body', 'HELLO');

    expect(document.getElementById).to.have.been.called.with('full-body');
  });

  it('should call querySelectorAll with the correct arguments in hideSection', () => {
    domUpdater.hideSection('cst-item', 'HELLO');

    expect(document.querySelectorAll).to.have.been.called.with('cst-item');
  });

  it('should call querySelectorAll with the correct arguments in unhideSection', () => {
    domUpdater.unhideSection('cst-item', 'HELLO');

    expect(document.querySelectorAll).to.have.been.called.with('cst-item');
  });

  // it('should call getElementById each time changeInnerTextID is called in XXXX') {

  // }

  // it('should call getElementById each time changeInnerTextID is called in XXXX') {

  // }

  // it('should call getElementById each time changeInnerTextID is called in XXXX') {

  // }

  // it('should call getElementById each time changeInnerTextID is called in XXXX') {

  // }

  // it('Should call call getElementById each time changeInnerTextID is called with populateUserWidget', () => {
  //   domUpdates.populateUserWidget(currentUser, sleepRepo, activityRepo, mostRecentDate);

  //   expect(document.getElementById).to.have.been.called(10);
  // });

  // it('Should call call getElementById each time changeInnerTextID is called with populateTodayInfo', () => {
  //   domUpdates.populateTodayInfo(currentUser, sleepRepo, hydrationRepo, activityRepo, mostRecentDate);

  //   expect(document.getElementById).to.have.been.called(7);
  // });

  // it('Should call call getElementById each for each cell in a column', () => {
  //   const weekInformation = [
  //     { date: '2019/06/15', amount: 38, unit: 'oz' },
  //     { date: '2019/06/16', amount: 91, unit: 'oz' },
  //     { date: '2019/06/17', amount: 96, unit: 'oz' },
  //     { date: '2019/06/18', amount: 70, unit: 'oz' },
  //     { date: '2019/06/19', amount: 76, unit: 'oz' },
  //     { date: '2019/06/20', amount: 71, unit: 'oz' },
  //     { date: '2019/06/21', amount: 27, unit: 'oz' },
  //   ];

  //   domUpdates.fillColumn('h', weekInformation);

  //   expect(document.getElementById).to.have.been.called(7);
  // });

  // it('Should know the day of the week based on the date given', () => {
  //   expect(domUpdates.getStringOfWeekday('2020/07/26')).to.eql('Sunday');
  //   expect(domUpdates.getStringOfWeekday('2020/07/28')).to.eql('Tuesday');
  // });

  // it('Should call getElementById correctly once to create the friend-card', () => {
  //   domUpdates.populateFriendsCard(currentUser, userRepo, activityRepo, mostRecentDate);

  //   expect(document.getElementById).to.have.been.called(1);
  //   expect(document.getElementById).to.have.been.called.with('friend-list');
  // });

  // it('Should call call getElementById each time changeInnerTextID is called with populateLeaderBoard', () => {
  //   domUpdates.populateLeaderBoard(userRepo, sleepRepo, activityRepo, mostRecentDate, sleepRepo.sleepData);

  //   expect(document.getElementById).to.have.been.called(8);
  // });
});