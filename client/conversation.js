
import { Session } from 'meteor/session'
import { Annotations } from '/common/models'


function getConversation(){
	/* Gets the convesattion mongo documentatiuon */
	var conv_text = Annotations.findOne();
	if(!conv_text)
		return [ {"text": "LOADING GROUP", "tokens": ["LOADING"], "annotationData": []}];
	else
		return conv_text["convo"];
}


function updateUtterance(uid, newUtterannce){
	var conv_text = Annotations.findOne();
	_id = conv_text._id
	Meteor.call("updateAnnotation", _id, uid, newUtterannce);
}


Template.displayConversation.onCreated(function(){
	this.focused_uid = new ReactiveVar(0);
	this.expandedLength = new ReactiveVar(10);
	var _this = this;

	Meteor.call('getMOCTaxonomy', function(err, data) {
	  if(err) {
	  	console.log(err);
	    // Handle error
	  }
	  else {
	  	 Session.set('MOCTaxonomy', data);
	  }
	});

});

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function goToElem(elem){
	if(!checkVisible($(elem)[0]))
		$('html,body').animate({
		  scrollTop: $(elem).offset().top +100
		}, 10);
}


Template.displayConversation.events({
	'click #next_utterance': function(){
		var convo = getConversation();
		var focused_uid = Template.instance().focused_uid.get();
		var expandedLength = Template.instance().expandedLength.get();

		var newid = Math.min(focused_uid + 1,  convo.length)
		Template.instance().focused_uid.set(newid);
		Template.instance().expandedLength.set(Math.max(newid, expandedLength));

		goToElem('.focusedUtteranceText');
		
		$(window).scroll(function() {
		    $('#utteranceAnnotationTool').css('top', $(this).scrollTop() + "px");
		});

	},
	'click #prev_utterance': function(){
		var focused_uid = Template.instance().focused_uid.get();
		newid = Math.max(focused_uid -1, 0)
		Template.instance().focused_uid.set(newid);

		goToElem('.focusedUtteranceText');

		$(window).scroll(function() {
		    $('#utteranceAnnotationTool').css('top', $(this).scrollTop()+ "px");
		});
	},
	'click .utteranceText': function(e, t){
		var newid = parseInt($(e.target)[0].id);
		Template.instance().focused_uid.set(newid);

		goToElem('.focusedUtteranceText');

		$(window).scroll(function() {
		    $('#utteranceAnnotationTool').css('top', $(this).scrollTop()+ "px");
		});
	},
	'click .selectCategory':  function(e, t) {
		var conv = getConversation();
		var focused_uid = Template.instance().focused_uid.get();
		var taxonomy = Session.get("MOCTaxonomy");

		utterance = conv[focused_uid];
		button_object = $(e.target)[0];
		tax_choice = button_object["value"];

		utterance["annotationData"].push(tax_choice);

		//Check to see if label was sucessful!
		annotationData = utterance['annotationData'];
		categories = taxonomy;
		for(i = 0; i < annotationData.length; i++){
			categories = categories[annotationData[i]];
		}

		annotationComplete = typeof categories === "string" || categories instanceof String;

		if(annotationComplete)
			utterance["mocLabel"] = utterance['annotationData'];
		else
			utterance["mocLabel"] = null;

		updateUtterance(focused_uid, utterance);
	},
	'click .unselectCategory':  function(e, t) {
		var focused_uid = Template.instance().focused_uid.get();
		var conv = getConversation();

		utterance = conv[focused_uid];
		button_object = $(e.target)[0];
		tax_choice = button_object["text"];

		if(tax_choice == "Root"){
			utterance["annotationData"] = [];
		}
		else{
			aData = utterance["annotationData"];
			var cut_to = 0;
			for(i = 0; i < aData.length; i++, cut_to++){
				if(aData[i] ==  tax_choice)
					break;
			}
			utterance["annotationData"] = aData.slice(0, cut_to+1);
		}
		utterance.mocLabel = null;

		updateUtterance(focused_uid, utterance);
	},
	'click #upCategory': function() {
		var focused_uid = Template.instance().focused_uid.get();
		var conv = getConversation();

		aData = utterance["annotationData"];
		utterance = conv[focused_uid];
		cut_to = aData.length -1;
		cut_to = Math.max(cut_to, 0);
		utterance["annotationData"] = aData.slice(0, cut_to);
		utterance.mocLabel = null;

		updateUtterance(focused_uid, utterance);
	},
	'click #completeTask': _.debounce(function() {
    		Meteor.call('goToExitSurvey');
	}, 1000, true),
	'click #returnHit': _.debounce(function() {
		Meteor.call('returnHIT');
	}, 1000, true)
});

