import { Template } from 'meteor/templating';

Template.viewStory.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('story');
  });
});

Template.viewStory.helpers({
  viewStoryById() {
    const id = FlowRouter.getParam('id'),
      storyArr = story.find({ story_id: id }).fetch();
    return storyArr;
  }
});
