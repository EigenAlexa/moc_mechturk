// https://forums.meteor.com/t/immutable-bindings-of-es6-modules/25118/5
// Otherwise d3.event is not usable.
import {
  gamePhase, 
  guessSubmitted,
  completedPhase,
} from '/client/imports/common.js';

Template.labelSentence.helpers({
  heads: function() {
    if (!Array.isArray(this)) return;
    return this.filter((h) => h).length;
  },
  total: function() {
    if (!Array.isArray(this)) return;
    return this.length;
  }
});


Template.gameResults.helpers({
  myAnswer: function() {
    const myGuess = Guesses.findOne({userId: Meteor.userId()});
    return myGuess && Math.round(myGuess.answer * 100);
  },
  myWinStatus: function() {
    const myGuess = Guesses.findOne({userId: Meteor.userId()});
    return myGuess && myGuess.payoff > 0;
  },
  myPayoff: function() {
    const myGuess = Guesses.findOne({userId: Meteor.userId()});
    return '$' + (myGuess && myGuess.payoff || 0.00).toFixed(2);
  },
  prob: function() {
    const g = Games.findOne();
    return g && Math.round(g.prob * 100);
  },
  avgGuess: function() {
    const g = Games.findOne();
    // It's OK to show a decimal here
    return g && f1(g.mean * 100);
  }
});

Template.gameResults.events({
  'click #returnToLobby': _.debounce(function() {
    Meteor.call('goToLobby');
  }, 1000, true)
});
