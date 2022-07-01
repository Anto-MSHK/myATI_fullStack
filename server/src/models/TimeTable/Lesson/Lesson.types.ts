import { Document } from 'mongoose'
import { ObjectId } from 'mongodb'

export type byWeek = {
  subject_id: ObjectId
  type?: string
  teachers_id: ObjectId[]
  cabinet_id?: ObjectId
}

export interface ILesson {
  count: string
  time: string
  day_id: string
  data: {
    topWeek: byWeek
    lowerWeek?: byWeek
  }
}

export interface ILessonDocument extends ILesson, Document {}
