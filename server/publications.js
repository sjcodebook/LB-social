import { Meteor } from 'meteor/meteor';
import cms from '../collections/CMS/cmsCollection';
import categories from '../collections/masterSettings/categoriesCollection';
import tags from '../collections/masterSettings/tagsCollection';
import languages from '../collections/masterSettings/languageCollection';
import story from '../collections/storyCollection/storyCollection';
// import StoryImages from '../collections/storyCollection/storyImages';
import Media from '../collections/mediaCollection/mediaCollection';
import contentGenre from '../collections/contentGenreCollection/contentGenreCollection';
import contentTags from '../collections/contentTagsCollection/contentTagsCollection';
import contentLanguage from '../collections/contentLanguagesCollection/contentLanguagesCollection';
import submissions from '../collections/userSubmission/userSubmission';
import mainMenu from '../collections/mainMenuCollection/mainMenuCollection';
import roles from '../collections/roleCollection/roleCollection';

Meteor.publish('cms', function() {
  return cms.find({});
});

Meteor.publish('categories', function() {
  return categories.find({}, { sort: { created_at: -1 } });
});

Meteor.publish('tags', function() {
  return tags.find({}, { sort: { created_at: -1 } });
});

Meteor.publish('languages', function() {
  return languages.find({}, { sort: { created_at: -1 } });
});

Meteor.publish('Meteor.users', function() {
  return Meteor.users.find({}, { sort: { created_at: -1 } });
});

Meteor.publish('viewUsers', function(id) {
  return Meteor.users.find({ user_id: id });
});

Meteor.publish('story', function() {
  return story.find({}, { sort: { created_at: -1 } });
});

// Meteor.publish('StoryImages', function() {
//   return StoryImages.find({});
// });

Meteor.publish('Media', function() {
  return Media.find({}, { sort: { created_at: -1 } });
});

Meteor.publish('contentGenre', function() {
  return contentGenre.find({});
});

Meteor.publish('contentTags', function() {
  return contentTags.find({});
});

Meteor.publish('contentLanguage', function() {
  return contentLanguage.find({});
});

Meteor.publish('submissions', function() {
  return submissions.find({}, { sort: { created_at: -1 } });
});

Meteor.publish('mainMenu', function() {
  return mainMenu.find({});
});

Meteor.publish('roles', function() {
  return roles.find({});
});
