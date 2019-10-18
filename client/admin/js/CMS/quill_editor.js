import { Template } from 'meteor/templating';
import ErrorStyles from './../../../../utils/errorStyles';
import Loader from './../../../../utils/loader';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.quill_editor.onRendered(function() {
  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }]
  ];
  var quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  });
});

Template.quill_editor.events({
  'submit .quill_form': function(e) {
    e.preventDefault();
    const id = FlowRouter.getParam('id');
    const pageName = e.target.querySelector('#pageName').value;
    const shortDesc = e.target.querySelector('#shortDesc').value;
    const metaTitle = e.target.querySelector('#metaTitle').value;
    const metaDesc = e.target.querySelector('#metaDesc').value;
    const metaImage = e.target.querySelector('#metaImage').value;
    const editorHtml = e.target.querySelector('.ql-editor').innerHTML;
    const editorText = e.target.querySelector('.ql-editor').innerText;

    removeStyles('checkAddedCmsInput');
    removeStyles('checkAddedCmsMessage');

    if (shortDesc.length >= 100) {
      addErrOutline('checkAddedCmsshortDescInput');
      addErrClass('checkAddedCmsshortDescLengthMessage');
      setTimeout(() => {
        removeStyles('checkAddedCmsshortDescInput');
        removeStyles('checkAddedCmsshortDescLengthMessage');
      }, 2000);
    } else if (shortDesc.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedCmsshortDescInput');
      addErrClass('checkAddedCmsshortDescInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddedCmsshortDescInput');
        removeStyles('checkAddedCmsshortDescInvalidMessage');
      }, 2000);
    } else if (!isNaN(shortDesc)) {
      addErrOutline('checkAddedCmsshortDescInput');
      addErrClass('checkAddedCmsshortDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedCmsshortDescInput');
        removeStyles('checkAddedCmsshortDescNumberMessage');
      }, 2000);
    } else if (metaTitle.length >= 100) {
      addErrOutline('checkAddedCmsmetaTitleInput');
      addErrClass('checkAddedCmsmetaTitleLengthMessage');
      setTimeout(() => {
        removeStyles('checkAddedCmsmetaTitleInput');
        removeStyles('checkAddedCmsmetaTitleLengthMessage');
      }, 2000);
    } else if (metaTitle.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedCmsmetaTitleInput');
      addErrClass('checkAddedCmsmetaTitleInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddedCmsmetaTitleInput');
        removeStyles('checkAddedCmsmetaTitleInvalidMessage');
      }, 2000);
    } else if (!isNaN(metaTitle)) {
      addErrOutline('checkAddedCmsmetaTitleInput');
      addErrClass('checkAddedCmsmetaTitleNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedCmsmetaTitleInput');
        removeStyles('checkAddedCmsmetaTitleNumberMessage');
      }, 2000);
    } else if (metaDesc.length >= 100) {
      addErrOutline('checkAddedCmsmetaDescInput');
      addErrClass('checkAddedCmsmetaDescLengthMessage');
      setTimeout(() => {
        removeStyles('checkAddedCmsmetaDescInput');
        removeStyles('checkAddedCmsmetaDescLengthMessage');
      }, 2000);
    } else if (metaDesc.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedCmsmetaDescInput');
      addErrClass('checkAddedCmsmetaDescInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddedCmsmetaDescInput');
        removeStyles('checkAddedCmsmetaDescInvalidMessage');
      }, 2000);
    } else if (!isNaN(metaDesc)) {
      addErrOutline('checkAddedCmsmetaDescInput');
      addErrClass('checkAddedCmsmetaDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedCmsmetaDescInput');
        removeStyles('checkAddedCmsmetaDescNumberMessage');
      }, 2000);
    } else if (editorText.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedCmsInput');
      addErrClass('checkAddedCmsMessage');
      setTimeout(() => {
        removeStyles('checkAddedCmsInput');
        removeStyles('checkAddedCmsMessage');
      }, 2000);
    } else if (!isNaN(editorText.replace(/[^\w]/g, ''))) {
      addErrOutline('checkAddedCmsInput');
      addErrClass('checkAddedCmsNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedCmsInput');
        removeStyles('checkAddedCmsNumberMessage');
      }, 2000);
    } else {
      Meteor.call(
        'editCmsPage',
        id,
        shortDesc,
        metaTitle,
        metaDesc,
        metaImage,
        editorHtml
      );
      window.location = '/cms';
    }
  }
});

Template.quill_editor.helpers({
  cms() {
    const id = FlowRouter.getParam('id');
    return cms.find({ cms_id: id }).fetch();
  }
});
