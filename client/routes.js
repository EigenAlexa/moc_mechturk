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
    console.log(group);
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

Router.route('/viewHIT/:_groupID', {
  waitOn:  function () {
    var params = this.params; // { _id: "5" }
    var id = params._groupID; // "5"
       if (TurkServer.isAdmin()){
        console.log(id);
        return Meteor.subscribe('annotations');
      }
    },
  template: 'viewHIT'
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
