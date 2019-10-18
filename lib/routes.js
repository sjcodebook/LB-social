import { FlowRouterTitle } from 'meteor/ostrio:flow-router-title';
import { Meteor } from 'meteor/meteor';
import { Blaze } from 'meteor/blaze';

// Login and logout routes
FlowRouter.route('/', {
  name: 'dashboard',
  title: 'Leaders Bridge-DashBoard',
  action() {
    Blaze._allowJavascriptUrls();
    BlazeLayout.render('leftPanel', { main: 'underCons' });
  }
});

// Master settings routes
FlowRouter.route('/mastersettings/categories', {
  name: 'categories',
  title: 'Leaders Bridge-Master Settings',
  action() {
    BlazeLayout.render('leftPanel', { main: 'categories' });
  }
});

FlowRouter.route('/mastersettings/tags', {
  name: 'tags',
  title: 'Leaders Bridge-Master Settings',
  action() {
    BlazeLayout.render('leftPanel', { main: 'tags' });
  }
});

FlowRouter.route('/mastersettings/languages', {
  name: 'languages',
  title: 'Leaders Bridge-Master Settings',
  action() {
    BlazeLayout.render('leftPanel', { main: 'languages' });
  }
});

FlowRouter.route('/mastersettings/categories/:id', {
  name: 'categories',
  title: 'Leaders Bridge-Master Settings',
  action() {
    BlazeLayout.render('leftPanel', { main: 'categories' });
  }
});

FlowRouter.route('/mastersettings/tags/:id', {
  name: 'tags',
  title: 'Leaders Bridge-Master Settings',
  action() {
    BlazeLayout.render('leftPanel', { main: 'tags' });
  }
});

FlowRouter.route('/mastersettings/languages/:id', {
  name: 'languages',
  title: 'Leaders Bridge-Master Settings',
  action() {
    BlazeLayout.render('leftPanel', { main: 'languages' });
  }
});

// CMS routes
FlowRouter.route('/cms', {
  name: 'cms',
  title: 'Leaders Bridge-CMS',
  action() {
    BlazeLayout.render('leftPanel', { main: 'cms' });
  }
});

FlowRouter.route('/cms/pages/:name', {
  name: 'cms',
  title: 'Leaders Bridge-CMS PAGES',
  action() {
    BlazeLayout.render('CMSlayout');
  }
});

FlowRouter.route('/cms/edit-cms/:id', {
  name: 'cms',
  title: 'Leaders Bridge-Edit CMS',
  action() {
    BlazeLayout.render('leftPanel', { main: 'editCms' });
  }
});

// User management routes
FlowRouter.route('/usermanagement', {
  name: 'usermanagement',
  title: 'Leaders Bridge-User Management',
  action() {
    BlazeLayout.render('leftPanel', { main: 'userManagement' });
  }
});

FlowRouter.route('/usermanagement/add-users', {
  name: 'usermanagement',
  title: 'Leaders Bridge-Add Users',
  action() {
    BlazeLayout.render('leftPanel', { main: 'addUser' });
  }
});

FlowRouter.route('/usermanagement/view/:id', {
  name: 'usermanagement',
  title: 'Leaders Bridge-View User',
  action() {
    BlazeLayout.render('leftPanel', { main: 'viewUser' });
  }
});

FlowRouter.route('/usermanagement/edit/:id', {
  name: 'usermanagement',
  title: 'Leaders Bridge-User Management',
  action() {
    BlazeLayout.render('leftPanel', { main: 'userManagement' });
  }
});

FlowRouter.route('/usermanagement/delete/:id', {
  name: 'usermanagement',
  title: 'Leaders Bridge-User Management',
  action() {
    BlazeLayout.render('leftPanel', { main: 'userManagement' });
  }
});

FlowRouter.route('/usermanagement/filter-users', {
  name: 'usermanagement',
  title: 'Leaders Bridge-Filter Users',
  action() {
    BlazeLayout.render('leftPanel', { main: 'underCons' });
  }
});

