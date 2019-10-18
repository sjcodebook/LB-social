import { Template } from 'meteor/templating';

Template.CMSlayout.onRendered(function() {
  Meteor.subscribe('cms');
});

Template.CMSlayout.helpers({
  cmsPagesCont() {
    const name = FlowRouter.getParam('name');
    return cms.find({ cms_type: name }).fetch();
  }
});
