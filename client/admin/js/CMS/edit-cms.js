import { Template } from 'meteor/templating';

Template.editCms.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('cms');
  });
});
