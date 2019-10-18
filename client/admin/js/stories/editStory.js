import { Template } from 'meteor/templating';
import multiSelectArray from './../../../../utils/multiselectArr';
import ErrorStyles from './../../../../utils/errorStyles';
import Loader from './../../../../utils/loader';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.editStory.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('story');
    self.subscribe('contentTags');
  });
});

Template.editStory.helpers({
  editStoryById() {
    const id = FlowRouter.getParam('id'),
      storyArr = story.find({ story_id: id }).fetch();
    return storyArr;
  },

  tags() {
    const id = FlowRouter.getParam('id'),
      tagArr = contentTags.find({ story_id: id }).fetch();
    return tagArr;
  }
});

Template.editStory.events({
  'submit .editStoryForm': function(e) {
    e.preventDefault();
    let id = FlowRouter.getParam('id'),
      Title = e.target.querySelector('#editContentTitle').value,
      editorHtml = e.target.querySelector('.ql-editor').innerHTML,
      editorText = e.target.querySelector('.ql-editor').innerText,
      metaTags = multiSelectArray('edit-story-tags'),
      metaDesc = e.target.querySelector('#editStorymetaDesc').value;

    Title = Title.trim();
    metaDesc = metaDesc.trim();

    if (Title.length >= 100) {
      addErrOutline('checkEditStoryTitleInput');
      addErrClass('checkEditStoryTitleLengthMessage');
      setTimeout(() => {
        removeStyles('checkEditStoryTitleInput');
        removeStyles('checkEditStoryTitleLengthMessage');
      }, 2000);
    } else if (Title.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditStoryTitleInput');
      addErrClass('checkEditStoryTitleInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditStoryTitleInput');
        removeStyles('checkEditStoryTitleInvalidMessage');
      }, 2000);
    } else if (!isNaN(Title)) {
      addErrOutline('checkEditStoryTitleInput');
      addErrClass('checkEditStorymetaDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditStoryTitleInput');
        removeStyles('checkEditStorymetaDescNumberMessage');
      }, 2000);
    } else if (metaDesc.length >= 200) {
      addErrOutline('checkeditStorymetaDescInput');
      addErrClass('checkEditStorymetaDescLengthMessage');
      setTimeout(() => {
        removeStyles('checkeditStorymetaDescInput');
        removeStyles('checkEditStorymetaDescLengthMessage');
      }, 2000);
    } else if (metaDesc.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkeditStorymetaDescInput');
      addErrClass('checkEditStorymetaDescInvalidMessage');
      setTimeout(() => {
        removeStyles('checkeditStorymetaDescInput');
        removeStyles('checkEditStorymetaDescInvalidMessage');
      }, 2000);
    } else if (!isNaN(metaDesc)) {
      addErrOutline('checkeditStorymetaDescInput');
      addErrClass('checkEditStorymetaDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkeditStorymetaDescInput');
        removeStyles('checkEditStorymetaDescNumberMessage');
      }, 2000);
    } else if (editorText.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditStoryDescInput');
      addErrClass('checkEditStoryDescMessage');
      setTimeout(() => {
        removeStyles('checkEditStoryDescInput');
        removeStyles('checkEditStoryDescMessage');
      }, 2000);
    } else if (!isNaN(editorText.replace(/[^\w]/g, ''))) {
      addErrOutline('checkEditStoryDescInput');
      addErrClass('checkEditStoryDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditStoryDescInput');
        removeStyles('checkEditStoryDescNumberMessage');
      }, 2000);
    } else {
      addLoader('editStoryLineLoader');
      Meteor.call('editStoryMethod', id, Title, editorHtml, metaTags, metaDesc);
      window.location = '/storymanagement';
    }
  }
});
