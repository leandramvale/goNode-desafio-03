const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Comment', CommentSchema);
