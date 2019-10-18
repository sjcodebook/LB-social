import { Meteor } from 'meteor/meteor';
import cms from '../collections/CMS/cmsCollection';

Meteor.methods({
  editCmsPage: function(
    id,
    shortDesc,
    metaTitle,
    metaDesc,
    metaImage,
    editorHtml
  ) {
    cms.update(
      { cms_id: id },
      {
        $set: {
          page_description: editorHtml,
          page_short_description: shortDesc.trim(),
          metadata_title: metaTitle.trim(),
          metadata_description: metaDesc.trim(),
          metadata_image: metaImage.trim()
        }
      }
    );
    return true;
  },

  CmsStatusMethod: function(id) {
    let status = cms.find({ cms_id: id }).fetch();

    status = status[0].is_active;

    if (status === true) {
      status = false;
    } else {
      status = true;
    }

    cms.update(
      { cms_id: id },
      {
        $set: {
          is_active: status
        }
      }
    );
    return true;
  }
});
