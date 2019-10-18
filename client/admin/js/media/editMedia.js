import { Template } from 'meteor/templating';
import multiSelectArray from './../../../../utils/multiselectArr';
import Loader from './../../../../utils/loader';
import ErrorStyles from './../../../../utils/errorStyles';
import YouTubeGetID from './../../../../utils/youtubeURL';
import urlMetadata from 'url-metadata';
import validUrl from 'valid-url';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.editMedia.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('contentTags');
    self.subscribe('Media');
  });
});

Template.editMedia.helpers({
  editMediaById() {
    const id = FlowRouter.getParam('id'),
      mediaArr = Media.find({ media_id: id }).fetch();

    const Type = mediaArr[0].Type;

    if (Type === 'Video') {
      $(document).ready(function() {
        $('#editVideo').attr('selected', 'selected');
        $('#editmediaSourceSelectDiv').removeAttr('hidden', 'hidden');
        $('#editsourceURLDiv').removeAttr('hidden', 'hidden');
        $('#editcheckImage').addClass('noDisplay');
      });
    } else {
      $(document).ready(function() {
        $('#editImage').attr('selected', 'selected');
        $('#editsourceURLDiv').attr('hidden', 'hidden');
        $('#editmediaSourceSelectDiv').attr('hidden', 'hidden');
        $('#editmediaUploadDiv').attr('hidden', 'hidden');
        $('#editcheckImage').removeClass('noDisplay');
      });
    }

    return mediaArr;
  },

  tags() {
    const id = FlowRouter.getParam('id'),
      tagArr = contentTags.find({ media_id: id }).fetch();
    return tagArr;
  }
});

