import { Template } from 'meteor/templating';
import ErrorStyles from './../../../../utils/errorStyles';
import Loader from './../../../../utils/loader';
import multiSelectArray from './../../../../utils/multiselectArr';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.addStory.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('story');
    // self.subscribe('StoryImages');
  });
});

Template.addStory.events({
  'submit .addStoryForm': function(e) {
    e.preventDefault();
    let Title = e.target.querySelector('#storyTitle').value,
      editorHtml = e.target.querySelector('.ql-editor').innerHTML,
      editorText = e.target.querySelector('.ql-editor').innerText,
      metaTags = multiSelectArray('story-tags'),
      metaDesc = e.target.querySelector('#storymetaDesc').value;

    Title = Title.trim();
    metaDesc = metaDesc.trim();

    if (Title.length >= 100) {
      addErrOutline('checkAddedStoryTitleInput');
      addErrClass('checkAddedStoryTitleLengthMessage');
      setTimeout(() => {
        removeStyles('checkAddedStoryTitleInput');
        removeStyles('checkAddedStoryTitleLengthMessage');
      }, 2000);
    } else if (Title.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedStoryTitleInput');
      addErrClass('checkAddedStoryTitleInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddedStoryTitleInput');
        removeStyles('checkAddedStoryTitleInvalidMessage');
      }, 2000);
    } else if (!isNaN(Title)) {
      addErrOutline('checkAddedStoryTitleInput');
      addErrClass('checkAddedStoryTitleNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedStoryTitleInput');
        removeStyles('checkAddedStoryTitleNumberMessage');
      }, 2000);
    } else if (metaDesc.length >= 200) {
      addErrOutline('checkAddedStorymetaDescInput');
      addErrClass('checkAddedStorymetaDescLengthMessage');
      setTimeout(() => {
        removeStyles('checkAddedStorymetaDescInput');
        removeStyles('checkAddedStorymetaDescLengthMessage');
      }, 2000);
    } else if (metaDesc.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedStorymetaDescInput');
      addErrClass('checkAddedStorymetaDescInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddedStorymetaDescInput');
        removeStyles('checkAddedStorymetaDescInvalidMessage');
      }, 2000);
    } else if (!isNaN(metaDesc)) {
      addErrOutline('checkAddedStorymetaDescInput');
      addErrClass('checkAddedStorymetaDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedStorymetaDescInput');
        removeStyles('checkAddedStorymetaDescNumberMessage');
      }, 2000);
    } else if (editorText.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedStoryDescInput');
      addErrClass('checkAddedStoryDescMessage');
      setTimeout(() => {
        removeStyles('checkAddedStoryDescInput');
        removeStyles('checkAddedStoryDescMessage');
      }, 2000);
    } else if (!isNaN(editorText.replace(/[^\w]/g, ''))) {
      addErrOutline('checkAddedStoryDescInput');
      addErrClass('checkAddedStoryDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedStoryDescInput');
        removeStyles('checkAddedStoryDescNumberMessage');
      }, 2000);
    } else {
      addLoader('addStoryLineLoader');
      Meteor.call('addStoryMethod', Title, editorHtml, metaTags, metaDesc);
      window.location = '/storymanagement';
    }
  }
});
