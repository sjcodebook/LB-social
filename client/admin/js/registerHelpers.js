import { Template } from 'meteor/templating';

Template.registerHelper('keys', function keys(object) {
  return Object.keys(object);
});
Template.registerHelper('pick', function pick(key, object) {
  return object[key];
});

Template.registerHelper('currentRouteIs', function(route) {
  return FlowRouter.getRouteName() === route;
});

Template.registerHelper('is_allowed', function(name) {
  let is_allowed = false;
  const id = Meteor.userId(),
    Arr = [];
  let user = Meteor.users.find({ _id: id }).fetch();
  user = user[0].user_id;
  let rolesArr = roles.find({ user_id: user }).fetch();
  rolesArr.forEach(e => {
    let menu = mainMenu.find({ menu_id: e.menuId }).fetch();
    Arr.push(menu[0].menu_name);
  });
  Arr.forEach(e => {
    if (e === name) {
      is_allowed = true;
    }
  });
  return is_allowed;
});
