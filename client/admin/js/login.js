import { Template } from 'meteor/templating';
import Loader from './../../../utils/loader';

const { addLoader, removeLoader } = new Loader();

Template.Login.events({
  'submit .login-form': function(event, template) {
    addLoader('loginLoader');
    event.preventDefault();
    document.getElementById('signInBtn').innerText = 'Signing In...';
    var $form = $(event.currentTarget);
    var $emailInput = $form.find('.email-address-input').eq(0);
    var $passwordInput = $form.find('.password-input').eq(0);

    var emailAddress = $emailInput.val() || '';
    var password = $passwordInput.val() || '';

    //trim
    emailAddress = emailAddress.replace(/^\s*|\s*$/g, '');
    password = password.replace(/^\s*|\s*$/g, '');

    //validate
    var isValidEmail = checkEmailIsValid(emailAddress);
    var isValidPassword = checkPasswordIsValid(password);

    if (!isValidEmail || !isValidPassword) {
      removeLoader('loginLoader');
      document.getElementById('signInBtn').innerText = 'Sign In';

      if (!isValidEmail) {
        sAlert.error('Invalid email address');
      }
      if (!isValidPassword) {
        sAlert.error('Your password must be at least 6 characters long');
      }
    } else {
      Meteor.loginWithPassword(emailAddress, password, function(error) {
        removeLoader('loginLoader');
        document.getElementById('signInBtn').innerText = 'Sign In';
        if (error) {
          sAlert.error('Invalid Email Or Password');
        }
      });
    }
  }
});
