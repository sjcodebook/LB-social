import { Meteor } from 'meteor/meteor';
import categories from '../collections/masterSettings/categoriesCollection';
import tags from '../collections/masterSettings/tagsCollection';
import languages from '../collections/masterSettings/languageCollection';
import uuidv4 from 'uuid/v4';

Meteor.methods({
  addCatMethod: function(catName) {
    catName = catName.trim();
    const catNameArr = [];
    let is_unique = true;
    const allCat = categories.find({}).fetch();
    allCat.forEach(cat => {
      catNameArr.push(cat.Category_name);
    });

    catNameArr.forEach(e => {
      if (e.toLowerCase() === catName.toLowerCase()) {
        is_unique = false;
      }
    });

    if (is_unique) {
      categories.insert({
        Category_id: uuidv4(),
        Category_name: catName,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      });
    } else {
      throw new Meteor.Error(
        500,
        'Error 500: Not unique',
        'the document is not unique'
      );
    }
    return true;
  },

  addTagMethod: function(tagName) {
    tagName = tagName.trim();
    const tagNameArr = [],
      is_unique = true;
    const allTag = tags.find({}).fetch();

    allTag.forEach(tag => {
      tagNameArr.push(tag.hash_tag);
    });

    tagNameArr.forEach(e => {
      if (e.toLowerCase() === tagName.toLowerCase()) {
        is_unique = false;
      }
    });

    if (is_unique) {
      tags.insert({
        hash_tag_id: uuidv4(),
        hash_tag: tagName,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      });
    } else {
      throw new Meteor.Error(
        500,
        'Error 500: Not unique',
        'the document is not unique'
      );
    }
    return true;
  },

  addLangMethod: function(langName) {
    langName = langName.trim();
    const langNameArr = [],
      is_unique = true;
    const allLang = languages.find({}).fetch();

    allLang.forEach(lang => {
      langNameArr.push(lang.language);
    });

    langNameArr.forEach(e => {
      if (e.toLowerCase() === langName.toLowerCase()) {
        is_unique = false;
      }
    });

    if (is_unique) {
      languages.insert({
        language_id: uuidv4(),
        language: langName,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      });
    } else {
      throw new Meteor.Error(
        500,
        'Error 500: Not unique',
        'the document is not unique'
      );
    }
    return true;
  },

  CatStatusMethod: function(id) {
    let status = categories.find({ Category_id: id }).fetch();

    status = status[0].is_active;

    if (status === true) {
      status = false;
    } else {
      status = true;
    }

    categories.update(
      { Category_id: id },
      {
        $set: {
          is_active: status
        }
      }
    );
    return true;
  },

  TagStatusMethod: function(id) {
    let status = tags.find({ hash_tag_id: id }).fetch();

    status = status[0].is_active;

    if (status === true) {
      status = false;
    } else {
      status = true;
    }

    tags.update(
      { hash_tag_id: id },
      {
        $set: {
          is_active: status
        }
      }
    );
    return true;
  },

  LangStatusMethod: function(id) {
    let status = languages.find({ language_id: id }).fetch();

    status = status[0].is_active;

    if (status === true) {
      status = false;
    } else {
      status = true;
    }

    languages.update(
      { language_id: id },
      {
        $set: {
          is_active: status
        }
      }
    );
    return true;
  },

  editCatMethod: function(editCatName, id) {
    editCatName = editCatName.trim();
    let catNameArr = [],
      is_unique = true;
    let allCatArr = categories.find({}).fetch();

    allCatArr.forEach(cat => {
      catNameArr.push(cat.Category_name);
    });

    catNameArr.forEach(e => {
      if (e.toLowerCase() === editCatName.toLowerCase()) {
        is_unique = false;
      }
    });

    if (is_unique) {
      categories.update(
        { Category_id: id },
        {
          $set: {
            Category_name: editCatName
          }
        }
      );
    } else {
      throw new Meteor.Error(
        500,
        'Error 500: Not unique',
        'the document is not unique'
      );
    }
    return true;
  },

  editTagMethod: function(editTagName, id) {
    editTagName = editTagName.trim();
    let tagNameArr = [],
      is_unique = true;
    let allTagArr = tags.find({}).fetch();
    allTagArr.forEach(tag => {
      tagNameArr.push(tag.hash_tag);
    });

    tagNameArr.forEach(e => {
      if (e.toLowerCase() === editTagName.toLowerCase()) {
        is_unique = false;
      }
    });

    if (is_unique) {
      tags.update(
        { hash_tag_id: id },
        {
          $set: {
            hash_tag: editTagName
          }
        }
      );
    } else {
      throw new Meteor.Error(
        500,
        'Error 500: Not unique',
        'the document is not unique'
      );
    }
    return true;
  },

  editLangMethod: function(editLangName, id) {
    editLangName = editLangName.trim();
    let langNameArr = [],
      is_unique = true;
    let allLangArr = languages.find({}).fetch();
    allLangArr.forEach(lang => {
      langNameArr.push(lang.language);
    });

    langNameArr.forEach(e => {
      if (e.toLowerCase() === editLangName.toLowerCase()) {
        is_unique = false;
      }
    });

    if (is_unique) {
      languages.update(
        { language_id: id },
        {
          $set: {
            language: editLangName
          }
        }
      );
    } else {
      throw new Meteor.Error(
        500,
        'Error 500: Not unique',
        'the document is not unique'
      );
    }
    return true;
  }
});
