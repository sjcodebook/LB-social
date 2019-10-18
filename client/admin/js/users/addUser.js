import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import ErrorStyles from './../../../../utils/errorStyles';
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

Template.addUser.events({
  'submit .addUserForm': function(e) {
    e.preventDefault();

    let userName = e.target.querySelector('#newUserName').value,
      email = e.target.querySelector('#newEmail').value,
      mobile_number = e.target.querySelector('#newMobile_number').value,
      Organisation = e.target.querySelector('#newOrganisation').value,
      Designation = e.target.querySelector('#newDesignation').value,
      Experience = e.target.querySelector('#newExperience').value,
      entered_location = e.target.querySelector('#newLocation').value,
      city = $('#city').val(),
      state = $('#state').val(),
      country = $('#country').val(),
      lat = $('#lat').val(),
      lng = $('#lng').val(),
      formatted_address = $('#formatted_address').val(),
      place_id = $('#place_id').val();

    email = email.trim().toLowerCase();
    Organisation = Organisation.trim();
    Designation = Designation.trim();
    Experience = Experience.trim();
    entered_location = entered_location.trim();

    Organisation = Organisation.toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

    Designation = Designation.toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

    if (userName.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddUserNameInput');
      addErrClass('checkAddUserNameInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddUserNameInput');
        removeStyles('checkAddUserNameInvalidMessage');
      }, 2000);
    } else if (!isNaN(userName)) {
      addErrOutline('checkAddUserNameInput');
      addErrClass('checkAddUserNameNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddUserNameInput');
        removeStyles('checkAddUserNameNumberMessage');
      }, 2000);
    } else if (Organisation.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddUserOrganisationInput');
      addErrClass('checkAddUserOrganisationInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddUserOrganisationInput');
        removeStyles('checkAddUserOrganisationInvalidMessage');
      }, 2000);
    } else if (!isNaN(Organisation)) {
      addErrOutline('checkAddUserOrganisationInput');
      addErrClass('checkAddUserOrganisationMessage');
      setTimeout(() => {
        removeStyles('checkAddUserOrganisationInput');
        removeStyles('checkAddUserOrganisationMessage');
      }, 2000);
    } else if (Designation.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddUserDesignationInput');
      addErrClass('checkAddUserDesignationInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddUserDesignationInput');
        removeStyles('checkAddUserDesignationInvalidMessage');
      }, 2000);
    } else if (!isNaN(Designation)) {
      addErrOutline('checkAddUserDesignationInput');
      addErrClass('checkAddUserDesignationMessage');
      setTimeout(() => {
        removeStyles('checkAddUserDesignationInput');
        removeStyles('checkAddUserDesignationMessage');
      }, 2000);
    } else if (Experience.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddUserExperienceInput');
      addErrClass('checkAddUserExperienceInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddUserExperienceInput');
        removeStyles('checkAddUserExperienceInvalidMessage');
      }, 2000);
    } else if (isNaN(Experience)) {
      addErrOutline('checkAddUserExperienceInput');
      addErrClass('checkAddUserExperienceMessage');
      setTimeout(() => {
        removeStyles('checkAddUserExperienceInput');
        removeStyles('checkAddUserExperienceMessage');
      }, 2000);
    } else if (!EmailValidator.validate(email)) {
      addErrOutline('checkAddUserEmailInput');
      addErrClass('checkAddUserEmailInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddUserEmailInput');
        removeStyles('checkAddUserEmailInvalidMessage');
      }, 2000);
    } else if (isNaN(mobile_number)) {
      addErrOutline('checkAddUserPhoneInput');
      addErrClass('checkAddUserPhoneInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddUserPhoneInput');
        removeStyles('checkAddUserPhoneInvalidMessage');
      }, 2000);
    } else if (mobile_number.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddUserPhoneInput');
      addErrClass('checkAddUserPhoneInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddUserPhoneInput');
        removeStyles('checkAddUserPhoneInvalidMessage');
      }, 2000);
    } else {
      addLoader('addUserLineLoader');
      const id = uuidv4();
      Meteor.call(
        'addUserMethod',
        id,
        userName,
        email,
        Organisation,
        Designation,
        Experience,
        entered_location,
        mobile_number,
        city,
        state,
        country,
        lat,
        lng,
        formatted_address,
        place_id,
        function(err, result) {
          if (err) {
            removeLoader('addUserLineLoader');
            if (err.details === 'email error') {
              addErrOutline('checkAddUserEmailInput');
              addErrClass('checkAddUserEmailMessage');
              setTimeout(() => {
                removeStyles('checkAddUserEmailInput');
                removeStyles('checkAddUserEmailMessage');
              }, 2000);
            } else if (err.details === 'mob error') {
              addErrOutline('checkAddUserPhoneInput');
              addErrClass('checkAddUserPhoneMessage');
              setTimeout(() => {
                removeStyles('checkAddUserPhoneInput');
                removeStyles('checkAddUserPhoneMessage');
              }, 2000);
            }
          } else {
            $('#allUsersTable')
              .DataTable()
              .destroy();
            removeStyles('checkAddUserEmailMessage');
            addSuccessOutline('checkAddUserInput');
            addSuccessClass('checkAddUserMessage');
            setTimeout(() => {
              removeStyles('checkAddUserInput');
              removeStyles('checkAddUserMessage');
              $('#AddUserModal .close').click();
            }, 100);
            removeLoader('addUserLineLoader');
            window.location = '/usermanagement';
          }
        }
      );
    }
  }
});
