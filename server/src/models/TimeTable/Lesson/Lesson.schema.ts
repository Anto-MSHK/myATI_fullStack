import { Schema } from 'mongoose'
import * as mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const topWeek = {
  subject_id: { type: ObjectId, ref: 'Subject', required: true },
  type: { type: String },
  teachers_id: [{ type: ObjectId, ref: 'Teacher', required: true }],
  cabinet_id: { type: ObjectId, ref: 'Cabinet' },
}
const lowerWeek = {
  subject_id: { type: ObjectId, ref: 'Subject' },
  type: { type: String },
  teachers_id: [{ type: ObjectId, ref: 'Teacher' }],
  cabinet_id: { type: ObjectId, ref: 'Cabinet' },
}

const LessonSchema = new Schema({
  count: { type: Number, required: true },
  time: { type: String },
  day_id: { type: ObjectId, ref: 'Message', required: true },
  data: {
    topWeek: { ...topWeek },
    lowerWeek: { ...lowerWeek },
  },
})

export default LessonSchema
