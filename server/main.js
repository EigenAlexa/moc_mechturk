import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { mocTaxonomy } from '/server/imports/moc';
import { Annotations } from '/common/models';

// One-way mirror publication
var remoteDB = new MongoInternals.RemoteCollectionDriver(Meteor.settings.remoteConversationDBUri);
Conversations = new Mongo.Collection("conversations", { _driver: remoteDB });


var getAndCheckHitType = (hitTypeId) => {
    hitType = HITTypes.findOne({HITTypeId: hitTypeId});
    if(!hitType.HITTypeId){
        throw new Meteor.Error(403, "HITType not registered");
    }
    batch = Batches.findOne(hitType.batchId);
    if(!batch.active){
        throw new Meteor.Error(403, "Batch not active; activate it first");
    }
    return hitType;
}

Meteor.methods({
  getMOCTaxonomy: function(){
    return mocTaxonomy;
  },
  goToExitSurvey: function() {
    var exp = TurkServer.Instance.currentInstance();
    exp.teardown();
  },
  updateAnnotation: function(id, uid, update) {
    var obj = {};
    obj["convo." + String(uid)] = update;

    Annotations.update(
      {_id: id}, { $set: obj });
  },
  createHit: (hitTypeId) => {
    TurkServer.checkAdmin();
    params = {
        MaxAssignments: 1,
        LifetimeInSeconds: 172800,
    };
    var hitId = Meteor.call("ts-admin-create-hit", hitTypeId, params);
    Meteor.call("associateHit", hitId);
  },
  associateHit: (hitId) => {
    TurkServer.checkAdmin();
    query = {
        $or: [
            {assigned: {$exists: false}},
            {assigned: false}    
        ]
    };
    doc = Conversations.findOne(query);
    hit = HITs.findOne({HITId: hitId});
    if(!doc.split){
        doc.split = [];
        len = doc.convo.length;
        num = Math.round(len / 50);
        for (i=0; i < num; i++){
            doc.split.push(i * Math.round(len / num));
        }
        doc.split.push(len);
        doc.currentSplit = 0;
    }
    startInd = doc.split[doc.currentSplit];
    endInd = doc.split[doc.currentSplit + 1];
    conv = doc.convo.slice(startInd, endInd);
    doc.currentSplit = doc.currentSplit + 1;
    if (doc.currentSplit == doc.split.length - 1){
        doc.assigned = true;
    }
    if (!doc.hitIds){
        doc.hitIds = [];
    }
    doc.hitIds.push(hitId);
    hit.convo = conv;
    hit.docId = doc._id;
    Conversations.update({_id: doc._id}, doc);
    HITs.update({HITId: hitId}, hit);
    return true;
  },
  getCurrentHitId: (groupId) => {
    inst = TurkServer.Instance.getInstance(groupId);
    userId = inst.users()[0];
    asst = TurkServer.Assignment.getCurrentUserAssignment(userId);
    return asst.hitId;
  }
});

Meteor.publish('hitts', function hitTypePub(){
        return HITTypes.find();
    });
Meteor.publish('annotations', function() {
    ano =  Annotations.find();
    return ano;
});

TurkServer.initialize(function() {
    //TODO GET FROM MONGO?
    console.log("initializing");
    hitId = Meteor.call('getCurrentHitId', this.instance.groupId); 
    hit = HITs.findOne({HITId: hitId});
    // Process the mongo data.
    conv = hit.convo;
    docId = hit.docId;
    for(i = 0; i < conv.length; i++){
      conv[i]["annotationData"] = [];
      conv[i]["mocLabel"] = null;
    }
    Annotations.insert({"convo": conv, "docId": docId});

})
