import { Meteor } from 'meteor/meteor';

// Set up recruiting and experiment batches
Meteor.startup(function () {


  TurkServer.ensureBatchExists({name: 'main', active: true});

  var batch = TurkServer.Batch.getBatchByName("main");
  batch.setAssigner(new TurkServer.Assigners.SimpleAssigner);
});

