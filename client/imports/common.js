
function delphiGame() {
  const game = Games.findOne();
  return game && game.delphi;
}
Template.registerHelper('delphiGame', delphiGame);

function gamePhase() {
  const game = Games.findOne({}, {field: {phase: 1}});
  return game && game.phase;
}

function guessSubmitted() {
  if( completedPhase() ) return true;
  const g = myGuess();
  return (delphiPhase() && g.delphi) || (finalPhase() && g.answer);
}

/**
 * Whether the current game is a delphi game and in the delphi phase.
 * @returns {boolean}
 */
function delphiPhase() {
  // Although we can compute this by looking at whether the game is delphi and some guesses are incomplete, it's easier to let the server handle it
  return gamePhase() === "delphi";
}
Template.registerHelper('delphiPhase', delphiPhase);

function finalPhase() {
  return gamePhase() === "final";
}
Template.registerHelper('finalPhase', finalPhase);

function completedPhase() {
  return gamePhase() === "completed";
}
Template.registerHelper('completedPhase', completedPhase);

function myGuess() {
  return Guesses.findOne({userId: Meteor.userId()});
}
Template.registerHelper('myGuess', myGuess);


function scrollTo(target) {
    var offset;
    var scrollSpeed = 600;
        var wheight = $(window).height();
        //var targetname = target;
        //var windowheight = $(window).height();
        //var pagecenterH = windowheight/2;
        //var targetheight = document.getElementById(targetname).offsetHeight;

    if (viewport()["width"] > 767 && !jQuery.browser.mobile) {
        // Offset anchor location and offset navigation bar if navigation is fixed
        //offset = $(target).offset().top - document.getElementById('navigation').clientHeight;
                offset = $(target).offset().top - $(window).height() / 2 + document.getElementById('navigation').clientHeight + document.getElementById('footer').clientHeight;
    } else {
        // Offset anchor location only since navigation bar is now static
        offset = $(target).offset().top;
    }

    $('html, body').animate({scrollTop:offset}, scrollSpeed);
}

export {
  delphiGame,
  gamePhase,
  delphiPhase,
  finalPhase,
  completedPhase,
  myGuess,
  scrollTo,
  guessSubmitted
};



