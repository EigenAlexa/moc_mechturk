import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

 Template.survey.events({
   'submit .survey': function (e) {
     e.preventDefault();
     var results = {
       confusing: e.target.confusing.value,
       feedback: e.target.feedback.value};
     TurkServer.submitExitSurvey(results);
   }
 });

