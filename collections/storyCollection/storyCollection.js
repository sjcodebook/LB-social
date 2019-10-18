import { Meteor } from 'meteor/meteor';

story = new Meteor.Collection('story');

// story.allow({
//   insert: function() {
//     return true;
//   },
//   update: function(userId, doc, fields, modifier) {
//     return true;
//   }
// });

export default story;
