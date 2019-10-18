// import { Template } from 'meteor/templating';
// import ErrorStyles from './../../../../utils/errorStyles';
// import Loader from './../../../../utils/loader';
// import moment from 'moment';
// import * as EmailValidator from 'email-validator';

// const { addLoader, removeLoader } = new Loader();

// const {
//   removeStyles,
//   addErrOutline,
//   addErrClass,
//   addSuccessOutline,
//   addSuccessClass
// } = new ErrorStyles();

// Template.filterUser.onRendered(function() {
//   Meteor.subscribe('Meteor.users');
// });

// Template.filterUser.helpers({
//   allUsers() {
//     let usersTable = Meteor.users.find({}).fetch();
//     usersTable = usersTable.filter(e => e.is_admin === false);
//     usersTable.forEach(e => {
//       e.createdAt = moment(e.createdAt).format('ll');
//     });
//     return usersTable;
//   },

//   increment(i) {
//     return i + 1;
//   }
// });

// Template.filterUser.events({
//   'click .changeStatus': function(e) {
//     const id = e.currentTarget.id;
//     addLoader(`${id}userStatus`);
//     Meteor.call('UserStatusMethod', id);
//   }
// });

// Template.leftPanel.helpers({
//   getCurrentUser() {
//     const id = FlowRouter.getParam('id');
//     return Meteor.users.find({ user_id: id }).fetch();
//   }
// });

// Template.leftPanel.events({
//   'submit .deleteUserForm': function(e) {
//     e.preventDefault();
//     removeStyles('checkDeleteUserMessage');
//     const id = FlowRouter.getParam('id');
//     Meteor.call('deleteUserMethod', id, function(err, result) {
//       if (err) {
//         addErrClass('checkDeleteUserMessage');
//         setTimeout(() => {
//           removeStyles('checkDeleteUserMessage');
//         }, 2000);
//       } else {
//         addSuccessClass('checkDeleteUserMessage');
//         setTimeout(() => {
//           removeStyles('checkDeleteUserMessage');
//           $('#deleteUserModal .close').click();
//         }, 300);
//       }
//     });
//   },

//   'submit .editUserForm': function(e) {
//     e.preventDefault();
//     const id = FlowRouter.getParam('id');
//     const userName = e.target.querySelector('#userName').value;
//     const mobile_number = e.target.querySelector('#mobile_number').value;
//     const Location = e.target.querySelector('#Location').value;
//     removeStyles('checkEditUserInput');
//     removeStyles('checkEditUserMessage');
//     removeStyles('checkEditUserNameInvalidMessage');
//     removeStyles('checkEditUserNameNumberMessage');
//     removeStyles('checkEditUserMessage');
//     removeStyles('checkEditUserMessage');

//     if (userName.replace(/[^\w]/g, '') === '') {
//       addErrOutline('checkEditUserNameInput');
//       addErrClass('checkEditUserNameInvalidMessage');
//       setTimeout(() => {
//         removeStyles('checkEditUserNameInput');
//         removeStyles('checkEditUserNameInvalidMessage');
//       }, 2000);
//     } else if (!isNaN(userName)) {
//       addErrOutline('checkEditUserNameInput');
//       addErrClass('checkEditUserNameNumberMessage');
//       setTimeout(() => {
//         removeStyles('checkEditUserNameInput');
//         removeStyles('checkEditUserNameNumberMessage');
//       }, 2000);
//     } else if (isNaN(mobile_number)) {
//       addErrOutline('checkEditUserPhoneInput');
//       addErrClass('checkEditUserPhoneNumberMessage');
//       setTimeout(() => {
//         removeStyles('checkEditUserPhoneInput');
//         removeStyles('checkEditUserPhoneNumberMessage');
//       }, 2000);
//     } else if (mobile_number.replace(/[^\w]/g, '') === '') {
//       addErrOutline('checkEditUserPhoneInput');
//       addErrClass('checkEditUserPhoneInvalidMessage');
//       setTimeout(() => {
//         removeStyles('checkEditUserPhoneInput');
//         removeStyles('checkEditUserPhoneInvalidMessage');
//       }, 2000);
//     } else {
//       Meteor.call(
//         'editUserMethod',
//         userName,
//         mobile_number,
//         Location,
//         id,
//         function(err, result) {
//           if (err) {
//             addErrOutline('checkEditUserPhoneInput');
//             addErrClass('checkEditUserMessage');
//             setTimeout(() => {
//               removeStyles('checkEditUserPhoneInput');
//               removeStyles('checkEditUserMessage');
//             }, 2000);
//           } else {
//             addSuccessOutline('checkEditUserPhoneInput');
//             addSuccessClass('checkEditUserMessage');
//             setTimeout(() => {
//               removeStyles('checkEditUserPhoneInput');
//               removeStyles('checkEditUserMessage');
//               $('#editUserModal .close').click();
//             }, 300);
//           }
//         }
//       );
//     }
//   },

