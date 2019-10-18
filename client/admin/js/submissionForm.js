import { Template } from 'meteor/templating';
import ErrorStyles from './../../../utils/errorStyles';
import validUrl from 'valid-url';
import * as EmailValidator from 'email-validator';

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.submissionForm.events({
  'submit .submitStoryForm': function(e) {
    e.preventDefault();
    const Name = e.target.querySelector('#submitStoryName').value,
      Email = e.target.querySelector('#submitStoryEmail').value,
      Mobile_number = e.target.querySelector('#submitStoryMobile_number').value,
      Type = e.target.querySelector('#submitStoryType').value,
      Source = e.target.querySelector('#submitStorysourceURL').value,
      Desc = e.target.querySelector('#submitStoryDesc').value;

    if (!validUrl.isUri(Source)) {
      addErrOutline('checksubmitStoryMediaURLInput');
      addErrClass('checksubmitStoryMediaURLInvalidMessage');
      setTimeout(() => {
        removeStyles('checksubmitStoryMediaURLInput');
        removeStyles('checksubmitStoryMediaURLInvalidMessage');
      }, 2000);
    } else if (!EmailValidator.validate(Email)) {
      addErrOutline('checksubmitStoryEmailInput');
      addErrClass('checksubmitStoryEmailInvalidMessage');
      setTimeout(() => {
        removeStyles('checksubmitStoryEmailInput');
        removeStyles('checksubmitStoryEmailInvalidMessage');
      }, 2000);
    } else {
      Meteor.call(
        'submitStoryMethod',
        Name,
        Email,
        Mobile_number,
        Type,
        Source,
        Desc
      );
      window.location = '/usersubmission';
    }
  }
});
