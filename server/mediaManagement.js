import { Meteor } from 'meteor/meteor';
import Media from '../collections/mediaCollection/mediaCollection';
import contentTags from '../collections/contentTagsCollection/contentTagsCollection';
import uuidv4 from 'uuid/v4';

Meteor.methods({
  MediaStatusMethod: function(id) {
    let status = Media.find({ media_id: id }).fetch();

    status = status[0].Is_active;

    if (status === true) {
      status = false;
    } else {
      status = true;
    }

    Media.update(
      { media_id: id },
      {
        $set: {
          Is_active: status
        }
      }
    );
    return true;
  },

  addMediaMethod: function(
    Type,
    Source,
    editorHtml,
    editorText,
    metaTags,
    metaDesc
  ) {
    const media_id = uuidv4(),
      contentTag_id = uuidv4();

    metaTags.forEach(e => {
      contentTags.insert({
        contentTag_id: contentTag_id,
        media_id: media_id,
        Tag: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    Media.insert({
      media_id: media_id,
      Type: Type,
      Source: Source,
      Image: 'https://picsum.photos/820/312',
      Description: editorHtml,
      DescriptionText: editorText,
      metaTagsId: contentTag_id,
      metaTagsArr: metaTags,
      metaDesc: metaDesc,
      created_at: new Date(),
      updated_at: new Date(),
      Is_active: true
    });
    return true;
  },

  editMediaMethod: function(
    id,
    Type,
    Source,
    editorHtml,
    editorText,
    metaTags,
    metaDesc
  ) {
    const contentTag_id = uuidv4();

    contentTags
      .find({ media_id: id })
      .fetch()
      .forEach(e => {
        contentTags.remove({ media_id: id });
      });

    metaTags.forEach(e => {
      contentTags.insert({
        contentTag_id: contentTag_id,
        media_id: id,
        Tag: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    Media.update(
      { media_id: id },
      {
        $set: {
          Type: Type,
          Source: Source,
          Image: 'https://picsum.photos/820/312',
          Description: editorHtml,
          DescriptionText: editorText,
          metaTagsId: contentTag_id,
          metaTagsArr: metaTags,
          metaDesc: metaDesc,
          updated_at: new Date()
        }
      }
    );
    return true;
  }
});