// Story management routes
FlowRouter.route('/storymanagement', {
  name: 'storymanagement',
  title: 'Leaders Bridge-Story Management',
  action() {
    BlazeLayout.render('leftPanel', { main: 'storyManagement' });
  }
});

FlowRouter.route('/storymanagement/view/:id', {
  name: 'storymanagement',
  title: 'Leaders Bridge-View Story',
  action() {
    BlazeLayout.render('leftPanel', { main: 'viewStory' });
  }
});

FlowRouter.route('/storymanagement/edit/:id', {
  name: 'storymanagement',
  title: 'Leaders Bridge-Edit Story',
  action() {
    BlazeLayout.render('leftPanel', { main: 'editStory' });
  }
});

FlowRouter.route('/storymanagement/addblog', {
  name: 'storymanagement',
  title: 'Leaders Bridge-Add Story',
  action() {
    BlazeLayout.render('leftPanel', { main: 'addStory' });
  }
});

// A/V management routes
FlowRouter.route('/mediamanagement', {
  name: 'audiovideomanagement',
  title: 'Leaders Bridge-Media Management',
  action() {
    BlazeLayout.render('leftPanel', { main: 'audiovideoManagement' });
  }
});

FlowRouter.route('/mediamanagement/view/:id', {
  name: 'audiovideomanagement',
  title: 'Leaders Bridge-View Media',
  action() {
    BlazeLayout.render('leftPanel', { main: 'viewMedia' });
  }
});

FlowRouter.route('/mediamanagement/edit/:id', {
  name: 'audiovideomanagement',
  title: 'Leaders Bridge-Edit Media',
  action() {
    BlazeLayout.render('leftPanel', { main: 'editMedia' });
  }
});

FlowRouter.route('/mediamanagement/addmedia', {
  name: 'audiovideomanagement',
  title: 'Leaders Bridge-Add Media',
  action() {
    BlazeLayout.render('leftPanel', { main: 'addMedia' });
  }
});

// User Submission
FlowRouter.route('/usersubmission', {
  name: 'usersubmission',
  title: 'Leaders Bridge-User Submission',
  action() {
    BlazeLayout.render('leftPanel', { main: 'usersubmission' });
  }
});

FlowRouter.route('/usersubmission/view/:id', {
  name: 'usersubmission',
  title: 'Leaders Bridge-View User Submission',
  action() {
    BlazeLayout.render('leftPanel', { main: 'viewUsersubmission' });
  }
});

FlowRouter.route('/submitStory', {
  name: 'submissionForm',
  title: 'Leaders Bridge-User Submission',
  action() {
    BlazeLayout.render('submissionForm');
  }
});

// Staff Management
FlowRouter.route('/staffmanagement', {
  name: 'staffmanagement',
  title: 'Leaders Bridge-Staff Management',
  action() {
    BlazeLayout.render('leftPanel', { main: 'staffManagement' });
  }
});

FlowRouter.route('/staffmanagement/view/:id', {
  name: 'staffmanagement',
  title: 'Leaders Bridge-View Staff',
  action() {
    BlazeLayout.render('leftPanel', { main: 'viewStaff' });
  }
});

FlowRouter.route('/staffmanagement/edit/:id', {
  name: 'staffmanagement',
  title: 'Leaders Bridge-Edit Staff',
  action() {
    BlazeLayout.render('leftPanel', { main: 'editStaff' });
  }
});

FlowRouter.route('/staffmanagement/addstaff', {
  name: 'staffmanagement',
  title: 'Leaders Bridge-Add Staff',
  action() {
    BlazeLayout.render('leftPanel', { main: 'addStaff' });
  }
});

// 404 Error
FlowRouter.notFound = {
  name: '404',
  title: 'Leaders Bridge-Not Found',
  action() {
    BlazeLayout.render('notFound');
  }
};

// Under Construction Route
FlowRouter.route('/uc', {
  name: 'uc',
  title: 'Leaders Bridge-Under Construction',
  action() {
    BlazeLayout.render('leftPanel', { main: 'underCons' });
  }
});

// Misc
if (Meteor.isClient) {
  new FlowRouterTitle(FlowRouter);
}
