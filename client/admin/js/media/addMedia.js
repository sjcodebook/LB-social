import { Template } from 'meteor/templating';
import ErrorStyles from './../../../../utils/errorStyles';
import Loader from './../../../../utils/loader';
import multiSelectArray from './../../../../utils/multiselectArr';
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

Template.addMedia.events({
  'change #mediaType': function(e) {
    const Source = $('#mediaType').val();
    if (Source === 'Video') {
      $('#mediaSourceSelectDiv').removeAttr('hidden', 'hidden');
      $('#sourceURLDiv').removeAttr('hidden', 'hidden');
      $('#checkImage').addClass('noDisplay');
    } else {
      $('#sourceURLDiv').attr('hidden', 'hidden');
      $('#mediaSourceSelectDiv').attr('hidden', 'hidden');
      $('#mediaUploadDiv').attr('hidden', 'hidden');
      $('#checkImage').removeClass('noDisplay');
    }
  },

  'change #mediaSourceSelect': function(e) {
    const Source = $('#mediaSourceSelect').val();
    if (Source === 'URL') {
      $('#sourceURLDiv').removeAttr('hidden', 'hidden');
      $('#mediaUploadDiv').attr('hidden', 'hidden');
    } else {
      $('#sourceURLDiv').attr('hidden', 'hidden');
      $('#mediaUploadDiv').removeAttr('hidden', 'hidden');
    }
  },

  'change #sourceURL': function(e) {
    $('#downaddMediaPrev').empty();
    $(document).ready(function() {
      const Source = $('#sourceURL').val();

      if (!validUrl.isUri(Source)) {
        $('#downaddMediaPrev').empty();
        addErrOutline('checkAddedMediaURLInput');
        addErrClass('checkAddedMediaURLInvalidMessage');
        setTimeout(() => {
          removeStyles('checkAddedMediaURLInput');
          removeStyles('checkAddedMediaURLInvalidMessage');
        }, 2000);
      } else {
        $('#downaddMediaPrev').empty();
        removeStyles('checkAddedMediaURLInput');
        removeStyles('checkAddedMediaURLInvalidMessage');

        if (Source.includes('youtube') || Source.includes('YouTube')) {
          const id = YouTubeGetID(Source);
          const url = `<iframe width="100%" height="500px" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

          $('#downaddMediaPrev').empty();
          document.getElementById('downaddMediaPrev').insertAdjacentHTML(
            'afterbegin',
            `<div class="card-body" >
              ${url}
            </div>
           `
          );
        } else {
          urlMetadata('https://cors-anywhere.herokuapp.com/' + Source).then(
            function(metadata) {
              removeLoader('ViewAddMediaDownContentLoader');
              const title = metadata['og:title'];
              const desc = metadata['og:description'];
              const img = metadata['og:image'];
              const url = metadata['og:url'];

              document
                .getElementById('downAddMediaImg')
                .insertAdjacentHTML(
                  'afterbegin',
                  `<img src="${img}" alt="no image found" style='width:100%; height: 100%'>`
                );

              $('#downAddMediakw').html(
                `<a href='${url}' target="_blank">${desc}</a>` ||
                  'no keywords found'
              );
              $('#downAddMediades').html(
                `<a href='${url}' target="_blank">${title}</a>` ||
                  'no description found'
              );
            },
            function(error) {
              $('#downAddMediakw').html('Something Went Wrong!');
            }
          );

          document.getElementById('downaddMediaPrev').insertAdjacentHTML(
            'afterbegin',
            ` <div class="card mb-3 mt-2">
              <div class="row no-gutters">
                <i
                  id="ViewAddMediaDownContentLoader"
                  class="spinner fas fa-spinner ml-3 mb-3 mt-3 "
                  style="font-size:2em;"
                ></i>
                <div class="col-md-4">
                  <div><div id="downAddMediaImg"></div></div>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title" id="downAddMediakw"></h5>
                    <p class="card-text" id="downAddMediades"></p>
                  </div>
                </div>
              </div>
            </div>`
          );
          addLoader('ViewAddMediaDownContentLoader');
        }
      }
    });
  },

  'click #ViewAddMediaBtn': function(e) {
    $('#downaddMediaPrev').empty();
    const Source = $('#sourceURL').val();

    if (!validUrl.isUri(Source)) {
      addErrOutline('checkAddedMediaURLInput');
      addErrClass('checkAddedMediaURLInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddedMediaURLInput');
        removeStyles('checkAddedMediaURLInvalidMessage');
      }, 2000);
    } else if (Source.includes('youtube') || Source.includes('YouTube')) {
      const id = YouTubeGetID(Source);
      const url = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      $('#ViewAddMediaModalContent').empty();
      document.getElementById('ViewAddMediaModalContent').insertAdjacentHTML(
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
      $('#ViewAddMediaModal').attr({
        'data-toggle': 'modal',
        'data-target': '#ViewAddMediaModal'
      });
      $('#ViewAddMediaModal').click();
    } else {
      $('#ViewAddMediaModalContent').empty();
      urlMetadata('https://cors-anywhere.herokuapp.com/' + Source).then(
        function(metadata) {
          removeLoader('ViewAddMediaModalContentLoader');
          const title = metadata['og:title'];
          const desc = metadata['og:description'];
          const img = metadata['og:image'];
          const url = metadata['og:url'];

          document
            .getElementById('addMediaImg')
            .insertAdjacentHTML(
              'afterbegin',
              `<img src="${img}" alt="no image found" style='width:100%; height: 100%'>`
            );

          $('#AddMediakw').html(
            `<a href='${url}' target="_blank">${desc}</a>` ||
              'no keywords found'
          );
          $('#AddMediades').html(
            `<a href='${url}' target="_blank">${title}</a>` ||
              'no description found'
          );
        },
        function(error) {
          $('#AddMediakw').html('Something Went Wrong!');
        }
      );
      document.getElementById('ViewAddMediaModalContent').insertAdjacentHTML(
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
              id="ViewAddMediaModalContentLoader"
              class="spinner fas fa-spinner ml-3 mb-3 mt-3 "
              style="font-size:2em;"
            ></i>
            <div class="col-md-4">
              <div><div id="addMediaImg"></div></div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title" id="AddMediakw"></h5>
                <p class="card-text" id="AddMediades"></p>
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
      addLoader('ViewAddMediaModalContentLoader');
      $('#ViewAddMediaModal').attr({
        'data-toggle': 'modal',
        'data-target': '#ViewAddMediaModal'
      });
      $('#ViewAddMediaModal').click();
    }
  },

  'submit .addAVForm': function(e) {
    e.preventDefault();
    let Type = e.target.querySelector('#mediaType').value,
      Source =
        e.target.querySelector('#sourceURL').value ||
        'https://leaderbridge.com',
      editorHtml = e.target.querySelector('.ql-editor').innerHTML,
      editorText = e.target.querySelector('.ql-editor').innerText,
      metaTags = multiSelectArray('media-tags'),
      metaDesc = e.target.querySelector('#mediaMetaDesc').value;

    metaDesc = metaDesc.trim();

    if (!validUrl.isUri(Source)) {
      addErrOutline('checkAddedMediaURLInput');
      addErrClass('checkAddedMediaURLInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddedMediaURLInput');
        removeStyles('checkAddedMediaURLInvalidMessage');
      }, 2000);
    } else if (metaDesc.length >= 200) {
      addErrOutline('checkAddedMediaMetaDescInput');
      addErrClass('checkAddedMediaMetaDescLengthMessage');
      setTimeout(() => {
        removeStyles('checkAddedMediaMetaDescInput');
        removeStyles('checkAddedMediaMetaDescLengthMessage');
      }, 2000);
    } else if (metaDesc.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedMediaMetaDescInput');
      addErrClass('checkAddedMediaMetaDescInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddedMediaMetaDescInput');
        removeStyles('checkAddedMediaMetaDescInvalidMessage');
      }, 2000);
    } else if (!isNaN(metaDesc)) {
      addErrOutline('checkAddedMediaMetaDescInput');
      addErrClass('checkAddedMediaMetaDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedMediaMetaDescInput');
        removeStyles('checkAddedMediaMetaDescNumberMessage');
      }, 2000);
    } else if (editorText.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedMediaDescInput');
      addErrClass('checkAddedMediaDescMessage');
      setTimeout(() => {
        removeStyles('checkAddedMediaDescInput');
        removeStyles('checkAddedMediaDescMessage');
      }, 2000);
    } else if (!isNaN(editorText.replace(/[^\w]/g, ''))) {
      addErrOutline('checkAddedMediaDescInput');
      addErrClass('checkAddedMediaDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedMediaDescInput');
        removeStyles('checkAddedMediaDescNumberMessage');
      }, 2000);
    } else {
      addLoader('addMediaLineLoader');
      Meteor.call(
        'addMediaMethod',
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
