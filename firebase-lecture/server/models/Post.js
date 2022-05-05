import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    imgUrl: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

PostSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
