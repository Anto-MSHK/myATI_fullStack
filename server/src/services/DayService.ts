import Lesson from '@src/models/eduStructure/Lesson/Lesson.model'
import { byWeek } from '@src/models/eduStructure/Lesson/Lesson.types'
import { errorsMSG } from '../exceptions/API/errorsConst'
import { ApiError } from '../exceptions/API/api-error'
import { ObjectId } from 'mongodb'
import { times } from '@src/routes/scheduleRouter/schedule.types'
class DayService {
  deleteLessons = async (day_id: ObjectId) => {
    if (day_id) await Lesson.deleteMany({ day_id })
  }
}
export default new DayService()
