import { Meteor } from 'meteor/meteor';
import async from 'async';
import nodemailer from 'nodemailer';
import uuidv4 from 'uuid/v4';

Meteor.methods({
  UserStatusMethod: function(id) {
    let status = Meteor.users.find({ user_id: id }).fetch();

    status = status[0].is_active;

    if (status === true) {
      status = false;
    } else {
      status = true;
    }

    Meteor.users.update(
      { user_id: id },
      {
        $set: {
          is_active: status
        }
      }
    );
    return true;
  },

  deleteUserMethod: function(id) {
    Meteor.users.remove({ user_id: id });
    return true;
  },

  editUserMethod: function(
    id,
    userName,
    Organisation,
    Designation,
    Experience,
    entered_location,
    mobile_number,
    city,
    state,
    country,
    lat,
    lng,
    formatted_address,
    place_id
  ) {
    userName = userName.trim();
    mobile_number = mobile_number.trim();
    const checkMob = mobile_number.length === 10 ? true : false;

    if (checkMob) {
      if (!city) {
        Meteor.users.update(
          { user_id: id },
          {
            $set: {
              name: userName,
              mobile_number: mobile_number,
              Organisation: Organisation,
              Designation: Designation,
              Experience: Experience,
              updated_at: new Date()
            }
          }
        );
      } else {
        Meteor.users.update(
          { user_id: id },
          {
            $set: {
              name: userName,
              mobile_number: mobile_number,
              Organisation: Organisation,
              Designation: Designation,
              Experience: Experience,
              entered_location: entered_location,
              city: city,
              state: state,
              country: country,
              lat: lat,
              lng: lng,
              formatted_address: formatted_address,
              place_id: place_id,
              updated_at: new Date()
            }
          }
        );
      }
    } else {
      throw new Meteor.Error(
        500,
        'Error 500: Not valid',
        'the document is not valid'
      );
    }
    return true;
  },

  addUserMethod: function(
    id,
    userName,
    email,
    Organisation,
    Designation,
    Experience,
    entered_location,
    mobile_number,
    city,
    state,
    country,
    lat,
    lng,
    formatted_address,
    place_id
  ) {
    userName = userName.trim();
    mobile_number = mobile_number.trim();
    const checkMob = mobile_number.length === 10 ? true : false;
    let is_unique = true;
    let allUsersArr = Meteor.users.find({ email: email }).fetch();

    if (allUsersArr.length > 0) {
      is_unique = false;
    }

    if (checkMob && is_unique) {
      let token = Math.floor(100000000 + Math.random() * 900000000);
      token = token.toString();
      async.waterfall(
        [
          function(done) {
            let smtpTransport = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'teamfolklog@gmail.com',
                pass: 'vayuz12345'
              }
            });
            let mailOptions = {
              to: email,
              from: 'teamleadersbridge@gmail.com',
              subject: 'Welcome To Leaders Bridge!',
              text:
                'Here Are Your Leaders Bridge Account Credentials.\n\n' +
                'Email: ' +
                email +
                '\n\n' +
                'Password: ' +
                token +
                '\n\n' +
                'Have A Nice Day!\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
              console.log('mail sent');
              done(err, 'done');
            });
          }
        ],
        function(err) {
          if (err) {
            console.log(err);
          }
        }
      );

      let userId = Accounts.createUser({
        email: email,
        password: token
      });

      Meteor.users.update(
        { _id: userId },
        {
          $set: {
            user_id: id,
            name: userName,
            email: email,
            mobile_number: mobile_number,
            Organisation: Organisation,
            Designation: Designation,
            Experience: Experience,
            entered_location: entered_location,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            formatted_address: formatted_address,
            place_id: place_id,
            created_at: new Date(),
            updated_at: new Date(),
            is_admin: false,
            is_subadmin: false,
            is_active: true
          }
        }
      );
    } else if (!checkMob) {
      throw new Meteor.Error(500, 'Error 500: Not valid', 'mob error');
    } else if (!is_unique) {
      throw new Meteor.Error(500, 'Error 500: Not valid', 'email error');
    }
    return true;
  }
});
