import { Template } from 'meteor/templating';
import Loader from './../../../../utils/loader';
import moment from 'moment';

const { addLoader, removeLoader } = new Loader();

Template.categories.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('categories');
  });
});

Template.tags.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('tags');
  });
});

Template.languages.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('languages');
  });
});

Template.categories.helpers({
  masterCategories() {
    const catTable = categories.find({}).fetch();
    catTable.forEach(e => {
      e.created_at = moment(e.created_at).format('ll');
    });

    return catTable;
  }
});

Template.tags.helpers({
  masterTags() {
    const tagTable = tags.find({}).fetch();
    tagTable.forEach(e => {
      e.created_at = moment(e.created_at).format('ll');
    });

    return tagTable;
  }
});

Template.languages.helpers({
  masterLangs() {
    const langTable = languages.find({}).fetch();
    langTable.forEach(e => {
      e.created_at = moment(e.created_at).format('ll');
    });

    return langTable;
  }
});

Template.categories.events({
  'click .changeCatStatus': function(e) {
    const id = e.currentTarget.id;
    addLoader(`${id}catStatus`);
    Meteor.call('CatStatusMethod', id);
  },

  'click #addCatBtn': function(e) {
    $('#addCat').val('');
  }
});

Template.tags.events({
  'click .changeTagStatus': function(e) {
    const id = e.currentTarget.id;
    addLoader(`${id}tagStatus`);
    Meteor.call('TagStatusMethod', id);
  },

  'click #addTagBtn': function(e) {
    $('#addTag').val('');
  }
});

Template.languages.events({
  'click .changeLangStatus': function(e) {
    const id = e.currentTarget.id;
    addLoader(`${id}langStatus`);
    Meteor.call('LangStatusMethod', id);
  },

  'click #addLangBtn': function(e) {
    $('#addLang').val('');
  }
});
