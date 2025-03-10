import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update doctor's average rating when a new review is added
reviewSchema.post('save', async function() {
  const Review = this.constructor;
  const Doctor = mongoose.model('Doctor');
  
  const stats = await Review.aggregate([
    { $match: { doctor: this.doctor } },
    {
      $group: {
        _id: '$doctor',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await Doctor.findByIdAndUpdate(this.doctor, {
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      totalReviews: stats[0].totalReviews
    });
  }
});

export const Review = mongoose.model('Review', reviewSchema);