//   'submit .addUserForm': function(e) {
//     e.preventDefault();

//     const userName = e.target.querySelector('#newUserName').value;
//     const email = e.target.querySelector('#newEmail').value;
//     const mobile_number = e.target.querySelector('#newMobile_number').value;
//     const Location = e.target.querySelector('#newLocation').value;

//     removeStyles('checkAddUserInput');
//     removeStyles('checkAddUserNameInput');
//     removeStyles('checkAddUserMessage');
//     removeStyles('checkAddUserNameNumberMessage');
//     removeStyles('checkAddUserNameInvalidMessage');

//     if (userName.replace(/[^\w]/g, '') === '') {
//       addErrOutline('checkAddUserNameInput');
//       addErrClass('checkAddUserNameInvalidMessage');
//       setTimeout(() => {
//         removeStyles('checkAddUserNameInput');
//         removeStyles('checkAddUserNameInvalidMessage');
//       }, 2000);
//     } else if (!isNaN(userName)) {
//       addErrOutline('checkAddUserNameInput');
//       addErrClass('checkAddUserNameNumberMessage');
//       setTimeout(() => {
//         removeStyles('checkAddUserNameInput');
//         removeStyles('checkAddUserNameNumberMessage');
//       }, 2000);
//     } else if (!EmailValidator.validate(email)) {
//       addErrOutline('checkAddUserEmailInput');
//       addErrClass('checkAddUserEmailInvalidMessage');
//       setTimeout(() => {
//         removeStyles('checkAddUserEmailInput');
//         removeStyles('checkAddUserEmailInvalidMessage');
//       }, 2000);
//     } else if (isNaN(mobile_number)) {
//       addErrOutline('checkAddUserPhoneInput');
//       addErrClass('checkAddUserPhoneInvalidMessage');
//       setTimeout(() => {
//         removeStyles('checkAddUserPhoneInput');
//         removeStyles('checkAddUserPhoneInvalidMessage');
//       }, 2000);
//     } else if (mobile_number.replace(/[^\w]/g, '') === '') {
//       addErrOutline('checkAddUserPhoneInput');
//       addErrClass('checkAddUserPhoneInvalidMessage');
//       setTimeout(() => {
//         removeStyles('checkAddUserPhoneInput');
//         removeStyles('checkAddUserPhoneInvalidMessage');
//       }, 2000);
//     } else {
//       Meteor.call(
//         'addUserMethod',
//         userName,
//         email,
//         mobile_number,
//         Location,
//         function(err, result) {
//           if (err) {
//             if (err.details === 'email error') {
//               addErrOutline('checkAddUserEmailInput');
//               addErrClass('checkAddUserEmailMessage');
//               setTimeout(() => {
//                 removeStyles('checkAddUserEmailInput');
//                 removeStyles('checkAddUserEmailMessage');
//               }, 2000);
//             } else if (err.details === 'mob error') {
//               addErrOutline('checkAddUserPhoneInput');
//               addErrClass('checkAddUserPhoneMessage');
//               setTimeout(() => {
//                 removeStyles('checkAddUserPhoneInput');
//                 removeStyles('checkAddUserPhoneMessage');
//               }, 2000);
//             }
//           } else {
//             addSuccessOutline('checkAddUserInput');
//             addSuccessClass('checkAddUserMessage');
//             setTimeout(() => {
//               removeStyles('checkAddUserInput');
//               removeStyles('checkAddUserMessage');
//               e.target.querySelector('#newUserName').value = '';
//               e.target.querySelector('#newEmail').value = '';
//               e.target.querySelector('#newMobile_number').value = '';
//               e.target.querySelector('#newLocation').value = '';
//               $('#AddUserModal .close').click();
//             }, 300);
//           }
//         }
//       );
//     }
//   }
// });
