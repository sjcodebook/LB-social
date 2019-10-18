import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import ErrorStyles from './../../../../utils/errorStyles';
import multiSelectArray from './../../../../utils/multiselectArr';
import * as EmailValidator from 'email-validator';
import Loader from './../../../../utils/loader';
import uuidv4 from 'uuid/v4';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.addStaff.events({
  'submit .addStaffForm': function(e) {
    e.preventDefault();

    let userName = e.target.querySelector('#newStaffName').value,
      employee_id = e.target.querySelector('#newStaffId').value,
      email = e.target.querySelector('#newStaffEmail').value,
      mobile_number = e.target.querySelector('#newStaffMobile_number').value,
      rights = multiSelectArray('newStaffRights');

    email = email.trim().toLowerCase();
    userName = userName.trim();
    employee_id = employee_id.trim();
    mobile_number = mobile_number.trim();

    if (userName.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddStaffNameInput');
      addErrClass('checkAddStaffNameInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddStaffNameInput');
        removeStyles('checkAddStaffNameInvalidMessage');
      }, 2000);
    } else if (!isNaN(userName)) {
      addErrOutline('checkAddStaffNameInput');
      addErrClass('checkAddStaffNameNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddStaffNameInput');
        removeStyles('checkAddStaffNameNumberMessage');
      }, 2000);
    } else if (employee_id.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddStaffIdInput');
      addErrClass('checkAddStaffIdInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddStaffIdInput');
        removeStyles('checkAddStaffIdInvalidMessage');
      }, 2000);
    } else if (!EmailValidator.validate(email)) {
      addErrOutline('checkAddStaffEmailInput');
      addErrClass('checkAddStaffEmailInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddStaffEmailInput');
        removeStyles('checkAddStaffEmailInvalidMessage');
      }, 2000);
    } else if (mobile_number.length < 10) {
      addErrOutline('checkAddStaffPhoneInput');
      addErrClass('checkAddStaffPhoneInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddStaffPhoneInput');
        removeStyles('checkAddStaffPhoneInvalidMessage');
      }, 2000);
    } else if (isNaN(mobile_number)) {
      addErrOutline('checkAddStaffPhoneInput');
      addErrClass('checkAddStaffPhoneInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddStaffPhoneInput');
        removeStyles('checkAddStaffPhoneInvalidMessage');
      }, 2000);
    } else if (mobile_number.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddStaffPhoneInput');
      addErrClass('checkAddStaffPhoneMessage');
      setTimeout(() => {
        removeStyles('checkAddStaffPhoneInput');
        removeStyles('checkAddStaffPhoneMessage');
      }, 2000);
    } else {
      addLoader('addStaffLineLoader');
      const id = uuidv4();
      Meteor.call(
        'addStaffMethod',
        id,
        userName,
        employee_id,
        email,
        mobile_number,
        rights,
        function(err, result) {
          if (err) {
            removeLoader('addStaffLineLoader');
            if (err.details === 'email error') {
              addErrOutline('checkAddStaffEmailInput');
              addErrClass('checkAddStaffEmailMessage');
              setTimeout(() => {
                removeStyles('checkAddStaffEmailInput');
                removeStyles('checkAddStaffEmailMessage');
              }, 2000);
            } else if (err.details === 'id error') {
              addErrOutline('checkAddStaffIdInput');
              addErrClass('checkAddStaffIdMessage');
              setTimeout(() => {
                removeStyles('checkAddStaffIdInput');
                removeStyles('checkAddStaffIdMessage');
              }, 2000);
            }
          } else {
            removeLoader('addStaffLineLoader');
            window.location = '/staffmanagement';
          }
        }
      );
    }
  }
});
