var Annotations = new Mongo.Collection('annotations');
TurkServer.partitionCollection(Annotations);

export { Annotations };