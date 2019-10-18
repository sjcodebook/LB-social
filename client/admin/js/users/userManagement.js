import { Template } from 'meteor/templating';
import Loader from './../../../../utils/loader';
import moment from 'moment';

const { addLoader, removeLoader } = new Loader();

Template.userManagement.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('Meteor.users');
  });
});

Template.userManagement.helpers({
  allUsers() {
    let usersTable = Meteor.users.find({}).fetch();
    usersTable = usersTable
      .filter(e => e.is_admin === false)
      .filter(e => e.is_subadmin === false);
    usersTable.forEach(e => {
      e.created_at = moment(e.created_at).format('ll');
    });
    return usersTable;
  },

  increment(i) {
    return i + 1;
  }
});

Template.userManagement.events({
  'click .changeStatus': function(e) {
    const id = e.currentTarget.id;
    addLoader(`${id}userStatus`);
    Meteor.call('UserStatusMethod', id);
  },

  'click #editUserBtn': function(e) {
    $.getScript(
      'https://maps.googleapis.com/maps/api/js?libraries=places&key=' +
        process.env.GOOGLE,
      function() {
        $.getScript(
          'https://cdnjs.cloudflare.com/ajax/libs/geocomplete/1.7.0/jquery.geocomplete.min.js',
          function() {
            $('#Location')
              .geocomplete()
              .bind('geocode:result', function(event, result) {
                let data = JSON.stringify(result);
                data = JSON.parse(data);

                let address_components = data.address_components;
                let city = '';
                let state = '';
                let country = '';
                let lat = data.geometry.location.lat;
                let lng = data.geometry.location.lng;
                let formatted_address = data.formatted_address;
                let place_id = data.place_id;

                for (let i = 0, len = address_components.length; i < len; i++) {
                  let ac = result.address_components[i];
                  if (ac.types.indexOf('locality') >= 0) city = ac.long_name;
                  if (ac.types.indexOf('administrative_area_level_1') >= 0)
                    state = ac.long_name;
                  if (ac.types.indexOf('country') >= 0) country = ac.long_name;
                }

                Session.set('city', city);
                Session.set('state', state);
                Session.set('country', country);

                $('#newcity').val(city);
                $('#newstate').val(state);
                $('#newcountry').val(country);
                $('#newlat').val(lat);
                $('#newlng').val(lng);
                $('#newformatted_address').val(formatted_address);
                $('#newplace_id').val(place_id);
              });
          }
        );
      }
    );
  }
});
