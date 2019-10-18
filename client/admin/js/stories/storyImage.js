import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

// Template.storyImage.onCreated(function() {
//   let self = this;
//   self.autorun(function() {
//     self.subscribe('story');
//   });
// });

// Template.storyImage.helpers({
//   StoryImages() {
//     var username = Meteor.user().username;
//     var userId = Meteor.userId();
//     var URL = story.find({}).fetch();
//     return URL;
//   }
// });

// Template.addStory.events({
//   'submit .edit-story-image': function(e) {
//     Blaze.render('storyImage');
//     var file = $('#storyImage').get(0).files[0];

//     if (file) {
//       fsFile = new FS.File(file);

//       StoryImages.insert(fsFile, function(err, result) {
//         if (err) {
//           throw new Meteor.Error(err);
//         } else {
//           var imageLoc = '/cfs/files/StoryImages/' + result._id;

//           story.insert({
//             userId: Meteor.userId(),
//             username: Meteor.user().username,
//             image: imageLoc
//           });
//         }
//       });
//     }
//     return false; // prevent submit
//   }
// });

Template.addStory.events({
  'submit .edit-story-image': function(e) {
    e.preventDefault();
  }
});
