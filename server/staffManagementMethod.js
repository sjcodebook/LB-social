import { Meteor } from 'meteor/meteor';
import roles from '../collections/roleCollection/roleCollection';
import mainMenu from '../collections/mainMenuCollection/mainMenuCollection';
import uuidv4 from 'uuid/v4';
import async from 'async';
import nodemailer from 'nodemailer';

Meteor.methods({
  addStaffMethod: function(
    id,
    userName,
    employee_id,
    email,
    mobile_number,
    rights
  ) {
    employee_id = employee_id.toLowerCase();
    let is_unique = true,
      is_id_unique = true,
      menuIds = [];

    let allUsersArr = Meteor.users.find({ email: email }).fetch();
    let idArr = Meteor.users.find({ employee_id: employee_id }).fetch();

    if (allUsersArr.length > 0) {
      is_unique = false;
    }

    if (idArr.length > 0) {
      is_id_unique = false;
    }

    if (is_id_unique && is_unique) {
      let token = uuidv4();
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
              from: 'teamfolklog@gmail.com',
              subject: 'Welcome To FolkLog!',
              text:
                'Here Are Your Folklog Account Credentials.\n\n' +
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

      rights.forEach(e => {
        const menusArr = mainMenu.find({ menu_name: e }).fetch();
        menuIds.push(menusArr[0].menu_id);
      });

      menuIds.forEach(e => {
        roles.insert({
          roles_id: uuidv4(),
          user_id: id,
          menuId: e
        });
      });

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
            employee_id: employee_id,
            is_admin: false,
            is_subadmin: true,
            rights: rights,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
      );
    } else if (!is_id_unique) {
      throw new Meteor.Error(500, 'Error 500: Not valid', 'id error');
    } else if (!is_unique) {
      throw new Meteor.Error(500, 'Error 500: Not valid', 'email error');
    }
    return true;
  },

  editStaffMethod: function(
    id,
    userName,
    employee_id,
    prev_employee_id,
    mobile_number,
    rights
  ) {
    employee_id = employee_id.toLowerCase();
    prev_employee_id = prev_employee_id.toLowerCase();
    let menuIds = [],
      is_id_unique = true;

    let idArr = Meteor.users.find({ employee_id: employee_id }).fetch();

    if (idArr.length > 0) {
      is_id_unique = false;
    }

    if (prev_employee_id === employee_id) {
      is_id_unique = true;
    }

    if (!is_id_unique) {
      throw new Meteor.Error(500, 'Error 500: Not valid', 'id error');
    } else {
      roles
        .find({ user_id: id })
        .fetch()
        .forEach(e => {
          roles.remove({ roles_id: e.roles_id });
        });

      rights.forEach(e => {
        const menusArr = mainMenu.find({ menu_name: e }).fetch();
        menuIds.push(menusArr[0].menu_id);
      });

      menuIds.forEach(e => {
        roles.insert({
          roles_id: uuidv4(),
          user_id: id,
          menuId: e
        });
      });

      Meteor.users.update(
        { user_id: id },
        {
          $set: {
            name: userName,
            mobile_number: mobile_number,
            employee_id: employee_id,
            rights: rights,
            updated_at: new Date()
          }
        }
      );
    }

    return true;
  }
});
