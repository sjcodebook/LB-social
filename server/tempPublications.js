import { Meteor } from 'meteor/meteor';
import uuidv4 from 'uuid/v4';

Meteor.publish('TempStory', function(id) {
  let self = this;
  let contentStoryView = [];
  story
    .rawCollection()
    .aggregate([
      {
        $lookup: {
          from: 'contentGenre',
          localField: 'Genre',
          foreignField: 'contentGenre_id',
          as: 'Cat'
        }
      },
      {
        $match: { 'Cat.story_id': { $eq: id } }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'Cat.Category_id',
          foreignField: 'Category_id',
          as: 'MasterCat'
        }
      },
      {
        $lookup: {
          from: 'contentTags',
          localField: 'Tags',
          foreignField: 'contentTag_id',
          as: 'Tag'
        }
      },
      {
        $match: { 'Tag.story_id': { $eq: id } }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'Tag.Tag_id',
          foreignField: 'hash_tag_id',
          as: 'MasterTag'
        }
      },
      {
        $lookup: {
          from: 'contentLanguage',
          localField: 'Language',
          foreignField: 'contentLanguage_id',
          as: 'Lang'
        }
      },
      {
        $match: { 'Lang.story_id': { $eq: id } }
      },
      {
        $lookup: {
          from: 'languages',
          localField: 'Lang.Language_id',
          foreignField: 'language_id',
          as: 'MasterLang'
        }
      }
    ])
    .toArray()
    .then(function(result) {
      contentStoryView = result;
      contentStoryView.forEach(e => {
        self.added('TempStory', uuidv4(), e);
      });

      self.ready();
    });
});

Meteor.publish('editTempStory', function(id) {
  let self = this;
  let contentStoryView = [];
  story
    .rawCollection()
    .aggregate([
      {
        $lookup: {
          from: 'contentGenre',
          localField: 'Genre',
          foreignField: 'contentGenre_id',
          as: 'Cat'
        }
      },
      {
        $match: { 'Cat.story_id': { $eq: id } }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'Cat.Category_id',
          foreignField: 'Category_id',
          as: 'MasterCat'
        }
      },
      {
        $lookup: {
          from: 'contentTags',
          localField: 'Tags',
          foreignField: 'contentTag_id',
          as: 'Tag'
        }
      },
      {
        $match: { 'Tag.story_id': { $eq: id } }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'Tag.Tag_id',
          foreignField: 'hash_tag_id',
          as: 'MasterTag'
        }
      },
      {
        $lookup: {
          from: 'contentLanguage',
          localField: 'Language',
          foreignField: 'contentLanguage_id',
          as: 'Lang'
        }
      },
      {
        $match: { 'Lang.story_id': { $eq: id } }
      },
      {
        $lookup: {
          from: 'languages',
          localField: 'Lang.Language_id',
          foreignField: 'language_id',
          as: 'MasterLang'
        }
      }
    ])
    .toArray()
    .then(function(result) {
      contentStoryView = result;
      contentStoryView.forEach(e => {
        self.added('editTempStory', uuidv4(), e);
      });

      self.ready();
    });
});

Meteor.publish('TempMedia', function(id) {
  let self = this;
  let contentMediaView = [];
  Media.rawCollection()
    .aggregate([
      {
        $lookup: {
          from: 'contentGenre',
          localField: 'Genre',
          foreignField: 'contentGenre_id',
          as: 'Cat'
        }
      },
      {
        $match: { 'Cat.media_id': { $eq: id } }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'Cat.Category_id',
          foreignField: 'Category_id',
          as: 'MasterCat'
        }
      },
      {
        $lookup: {
          from: 'contentTags',
          localField: 'Tags',
          foreignField: 'contentTag_id',
          as: 'Tag'
        }
      },
      {
        $match: { 'Tag.media_id': { $eq: id } }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'Tag.Tag_id',
          foreignField: 'hash_tag_id',
          as: 'MasterTag'
        }
      },
      {
        $lookup: {
          from: 'contentLanguage',
          localField: 'Language',
          foreignField: 'contentLanguage_id',
          as: 'Lang'
        }
      },
      {
        $match: { 'Lang.media_id': { $eq: id } }
      },
      {
        $lookup: {
          from: 'languages',
          localField: 'Lang.Language_id',
          foreignField: 'language_id',
          as: 'MasterLang'
        }
      }
    ])
    .toArray()
    .then(function(result) {
      contentMediaView = result;
      contentMediaView.forEach(e => {
        self.added('TempMedia', uuidv4(), e);
      });

      self.ready();
    });
});

Meteor.publish('editTempMedia', function(id) {
  let self = this;
  let contentMediaView = [];
  Media.rawCollection()
    .aggregate([
      {
        $lookup: {
          from: 'contentGenre',
          localField: 'Genre',
          foreignField: 'contentGenre_id',
          as: 'Cat'
        }
      },
      {
        $match: { 'Cat.media_id': { $eq: id } }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'Cat.Category_id',
          foreignField: 'Category_id',
          as: 'MasterCat'
        }
      },
      {
        $lookup: {
          from: 'contentTags',
          localField: 'Tags',
          foreignField: 'contentTag_id',
          as: 'Tag'
        }
      },
      {
        $match: { 'Tag.media_id': { $eq: id } }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'Tag.Tag_id',
          foreignField: 'hash_tag_id',
          as: 'MasterTag'
        }
      },
      {
        $lookup: {
          from: 'contentLanguage',
          localField: 'Language',
          foreignField: 'contentLanguage_id',
          as: 'Lang'
        }
      },
      {
        $match: { 'Lang.media_id': { $eq: id } }
      },
      {
        $lookup: {
          from: 'languages',
          localField: 'Lang.Language_id',
          foreignField: 'language_id',
          as: 'MasterLang'
        }
      }
    ])
    .toArray()
    .then(function(result) {
      contentMediaView = result;
      contentMediaView.forEach(e => {
        self.added('editTempMedia', uuidv4(), e);
      });

      self.ready();
    });
});
