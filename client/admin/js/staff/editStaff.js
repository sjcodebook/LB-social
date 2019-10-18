import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import ErrorStyles from './../../../../utils/errorStyles';
import multiSelectArray from './../../../../utils/multiselectArr';
import Loader from './../../../../utils/loader';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.editStaff.onRendered(function() {
  Meteor.subscribe('Meteor.users');
  Meteor.subscribe('mainMenu');
  Meteor.subscribe('roles');
});

Template.editStaff.helpers({
  editStaffById() {
    const id = FlowRouter.getParam('id');
    const staff = Meteor.users.find({ user_id: id }).fetch();

    return staff;
  },

  fetchMenus() {
    const menusArr = mainMenu.find({}).fetch();
    return menusArr;
  },

  selectStatus(menuid) {
    const id = FlowRouter.getParam('id');
    let is_used = false,
      Arr = [];

    const rolesArr = roles.find({ user_id: id }).fetch();
    rolesArr.forEach(e => {
      Arr.push(e.menuId);
    });
    Arr.forEach(e => {
      if (e === menuid) {
        is_used = true;
      }
    });

    return is_used;
  }
});

Template.editStaff.events({
  'click #ShowEditStaffPassBtn': function(e) {
    let x = document.getElementById('editStaffPass');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  },

  'submit .editStaffForm': function(e) {
    e.preventDefault();

    let userName = e.target.querySelector('#editStaffName').value,
      employee_id = e.target.querySelector('#editStaffId').value,
      prev_employee_id = e.target.querySelector('#hiddenEditStaffId').value,
      mobile_number = e.target.querySelector('#editStaffMobile_number').value,
      rights = multiSelectArray('editStaffRights');

    userName = userName.trim();
    employee_id = employee_id.trim();
    prev_employee_id = prev_employee_id.trim();
    mobile_number = mobile_number.trim();

    if (userName.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditStaffNameInput');
      addErrClass('checkEditStaffNameInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditStaffNameInput');
        removeStyles('checkEditStaffNameInvalidMessage');
      }, 2000);
    } else if (!isNaN(userName)) {
      addErrOutline('checkEditStaffNameInput');
      addErrClass('checkEditStaffNameNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditStaffNameInput');
        removeStyles('checkEditStaffNameNumberMessage');
      }, 2000);
    } else if (employee_id.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditStaffIdInput');
      addErrClass('checkEditStaffIdInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditStaffIdInput');
        removeStyles('checkEditStaffIdInvalidMessage');
      }, 2000);
    } else if (isNaN(mobile_number)) {
      addErrOutline('checkEditStaffPhoneInput');
      addErrClass('checkEditStaffPhoneInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditStaffPhoneInput');
        removeStyles('checkEditStaffPhoneInvalidMessage');
      }, 2000);
    } else if (mobile_number.length < 10) {
      addErrOutline('checkEditStaffPhoneInput');
      addErrClass('checkEditStaffPhoneInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditStaffPhoneInput');
        removeStyles('checkEditStaffPhoneInvalidMessage');
      }, 2000);
    } else if (mobile_number.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditStaffPhoneInput');
      addErrClass('checkEditStaffPhoneMessage');
      setTimeout(() => {
        removeStyles('checkEditStaffPhoneInput');
        removeStyles('checkEditStaffPhoneMessage');
      }, 2000);
    } else {
      addLoader('editStaffLineLoader');
      const id = FlowRouter.getParam('id');
      Meteor.call(
        'editStaffMethod',
        id,
        userName,
        employee_id,
        prev_employee_id,
        mobile_number,
        rights,
        function(err, result) {
          if (err) {
            removeLoader('editStaffLineLoader');
            addErrOutline('checkEditStaffIdInput');
            addErrClass('checkEditStaffIdMessage');
            setTimeout(() => {
              removeStyles('checkEditStaffIdInput');
              removeStyles('checkEditStaffIdMessage');
            }, 2000);
          } else {
            removeLoader('editStaffLineLoader');
            window.location = '/staffmanagement';
          }
        }
      );
    }
  }
});