Template.displayConversation.helpers({
	conversationData: function() {
		var focused_uid = Template.instance().focused_uid.get();
		var expandedLength = Template.instance().expandedLength.get();

		var conv = getConversation();

		var contracted_conv = [];
		var curspeaker = "";
		var curcontract = null;

		// Contract the conversation.
		for(i = 0; i < conv.length && i <= expandedLength; i++){
			var utterance = conv[i];
			if(curspeaker != utterance.speaker){
				curspeaker = utterance.speaker;
				if(curcontract != null){
					contracted_conv.push(curcontract);
				}

				curcontract = {
					"speaker": curspeaker,
					"subexpressions": []
				};
			}
			utterance.focused = i == focused_uid;
			utterance.id = i;

			curcontract["subexpressions"].push(utterance);
		}
		// Finally push the last contraciton.
		if(curcontract != null){
			contracted_conv.push(curcontract);
		}

		return contracted_conv;
	},
	taskComplete: function() {
		var conv = getConversation();
                console.log("task complete running");
		for(i = 0; i < conv.length; i++){
			var utterance = conv[i];
                        console.log(utterance.mocLabel);
			if(!utterance.mocLabel)
				return false;
		}
		return true;
	},
	focusedUtterance: function(){
		var conv = getConversation();
		var focused_uid = Template.instance().focused_uid.get();
		return conv[focused_uid];
	},
	mocTaxonomy: function(){
		var taxonomy = Session.get("MOCTaxonomy");

		var focused_uid = Template.instance().focused_uid.get();

		var conv = getConversation();
		utterance = conv[focused_uid];

		annotationData = utterance['annotationData'];
		categories = taxonomy;
		for(i = 0; i < annotationData.length; i++){
			categories = categories[annotationData[i]];
		}

		// Check if there do not exist subcategories.
		if(typeof categories === "string" || categories instanceof String)
			categories = [];
		else
			categories = Object.keys(categories);

		// TODO: Build recursive structure on taxonomy component.
		return {
			"categories": categories,
			"parents": ["Root"].concat(
				annotationData.slice(0,annotationData.length-1)),
			"curmoc": annotationData[annotationData.length-1]
		}
	},
	getUtteranceStyle: function(utterance){
		styles = "utteranceText ";

		if(!!utterance.focused)
			styles += " focusedUtteranceText";
		if(!!utterance.mocLabel)
			styles += " completedUtteranceText";
		else if(!!utterance.annotationData && utterance.annotationData.length > 0)
			styles += " incompleteUtteranceText";
		return styles;
	},	
	getUtteranceTooltip: function(utterance){
		if(!!utterance.mocLabel)
			return  "" + utterance.mocLabel.join(' / ');
		else if(!!utterance.annotationData && utterance.annotationData.length > 0)
			return  "" + utterance.annotationData.join(' / ');	
		else 
			return null;
	},
	not: function(value){
		return !value;
	},
	progressPercent: function(){
		var convo = getConversation();
		var len = convo.length;
		var success = 0;
		for(i = 0; i < convo.length; i++){
			if(convo[i].hasOwnProperty("mocLabel") && !!convo[i].mocLabel)
				success += 1.0;
		}
		return Math.round((success/len)*100);
	},
	canNavigateNext: function(){
		var conv = getConversation();
		var focused_uid = Template.instance().focused_uid.get();

		return  focused_uid + 1 < conv.length;
	},
	canNavigatePrev: function(){
		var focused_uid = Template.instance().focused_uid.get();

		return focused_uid - 1 >= 0;
	}

});

