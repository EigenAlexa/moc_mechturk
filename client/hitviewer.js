import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Annotations } from '/common/models';
import './hitviewer.html';


Template.viewHIT.helpers({
    hitTypes: function() {
       console.log( Annotations.findOne());
    }
});
