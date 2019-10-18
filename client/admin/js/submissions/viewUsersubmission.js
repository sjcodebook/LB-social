import { Template } from 'meteor/templating';
import moment from 'moment';

Template.viewUsersubmission.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('submissions');
  });
});

Template.viewUsersubmission.helpers({
  Submission() {
    const id = FlowRouter.getParam('id');
    let submissionsTable = submissions.find({ user_submission_id: id }).fetch();
    submissionsTable.forEach(e => {
      e.expiry = moment(e.expiry).format('ll');
    });
    submissionsTable.forEach(e => {
      e.created_at = moment(e.created_at).format('ll');
    });
    return submissionsTable;
  }
});
