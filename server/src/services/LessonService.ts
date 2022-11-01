import Lesson from '@src/models/eduStructure/Lesson/Lesson.model'
import { byWeek } from '@src/models/eduStructure/Lesson/Lesson.types'
import { errorsMSG } from '../exceptions/API/errorsConst'
import { ApiError } from '../exceptions/API/api-error'
import { ObjectId } from 'mongodb'
import { times } from '@src/routes/scheduleRouter/schedule.types'
class LessonService {
  addLesson = async (
    count: number,
    day_id: string,
    data: { topWeek: byWeek; lowerWeek?: byWeek },
    time?: { from: string; to: string }
  ) => {
    const candidate = await Lesson.findOne({ day_id, count })

    if (candidate) {
      throw ApiError.INVALID_DATA(errorsMSG.OCCUPIED)
    }

    const lesson = new Lesson({
      count,
      time,
      day_id,
      data,
    })

    await lesson.save()
    //!
    !data.lowerWeek?.subject_id && (await lesson.updateOne({ $unset: { 'data.lowerWeek': 1 } }))
  }

  changeLesson = async (
    id: ObjectId,
    body: {
      count?: number
      data?: { topWeek: byWeek; lowerWeek?: byWeek }
      time?: { from: string; to: string }
    }
  ) => {
    if (!id) {
      throw ApiError.INVALID_REQUEST(errorsMSG.QUERY_NO_EMPTY)
    }

    if (!body) {
      throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
    }

    const candidate = await Lesson.findOne({ _id: new ObjectId(id) })

    if (!candidate) {
      throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
    }

    if (body.count) {
      body.time = times[body.count]
    }

    await candidate.updateOne(body)

    return { result: candidate }
  }

  deleteLessons = async (day_id: ObjectId) => {
    if (day_id) await Lesson.deleteMany({ day_id })
  }
}
export default new LessonService()
