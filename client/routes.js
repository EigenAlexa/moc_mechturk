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
  data: function() {
   return { groupId: "", 
                     mirror: false};
  },
  template: 'experiment'
});

Router.route('/survey', function() {
  this.render('survey');
});


Router.map(function () {
    this.route('viewHIT', {
        path: 'exp/:groupId',
        waitOn: function () {
            return Meteor.subscribe("oneWayMirror", this.params.groupId);
        },
        data: function () {
            return { groupId: this.params.groupId, 
                     mirror: true}
        },
        template: 'experiment',
    });
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
