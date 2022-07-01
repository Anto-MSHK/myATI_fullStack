import Lesson from '@src/models/TimeTable/Lesson/Lesson.model'
import { byWeek } from '@src/models/TimeTable/Lesson/Lesson.types'
import { errorsMSG } from '../exceptions/API/errorsConst'
import { ApiError } from '../exceptions/API/api-error'
class LessonService {
  addLesson = async (count: number, day_id: string, data: { topWeek: byWeek; lowerWeek?: byWeek }, time?: string) => {
    const candidate = await Lesson.findOne({ day_id, count })

    if (candidate) {
      throw ApiError.INVALID_DATA(errorsMSG.OCCUPIED)
    }

    if (!time)
      switch (count) {
        case 0:
          time = '8:30'
          break
        case 1:
          time = '10:15'
          break
        case 2:
          time = '12:30'
          break
        case 3:
          time = '14:15'
          break
        case 4:
          time = '16:00'
          break
        case 5:
          time = '17:45'
          break
        default:
          time = 'none'
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
}
export default new LessonService()
