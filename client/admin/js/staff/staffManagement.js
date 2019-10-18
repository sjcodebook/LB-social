import { Template } from 'meteor/templating';
import Loader from './../../../../utils/loader';
import moment from 'moment';

const { addLoader, removeLoader } = new Loader();

Template.staffManagement.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('Meteor.users', { sort: { created_at: -1 } });
  });
});

Template.staffManagement.helpers({
  allUsers() {
    let usersTable = Meteor.users.find({}).fetch();
    usersTable = usersTable
      .filter(e => e.is_admin === false)
      .filter(e => e.is_subadmin === true);
    usersTable.forEach(e => {
      e.created_at = moment(e.created_at).format('ll');
    });
    return usersTable;
  },

  increment(i) {
    return i + 1;
  }
});

Template.staffManagement.events({
  'click .changeStatus': function(e) {
    const id = e.currentTarget.id;
    addLoader(`${id}userStatus`);
    Meteor.call('UserStatusMethod', id);
  }
});