Template.editMedia.events({
  'change #editMediaType': function(e) {
    const Source = $('#editMediaType').val();
    if (Source === 'Video') {
      $('#editmediaSourceSelectDiv').removeAttr('hidden', 'hidden');
      $('#editsourceURLDiv').removeAttr('hidden', 'hidden');
      $('#editcheckImage').addClass('noDisplay');
    } else {
      $('#editsourceURLDiv').attr('hidden', 'hidden');
      $('#editmediaSourceSelectDiv').attr('hidden', 'hidden');
      $('#editmediaUploadDiv').attr('hidden', 'hidden');
      $('#editcheckImage').removeClass('noDisplay');
    }
  },

  'change #editmediaSourceSelect': function(e) {
    const Source = $('#editmediaSourceSelect').val();
    if (Source === 'URL') {
      $('#editsourceURLDiv').removeAttr('hidden', 'hidden');
      $('#editmediaUploadDiv').attr('hidden', 'hidden');
    } else {
      $('#editsourceURLDiv').attr('hidden', 'hidden');
      $('#editmediaUploadDiv').removeAttr('hidden', 'hidden');
    }
  },

  'change #editSourceURL': function(e) {
    $('#downeditMediaPrev').empty();
    $(document).ready(function() {
      const Source = $('#editSourceURL').val();

      if (!validUrl.isUri(Source)) {
        $('#downeditMediaPrev').empty();
        addErrOutline('checkEditMediaURLInput');
        addErrClass('checkEditMediaURLInvalidMessage');
        setTimeout(() => {
          removeStyles('checkEditMediaURLInput');
          removeStyles('checkEditMediaURLInvalidMessage');
        }, 2000);
      } else {
        $('#downeditMediaPrev').empty();
        removeStyles('checkEditMediaURLInput');
        removeStyles('checkEditMediaURLInvalidMessage');

        if (Source.includes('youtube') || Source.includes('YouTube')) {
          const id = YouTubeGetID(Source);
          const url = `<iframe width="100%" height="500px" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

          $('#downeditMediaPrev').empty();
          document.getElementById('downeditMediaPrev').insertAdjacentHTML(
            'afterbegin',
            `<div class="card-body" >
              ${url}
            </div>
           `
          );
        } else {
          urlMetadata('https://cors-anywhere.herokuapp.com/' + Source).then(
            function(metadata) {
              removeLoader('ViewEditMediaDownContentLoader');
              const title = metadata['og:title'];
              const desc = metadata['og:description'];
              const img = metadata['og:image'];
              const url = metadata['og:url'];

              document
                .getElementById('downEditMediaImg')
                .insertAdjacentHTML(
                  'afterbegin',
                  `<img src="${img}" alt="no image found" style='width:100%; height: 100%'>`
                );

              $('#downEditMediakw').html(
                `<a href='${url}' target="_blank">${desc}</a>` ||
                  'no keywords found'
              );
              $('#downEditMediades').html(
                `<a href='${url}' target="_blank">${title}</a>` ||
                  'no description found'
              );
            },
            function(error) {
              $('#downEditMediakw').html('Something Went Wrong!');
            }
          );

          document.getElementById('downeditMediaPrev').insertAdjacentHTML(
            'afterbegin',
            ` <div class="card mb-3 mt-2">
              <div class="row no-gutters">
                <i
                  id="ViewEditMediaDownContentLoader"
                  class="spinner fas fa-spinner ml-3 mb-3 mt-3 "
                  style="font-size:2em;"
                ></i>
                <div class="col-md-4">
                  <div><div id="downEditMediaImg"></div></div>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title" id="downEditMediakw"></h5>
                    <p class="card-text" id="downEditMediades"></p>
                  </div>
                </div>
              </div>
            </div>`
          );
          addLoader('ViewEditMediaDownContentLoader');
        }
      }
    });
  },

  'click #ViewEditMediaBtn': function(e) {
    $('#downeditMediaPrev').empty();
    const Source = $('#editSourceURL').val();

    if (!validUrl.isUri(Source)) {
      addErrOutline('checkEditMediaURLInput');
      addErrClass('checkEditMediaURLInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaURLInput');
        removeStyles('checkEditMediaURLInvalidMessage');
      }, 2000);
    } else if (Source.includes('youtube') || Source.includes('YouTube')) {
      const id = YouTubeGetID(Source);
      const url = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      $('#ViewEditMediaModalContent').empty();
      document.getElementById('ViewEditMediaModalContent').insertAdjacentHTML(
        'afterbegin',
        `  <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">PREVIEW MEDIA</h5>
        <button
          type="button"
          class="close"
          aria-label="Close"
          data-dismiss="modal"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

        <div class="modal-body">
      ${url}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="mb-2 mr-2 mt-3 btn btn-secondary"
            data-dismiss="modal"
          >Close
          </button>
        </div>`
      );
      $('#ViewEditMediaModal').attr({
        'data-toggle': 'modal',
        'data-target': '#ViewEditMediaModal'
      });
      $('#ViewEditMediaModal').click();
    } else {
      $('#ViewEditMediaModalContent').empty();
      urlMetadata('https://cors-anywhere.herokuapp.com/' + Source).then(
        function(metadata) {
          removeLoader('ViewEditMediaModalContentLoader');
          const title = metadata['og:title'];
          const desc = metadata['og:description'];
          const img = metadata['og:image'];
          const url = metadata['og:url'];

          document
            .getElementById('editMediaImg')
            .insertAdjacentHTML(
              'afterbegin',
              `<img src="${img}" alt="no image found" style='width:100%; height: 100%'>`
            );

          $('#EditMediakw').html(
            `<a href='${url}' target="_blank">${desc}</a>` ||
              'no keywords found'
          );
          $('#EditMediades').html(
            `<a href='${url}' target="_blank">${title}</a>` ||
              'no description found'
          );
        },
        function(error) {
          $('#EditMediakw').html('Something Went Wrong!');
        }
      );
      document.getElementById('ViewEditMediaModalContent').insertAdjacentHTML(
        'afterbegin',
        `<div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">PREVIEW MEDIA</h5>
        <button type="button" class="close" aria-label="Close" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row no-gutters">
            <i
              id="ViewEditMediaModalContentLoader"
              class="spinner fas fa-spinner ml-3 mb-3 mt-3 "
              style="font-size:2em;"
            ></i>
            <div class="col-md-4">
              <div><div id="editMediaImg"></div></div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title" id="EditMediakw"></h5>
                <p class="card-text" id="EditMediades"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="mb-2 mr-2 mt-3 btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
      </div>`
      );
      addLoader('ViewEditMediaModalContentLoader');
      $('#ViewEditMediaModal').attr({
        'data-toggle': 'modal',
        'data-target': '#ViewEditMediaModal'
      });
      $('#ViewEditMediaModal').click();
    }
  },

  'submit .editMediaForm': function(e) {
    e.preventDefault();
    let id = FlowRouter.getParam('id'),
      Type = e.target.querySelector('#editMediaType').value,
      Source =
        e.target.querySelector('#editSourceURL').value ||
        'https://leaderbridge.com',
      editorHtml = e.target.querySelector('.ql-editor').innerHTML,
      editorText = e.target.querySelector('.ql-editor').innerText,
      metaTags = multiSelectArray('edit-media-tags'),
      metaDesc = e.target.querySelector('#editMediaMetaDesc').value;

    metaDesc = metaDesc.trim();

    if (!validUrl.isUri(Source)) {
      addErrOutline('checkEditMediaURLInput');
      addErrClass('checkEditMediaURLInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaURLInput');
        removeStyles('checkEditMediaURLInvalidMessage');
      }, 2000);
    } else if (metaDesc.length >= 200) {
      addErrOutline('checkEditMediaMetaDescInput');
      addErrClass('checkEditMediaMetaDescLengthMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaMetaDescInput');
        removeStyles('checkEditMediaMetaDescLengthMessage');
      }, 2000);
    } else if (metaDesc.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditMediaMetaDescInput');
      addErrClass('checkEditMediaMetaDescInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaMetaDescInput');
        removeStyles('checkEditMediaMetaDescInvalidMessage');
      }, 2000);
    } else if (!isNaN(metaDesc)) {
      addErrOutline('checkEditMediaMetaDescInput');
      addErrClass('checkEditMediaMetaDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaMetaDescInput');
        removeStyles('checkEditMediaMetaDescNumberMessage');
      }, 2000);
    } else if (editorText.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditMediaDescInput');
      addErrClass('checkEditMediaDescMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaDescInput');
        removeStyles('checkEditMediaDescMessage');
      }, 2000);
    } else if (!isNaN(editorText.replace(/[^\w]/g, ''))) {
      addErrOutline('checkEditMediaDescInput');
      addErrClass('checkEditMediaDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaDescInput');
        removeStyles('checkEditMediaDescNumberMessage');
      }, 2000);
    } else {
      addLoader('editMediaLineLoader');
      Meteor.call(
        'editMediaMethod',
        id,
        Type,
        Source,
        editorHtml,
        editorText,
        metaTags,
        metaDesc
      );
      window.location = '/mediamanagement';
    }
  }
});
