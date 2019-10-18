import { Meteor } from 'meteor/meteor';
import submissions from './../collections/userSubmission/userSubmission';
import uuidv4 from 'uuid/v4';

Meteor.methods({
  submitStoryMethod: function(Name, Email, Mobile_number, Type, Source, Desc) {
    Name = Name.trim();

    submissions.insert({
      user_submission_id: uuidv4(),
      Name: Name,
      Email: Email,
      Mobile_number: Mobile_number,
      Type: Type,
      Source: Source,
      Description: Desc,
      Status: 'Pending',
      created_at: new Date(),
      expiry: Date.now() + 432000000
    });
    return true;
  },

  SubmissionStatusMethod: function(id, status) {
    submissions.update(
      { user_submission_id: id },
      {
        $set: {
          Status: status
        }
      }
    );
    return true;
  }
});
