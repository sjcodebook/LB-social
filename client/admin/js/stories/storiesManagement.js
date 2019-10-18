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

Template.storyManagement.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('story');
  });
});

Template.storyManagement.helpers({
  allStories() {
    let storiesTable = story.find({}).fetch();
    storiesTable.forEach(e => {
      e.created_at = moment(e.created_at).format('ll');
    });
    return storiesTable;
  },

  increment(i) {
    return i + 1;
  }
});

Template.storyManagement.events({
  'click .changeStatus': function(e) {
    const id = e.currentTarget.id;
    addLoader(`${id}storyStatus`);
    Meteor.call('StoryStatusMethod', id);
  }
});
