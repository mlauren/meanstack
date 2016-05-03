/**
 * Work model events
 */

'use strict';

import {EventEmitter} from 'events';
import Work from './work.model';
var WorkEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WorkEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Work.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WorkEvents.emit(event + ':' + doc._id, doc);
    WorkEvents.emit(event, doc);
  }
}

export default WorkEvents;
