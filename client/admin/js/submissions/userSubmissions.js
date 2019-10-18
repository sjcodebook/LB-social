import { Template } from 'meteor/templating';
import Loader from '../../../../utils/loader';
import moment from 'moment';

const { addLoader, removeLoader } = new Loader();

Template.usersubmission.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('submissions');
  });
});

Template.usersubmission.helpers({
  allSubmissions() {
    let submissionsTable = submissions.find({}).fetch();
    submissionsTable.forEach(e => {
      e.expiry = moment(e.expiry).format('ll');
    });
    submissionsTable.forEach(e => {
      e.created_at = moment(e.created_at).format('ll');
    });
    return submissionsTable;
  },

  fetchStatus(status) {
    if (status === 'Pending') {
      return true;
    } else {
      return false;
    }
  },

  selectedStatus(status) {
    if (status === 'Selected') {
      return true;
    } else if (status === 'Dropped') {
      return false;
    }
  },

  increment(i) {
    return i + 1;
  }
});

Template.usersubmission.events({
  'click .select': function(e) {
    const id = e.currentTarget.id;
    addLoader(`${id}select`);
    Meteor.call('SubmissionStatusMethod', id, 'Selected');
  },

  'click .drop': function(e) {
    const id = e.currentTarget.id;
    addLoader(`${id}drop`);
    Meteor.call('SubmissionStatusMethod', id, 'Dropped');
  }
});
