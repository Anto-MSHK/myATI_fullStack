import { Schema } from 'mongoose'
import * as mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const TeacherSchema = new Schema({
  name: { type: String, required: true, unique: true },
  degree: { type: String },
  subjects_id: [{ type: ObjectId, ref: 'Subject' }],
})

export default TeacherSchema
