import { Template } from 'meteor/templating';
import ErrorStyles from './../../../../utils/errorStyles';
import Loader from './../../../../utils/loader';
import moment from 'moment';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.audiovideoManagement.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('Media');
  });
});

Template.audiovideoManagement.helpers({
  allAV() {
    let mediaTable = Media.find({}).fetch();
    mediaTable.forEach(e => {
      e.created_at = moment(e.created_at).format('ll');
    });
    mediaTable.forEach(e => {
      e.DescriptionText = e.DescriptionText.substring(0, 20) + '...';
    });
    return mediaTable;
  },

  increment(i) {
    return i + 1;
  },

  contentType(type) {
    if (type === 'Video') {
      return true;
    } else {
      return false;
    }
  }
});

Template.audiovideoManagement.events({
  'click .changeStatus': function(e) {
    const id = e.currentTarget.id;
    addLoader(`${id}mediaStatus`);
    Meteor.call('MediaStatusMethod', id);
  }
});
