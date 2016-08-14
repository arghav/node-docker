'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true},
  high_priority: { type: Boolean, default: false },
  date: { type: Date, default: null },
  is_done: { type: Boolean, default: false },
  is_archived: { type: Boolean, default: false }
}, {
  collection: 'tasks',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const updatableFields = [
  'title', 'high_priority', 'date', 'is_done', 'is_archived'
];

taskSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    return {
      id: ret._id,
      title: ret.title,
      is_done: ret.is_done,
      is_archived: ret.is_archived,
      high_priority: ret.high_priority,
      date: ret.date,
      created_at: ret.created_at.getTime(),
      updated_at: ret.updated_at.getTime()
    };
  }
});

var Task = mongoose.model('Task', taskSchema);

module.exports.get = function (id) {
  return new Promise(function (resolve, reject) {
    Task.findById(id).exec().then(function (resource) {
      resolve(resource);
    }).catch(function (error) {
      reject(error);
    });
  });
};

module.exports.getAll = function (sinceId, limit) {
  limit = !limit ? 10 : limit;

  let query = {};
  if (sinceId) {
    sinceId = new mongoose.Types.ObjectId(sinceId);
    query._id = { $gt: sinceId };
  }
  
  return new Promise(function (resolve, reject) {
    Task.find(query).limit(limit).exec().then(function (resource) {
      resolve(resource);
    }).catch(function (error) {
      reject(error);
    });
  });
};

module.exports.post = function (data) {
  return new Promise(function (resolve, reject) {
    const task = new Task(data);
    
    task.save().then(function (resource) {
      resolve(resource);
    }).catch(function (error) {
      console.log(error);
      reject(error);
    });
  });
};

module.exports.put = function (id, data) {
  return new Promise(function (resolve, reject) {
    Task.findById(id).exec().then(function (resource) {
      if (!resource) resolve(resource);
      
      const task = resource;
      Object.keys(data).forEach(function(key) {
        if (updatableFields.indexOf(key) > -1) {
          task[key] = data[key];
        }
      });
      
      task.save().then(function (resource) {
        resolve(resource);
      }).catch(function (error) {
        reject(error);
      });
    }).catch(function (error) {
      reject(error);
    });
  });
};

module.exports.delete = function (id) {
  return new Promise(function (resolve, reject) {
    Task.findById(id).exec().then(function (resource) {
      if (!resource) resolve(resource);
      
      const task = resource;
      task.remove().then(function (resource) {
        resolve(resource);
      }).catch(function (error) {
        reject(error);
      });
    }).catch(function (error) {
      reject(error);
    });
  });
};
