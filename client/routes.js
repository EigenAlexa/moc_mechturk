Router.configure({
  layoutTemplate: 'defaultLayout'
});

Router.route('/', function() {
  this.render('home');
});

Router.route('/lobby', function() {
  this.render('lobby');
});

Router.route('/experiment', {
  waitOn: function() {
    // Group should never change here, but just in case
    var group = TurkServer.group();
    if(group == null) return;
    return Meteor.subscribe('annotations', group);
  },
  template: 'experiment'
});

Router.route('/survey', function() {
  this.render('survey');
});
Router.route('/createHit', function() {
  if (TurkServer.isAdmin()){
    Meteor.subscribe('hitts');
    this.render('createHIT');
  } 
});

Tracker.autorun(function() {
  if (TurkServer.inLobby()) {
    Router.go('/lobby');
  } else if (TurkServer.inExperiment()) {
    Router.go('/experiment');
  } else if (TurkServer.inExitSurvey()) {
    Router.go('/survey');
  }
});
