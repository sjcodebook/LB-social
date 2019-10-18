import { Template } from 'meteor/templating';
import moment from 'moment';

Template.viewUser.onRendered(function() {
  const id = FlowRouter.getParam('id');
  Meteor.subscribe('viewUsers', id);
});

Template.viewUser.helpers({
  userById() {
    const id = FlowRouter.getParam('id');
    let usersView = Meteor.users.find({ user_id: id }).fetch();
    usersView.forEach(e => {
      e.createdAt = moment(e.createdAt).format('ll');
    });
    return usersView;
  }
});
