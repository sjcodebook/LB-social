import { Meteor } from 'meteor/meteor';
import story from '../collections/storyCollection/storyCollection';
import contentTags from '../collections/contentTagsCollection/contentTagsCollection';
import uuidv4 from 'uuid/v4';

Meteor.methods({
  StoryStatusMethod: function(id) {
    let status = story.find({ story_id: id }).fetch();

    status = status[0].Is_active;

    if (status === true) {
      status = false;
    } else {
      status = true;
    }

    story.update(
      { story_id: id },
      {
        $set: {
          Is_active: status
        }
      }
    );
    return true;
  },

  addStoryMethod: function(Title, editorHtml, metaTags, metaDesc) {
    const contentTag_id = uuidv4(),
      story_id = uuidv4();

    metaTags.forEach(e => {
      contentTags.insert({
        contentTag_id: contentTag_id,
        story_id: story_id,
        Tag: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    story.insert({
      story_id: story_id,
      Title: Title,
      Image: 'https://picsum.photos/820/312',
      Description: editorHtml,
      metaTagsId: contentTag_id,
      metaDesc: metaDesc,
      metaTagsArr: metaTags,
      created_at: new Date(),
      updated_at: new Date(),
      Is_active: true
    });
    return true;
  },

  editStoryMethod: function(id, Title, editorHtml, metaTags, metaDesc) {
    const contentTag_id = uuidv4();

    contentTags
      .find({ story_id: id })
      .fetch()
      .forEach(e => {
        contentTags.remove({ story_id: id });
      });

    metaTags.forEach(e => {
      contentTags.insert({
        contentTag_id: contentTag_id,
        story_id: id,
        Tag: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    story.update(
      { story_id: id },
      {
        $set: {
          Title: Title,
          Image: 'https://picsum.photos/820/312',
          Description: editorHtml,
          metaTagsId: contentTag_id,
          metaDesc: metaDesc,
          metaTagsArr: metaTags,
          updated_at: new Date()
        }
      }
    );
    return true;
  }
});
