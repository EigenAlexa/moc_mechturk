Session.set('tutorialEnabled', true);
var emitter = new EventEmitter();

var tutorialSteps = [
  {
    template: Template.tut,
    onLoad: function() { console.log("The tutorial has started!"); },
  },
];
function getWidth(width) {
  console.log('widthy width', width);
  if (!width) {
    return Math.min($(window).width(), 530);
  } else {
    return Math.min($(window).width(), parseInt(width));
  }
}
Template.iframe.helpers({
	calcWidth : getWidth, 
	calcHeight: function(width) {

		return Math.floor(getWidth(width) / 640 * 358);
	}
})
Template.displayConversation.helpers({
	tutorialEnabled: function() {
			return Session.get('tutorialEnabled')
	},
  options: {
    steps: tutorialSteps,
    onFinish: function(){
      Meteor.setTimeout( function () {
        // Test debouncing
        Session.set('tutorialEnabled', false);
      }, 1000);
    }
  }
});

Template.gameInstructions.events({
  'click .tutButton' : function(e) {
    Session.set('tutorialEnabled', true);
  }
});
