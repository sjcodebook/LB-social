import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import ErrorStyles from './../../../utils/errorStyles';
import Loader from './../../../utils/loader';
import * as EmailValidator from 'email-validator';
import uuidv4 from 'uuid/v4';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.leftPanel.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('Meteor.users');
    self.subscribe('mainMenu');
    self.subscribe('roles');
  });
});

Template.leftPanel.helpers({
  is_subadmin() {
    const id = Meteor.userId();
    let user = Meteor.users.find({ _id: id }).fetch();
    user = user[0].is_subadmin;

    if (user === true) {
      return true;
    } else {
      return false;
    }
  },

  menuItems() {
    const id = Meteor.userId();
    const Arr = [];
    let user = Meteor.users.find({ _id: id }).fetch();
    user = user[0].user_id;
    let rolesArr = roles.find({ user_id: user }).fetch();

    rolesArr.forEach(e => {
      let menu = mainMenu.find({ menu_id: e.menuId }).fetch();
      Arr.push(menu[0]);
    });
    return Arr;
  },

  isPM(name) {
    if (name === 'Post Management') {
      return true;
    } else {
      return false;
    }
  },

  is_active() {
    const id = Meteor.userId();
    let user = Meteor.users.find({ _id: id }).fetch();
    user = user[0].is_active;

    if (user === true) {
      return true;
    } else {
      return false;
    }
  }
});

Template.leftPanel.helpers({
  getCurrentUser() {
    const id = FlowRouter.getParam('id');
    return Meteor.users.find({ user_id: id }).fetch();
  }
});

Template.leftPanel.events({
  'submit .deleteUserForm': function(e) {
    e.preventDefault();
    removeStyles('checkDeleteUserMessage');
    addLoader('submitDeleteUserBtn');
    const id = FlowRouter.getParam('id');
    Meteor.call('deleteUserMethod', id, function(err, result) {
      removeLoader('submitDeleteUserBtn');
      if (err) {
        addErrClass('checkDeleteUserMessage');
        setTimeout(() => {
          removeStyles('checkDeleteUserMessage');
        }, 2000);
      } else {
        $('#allUsersTable')
          .DataTable()
          .row('#' + id)
          .remove()
          .draw();
        addSuccessClass('checkDeleteUserMessage');
        setTimeout(() => {
          removeStyles('checkDeleteUserMessage');
          $('#deleteUserModal .close').click();
        }, 300);
      }
    });
  },

  'submit .editUserForm': function(e) {
    e.preventDefault();
    let id = FlowRouter.getParam('id'),
      userName = e.target.querySelector('#editUserName').value,
      mobile_number = e.target.querySelector('#editMobile_number').value,
      Organisation = e.target.querySelector('#editOrganisation').value,
      Designation = e.target.querySelector('#editDesignation').value,
      Experience = e.target.querySelector('#editExperience').value,
      entered_location = e.target.querySelector('#Location').value,
      city = $('#newcity').val(),
      state = $('#newstate').val(),
      country = $('#newcountry').val(),
      lat = $('#newlat').val(),
      lng = $('#newlng').val(),
      formatted_address = $('#newformatted_address').val(),
      place_id = $('#newplace_id').val();
    removeStylesArr = [
      'checkEditUserInput',
      'checkEditUserMessage',
      'checkEditUserNameInvalidMessage',
      'checkEditUserNameNumberMessage'
    ];

    removeStylesArr.forEach(e => {
      removeStyles(e);
    });

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
      addErrOutline('checkEditUserNameInput');
      addErrClass('checkEditUserNameInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditUserNameInput');
        removeStyles('checkEditUserNameInvalidMessage');
      }, 2000);
    } else if (!isNaN(userName)) {
      addErrOutline('checkEditUserNameInput');
      addErrClass('checkEditUserNameNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditUserNameInput');
        removeStyles('checkEditUserNameNumberMessage');
      }, 2000);
    } else if (Organisation.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditUserOrganisationInput');
      addErrClass('checkEditUserOrganisationInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditUserOrganisationInput');
        removeStyles('checkEditUserOrganisationInvalidMessage');
      }, 2000);
    } else if (!isNaN(Organisation)) {
      addErrOutline('checkEditUserOrganisationInput');
      addErrClass('checkEditUserOrganisationMessage');
      setTimeout(() => {
        removeStyles('checkEditUserOrganisationInput');
        removeStyles('checkEditUserOrganisationMessage');
      }, 2000);
    } else if (Designation.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditUserDesignationInput');
      addErrClass('checkEditUserDesignationInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditUserDesignationInput');
        removeStyles('checkEditUserDesignationInvalidMessage');
      }, 2000);
    } else if (!isNaN(Designation)) {
      addErrOutline('checkEditUserDesignationInput');
      addErrClass('checkEditUserDesignationMessage');
      setTimeout(() => {
        removeStyles('checkEditUserDesignationInput');
        removeStyles('checkEditUserDesignationMessage');
      }, 2000);
    } else if (Experience.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditUserExperienceInput');
      addErrClass('checkEditUserExperienceInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditUserExperienceInput');
        removeStyles('checkEditUserExperienceInvalidMessage');
      }, 2000);
    } else if (isNaN(Experience)) {
      addErrOutline('checkEditUserExperienceInput');
      addErrClass('checkEditUserExperienceMessage');
      setTimeout(() => {
        removeStyles('checkEditUserExperienceInput');
        removeStyles('checkEditUserExperienceMessage');
      }, 2000);
    } else if (isNaN(mobile_number)) {
      addErrOutline('checkEditUserPhoneInput');
      addErrClass('checkEditUserPhoneNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditUserPhoneInput');
        removeStyles('checkEditUserPhoneNumberMessage');
      }, 2000);
    } else if (mobile_number.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditUserPhoneInput');
      addErrClass('checkEditUserPhoneInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditUserPhoneInput');
        removeStyles('checkEditUserPhoneInvalidMessage');
      }, 2000);
    } else {
      addLoader('submitEditUserBtn');
      Meteor.call(
        'editUserMethod',
        id,
        userName,
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
          removeLoader('submitEditUserBtn');
          if (err) {
            addErrOutline('checkEditUserPhoneInput');
            addErrClass('checkEditUserMessage');
            setTimeout(() => {
              removeStyles('checkEditUserPhoneInput');
              removeStyles('checkEditUserMessage');
            }, 2000);
          } else {
            addSuccessOutline('checkEditUserInput');
            addSuccessClass('checkEditUserMessage');
            setTimeout(() => {
              removeStyles('checkEditUserInput');
              removeStyles('checkEditUserMessage');
              $('#editUserModal .close').click();
            }, 300);
          }
        }
      );
    }
  }
});
