import { Meteor } from 'meteor/meteor';
import { onPageLoad } from 'meteor/server-render';
import Media from './../collections/mediaCollection/mediaCollection';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

const siteName = 'Leader Bridge';
const defaultImage =
  'https://leadersbridge.herokuapp.com/assets/images/avatars/1.jpg';
const defaultMetaTags = `
<meta property="og:title"       content="${siteName}" />
<meta property="og:description" content="Be A Leader Via Leader Bridge" />
<meta property="og:image"       content="${defaultImage}" />
`;
var media_id = '';

const middleware = ConnectRoute(function(router) {
  router.get('/mediamanagement/view/:id', extractMediaId);
});

function extractMediaId(req, res, next) {
  media_id = req.params.id;
  next();
}

WebApp.connectHandlers.use(middleware);

function createMetaTag(property, content) {
  return `<meta property="${property}" content="${content}">`;
}

onPageLoad(sink => {
  const { pathname } = sink.request.url;
  const meteorHost = Meteor.absoluteUrl();
  const mediaId = media_id;
  const media = mediaId ? Media.findOne({ media_id: mediaId }) : null;

  if (media) {
    const title = 'LeaderBridge Post';
    const description = media.DescriptionText;
    const Image = media.Image;
    const fullUrl = meteorHost + pathname.replace(/^\/+/g, '');
    sink.appendToHead(createMetaTag('og:title', title));
    sink.appendToHead(createMetaTag('og:description', description));
    sink.appendToHead(createMetaTag('og:url', fullUrl));
    sink.appendToHead(createMetaTag('og:image', Image));
    sink.appendToHead(createMetaTag('og:site_name', siteName));
  } else {
    sink.appendToHead(defaultMetaTags);
    sink.appendToHead(createMetaTag('og:url', meteorHost));
  }
});
