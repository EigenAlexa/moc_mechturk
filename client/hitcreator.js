import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './hitcreator.html';

 Template.createHIT.events({
    'submit .createHIT': function (e, tmpl) {
    e.preventDefault();
    var number = e.target.number.value;
    var hittypeid = e.target.hittype.value;
    for (i = 0; i<number; i++){
        Meteor.call("createHit", hittypeid); 
    }
    tmpl.find("form").reset();
    }
 });

Template.createHIT.helpers({
    hitTypes: function() {
        return HITTypes.find();
    }
});
