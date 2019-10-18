import { Template } from 'meteor/templating';
import Loader from './../../../../utils/loader';
import moment from 'moment';

const { addLoader, removeLoader } = new Loader();

Template.cms.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('cms');
  });
});

Template.cms.helpers({
  cms() {
    const cmsTable = cms.find({}).fetch();
    cmsTable.forEach(e => {
      e.created_at = moment(e.created_at).format('ll');
    });

    return cmsTable;
  }
});

Template.cms.events({
  'click .changeStatus': function(e) {
    const id = e.currentTarget.id;
    addLoader(`${id}cmsStatus`);
    Meteor.call('CmsStatusMethod', id);
  }
});
