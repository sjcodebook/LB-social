import { Template } from 'meteor/templating';
import YouTubeGetID from './../../../../utils/youtubeURL';
import Loader from './../../../../utils/loader';
import urlMetadata from 'url-metadata';

const { addLoader, removeLoader } = new Loader();

Template.viewMedia.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('Media');
  });
});

Template.viewMedia.helpers({
  viewMediaById() {
    const id = FlowRouter.getParam('id'),
      mediaArr = Media.find({ media_id: id }).fetch();
    return mediaArr;
  },

  fetchType() {
    const id = FlowRouter.getParam('id'),
      mediaArr = Media.find({ media_id: id }).fetch();
    const type = mediaArr[0].Type;
    if (type === 'Video') {
      return true;
    } else {
      return false;
    }
  }
});

Template.viewMedia.events({
  'click #ViewMediaBtn': function(e) {
    const Source = $('#viewSourceURL').val();

    if (Source.includes('youtube') || Source.includes('YouTube')) {
      const id = YouTubeGetID(Source);
      const url = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      $('#ViewMediaModalContent').empty();
      document.getElementById('ViewMediaModalContent').insertAdjacentHTML(
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
      $('#ViewMediaModal').attr({
        'data-toggle': 'modal',
        'data-target': '#ViewMediaModal'
      });
      $('#ViewMediaModal').click();
    } else {
      $('#ViewMediaModalContent').empty();
      urlMetadata('https://cors-anywhere.herokuapp.com/' + Source).then(
        function(metadata) {
          removeLoader('ViewMediaModalContentLoader');
          const title = metadata['og:title'];
          const desc = metadata['og:description'];
          const img = metadata['og:image'];
          const url = metadata['og:url'];

          document
            .getElementById('viewMediaImg')
            .insertAdjacentHTML(
              'afterbegin',
              `<img src="${img}" alt="no image found" style='width:100%; height: 100%'>`
            );

          $('#ViewMediakw').html(
            `<a href='${url}' target="_blank">${desc}</a>` ||
              'no keywords found'
          );
          $('#ViewMediades').html(
            `<a href='${url}' target="_blank">${title}</a>` ||
              'no description found'
          );
        },
        function(error) {
          $('#ViewMediakw').html('Something Went Wrong!');
        }
      );
      document.getElementById('ViewMediaModalContent').insertAdjacentHTML(
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
              id="ViewMediaModalContentLoader"
              class="spinner fas fa-spinner ml-3 mb-3 mt-3 "
              style="font-size:2em;"
            ></i>
            <div class="col-md-4">
              <div><div id="viewMediaImg"></div></div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title" id="ViewMediakw"></h5>
                <p class="card-text" id="ViewMediades"></p>
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
      addLoader('ViewMediaModalContentLoader');
      $('#ViewMediaModal').attr({
        'data-toggle': 'modal',
        'data-target': '#ViewMediaModal'
      });
      $('#ViewMediaModal').click();
    }
  }
});
