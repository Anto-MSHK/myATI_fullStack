import { validationController } from '../validationController'
import { RequestHandler } from 'express'
import { RT } from '@src/routes/resTypes'
import { QT_getScheduleByGroup, QT_getScheduleByTeacher } from '@src/routes/scheduleRouter/schedule.types'
import Group from '@src/models/Group/Group.model'
import { IDayDocument } from '@src/models/TimeTable/Day/Day.types'
import Day from '@src/models/TimeTable/Day/Day.model'
import { errorsMSG } from '../../exceptions/API/errorsConst'
import Lesson from '@src/models/TimeTable/Lesson/Lesson.model'
import { ILessonDocument } from '../../models/TimeTable/Lesson/Lesson.types'
import Subject from '@src/models/TimeTable/Subject/Subject.model'
import Teacher from '@src/models/TimeTable/Teacher/Teacher.model'
import Cabinet from '@src/models/TimeTable/Cabinet/Cabinet.model'
import { subject, teacher, lessonDataG, lessonDataT, lessonG, lessonT, dayG, dayT } from './types'
import EduStructureService from '@src/services/EduStructureService'
import { ApiError } from '../../exceptions/API/api-error'

type resultG = dayG[]
type resultT = dayT[]

var SubjectService = new EduStructureService(Subject)
var TeacherService = new EduStructureService(Teacher)
var CabinetService = new EduStructureService(Cabinet)

class ScheduleController {
  getScheduleByGroup: RequestHandler<Record<string, any>, RT<resultG>, any, QT_getScheduleByGroup> = async (
    req,
    res,
    next
  ) => {
    try {
      validationController(req, res)

      const { name } = req.query

      var group = await Group.findOne({ name })

      if (!group) throw ApiError.INVALID_DATA(errorsMSG.NOT_EXIST)

      var days: IDayDocument[] = await Day.find({ group_id: group._id })
      var result: resultG = []
      await Promise.all(
        days.map(async day => {
          let lessonsDB: ILessonDocument[] = await Lesson.find({ day_id: day._id })
          var lessons: (lessonG | undefined)[] = await Promise.all(
            lessonsDB.map(async lesson => {
              //* >=|=> top week <=|=<

              let dataTop: lessonDataG = undefined
              let dataLower: lessonDataG = undefined
              //? ==< subject >==
              let subject: subject = { title: '' }
              subject.title = await SubjectService.getById(lesson.data.topWeek.subject_id).then(result => {
                return result as string
              })
              subject.type = lesson.data.topWeek.type

              if (subject.title !== 'нет данных') {
                //? ==< teachers >==
                let teachers: teacher[] = []
                await TeacherService.getById(lesson.data.topWeek.teachers_id).then(result => {
                  teachers.push(result as teacher)
                })

                //? ==< cabinet >==
                let cabinet: string = ''
                cabinet = await CabinetService.getById(lesson.data.topWeek.cabinet_id).then(result => {
                  return result as string
                })

                //? ==< data >==
                dataTop = {
                  subject,
                  teachers,
                  cabinet,
                }
              } else dataTop = undefined

              var isLowerWeek = await Lesson.find({ _id: lesson._id, 'data.lowerWeek': { $exists: true } })
              if (!lesson.data.lowerWeek || isLowerWeek.length === 0) {
                return {
                  count: +lesson.count + 1 + '',
                  time: lesson.time,
                  data: { topWeek: dataTop },
                } as lessonG
              }
              //* >=|=> lower week <=|=<

              //? ==< subject >==
              let subjectLower: subject = { title: '' }
              subjectLower.title = await SubjectService.getById(lesson.data.lowerWeek.subject_id).then(result => {
                return result as string
              })
              subjectLower.type = lesson.data.lowerWeek.type

              //? ==< teachers >==
              let teachersLower: teacher[] = []
              await TeacherService.getById(lesson.data.lowerWeek.teachers_id).then(result => {
                teachersLower.push(result as teacher)
              })

              //? ==< cabinet >==
              let cabinetLower: string = ''
              cabinetLower = await CabinetService.getById(lesson.data.lowerWeek.cabinet_id).then(result => {
                return result as string
              })
              //? ==< data >==
              if (subjectLower.title !== 'нет данных')
                dataLower = {
                  subject: subjectLower,
                  teachers: teachersLower,
                  cabinet: cabinetLower,
                }
              else dataLower = 'none'

              return {
                count: +lesson.count + 1 + '',
                time: lesson.time,
                data: { topWeek: dataTop, lowerWeek: dataLower },
              } as lessonG
            })
          )
          lessons.sort((a, b) => {
            var aS = 0,
              bS = 0
            a && (aS = +a?.count)
            b && (bS = +b?.count)
            return aS - bS
          })
          result.push({
            dayOfWeek: day.dayOfWeek,
            isWeekend: day.isWeekend,
            lessons: lessons,
          })
        })
      )

      return res.json({ status: 'OK', result })
    } catch (e) {
      next(e)
    }
  }
  getScheduleByTeacher: RequestHandler<Record<string, any>, RT<any>, any, QT_getScheduleByTeacher> = async (
    req,
    res,
    next
  ) => {
    try {
      validationController(req, res)

      const { name } = req.query

      var teacher = await Teacher.findOne({ name })

      if (!teacher || teacher === null) throw ApiError.INVALID_DATA(errorsMSG.NOT_EXIST)

      var lessons = await Lesson.find({
        $or: [
          {
            'data.topWeek.teachers_id': { $elemMatch: { $eq: teacher._id } },
          },
          {
            'data.lowerWeek.teachers_id': { $elemMatch: { $eq: teacher._id } },
          },
        ],
      })

      let check: string[] = []
      var daysDB: (IDayDocument | undefined)[] = await Promise.all(
        lessons.map(async lesson => {
          return await Day.findById(lesson.day_id)
        })
      ).then(res => {
        return res.map(r => {
          if (r !== null && check.indexOf(r?._id + '') === -1) {
            check.push(r?._id + '')
            return r
          }
        })
      })

      var daysByWeek: dayT[] = []

      for (let i = 0; i < 6; i++) {
        daysByWeek[i] = {
          dayOfWeek: i + '',
          lessons: [],
        }
        await Promise.all(
          daysDB.map(async dayDB => {
            if (!dayDB?.dayOfWeek || dayDB.dayOfWeek !== i + '') return

            let group = await Group.findById(dayDB.group_id)
            if (!group) return

            if (teacher) {
              var lessonsDB = await Lesson.find({
                day_id: dayDB._id,
                $or: [
                  {
                    'data.topWeek.teachers_id': { $elemMatch: { $eq: teacher._id } },
                  },
                  {
                    'data.lowerWeek.teachers_id': { $elemMatch: { $eq: teacher._id } },
                  },
                ],
              })

              let lessons = await Promise.all(
                lessonsDB.map(async lessonDB => {
                  let teacherNames_Top: string[] = []
                  let teacherNames_Lower: string[] = []

                  await Teacher.findById(lessonDB.data.topWeek.teachers_id).then(res => {
                    if (res && res.name) teacherNames_Top.push(res.name)
                  })
                  if (lessonDB.data.lowerWeek)
                    await Teacher.findById(lessonDB.data.lowerWeek.teachers_id).then(res => {
                      if (res && res.name) teacherNames_Lower.push(res.name)
                    })

                  if (!teacher) return undefined

                  let dataTop: lessonDataT = undefined
                  let dataLower: lessonDataT = undefined

                  if (teacherNames_Top.indexOf(teacher.name) !== -1) {
                    let subject: subject = { title: '' }
                    subject.title = await SubjectService.getById(lessonDB.data.topWeek.subject_id).then(result => {
                      return result as string
                    })
                    subject.type = lessonDB.data.topWeek.type

                    let cabinet: string = ''
                    cabinet = await CabinetService.getById(lessonDB.data.topWeek.cabinet_id).then(result => {
                      return result as string
                    })

                    //? ==< data >==
                    dataTop = {
                      subject,
                      cabinet,
                    }
                  } else dataTop = undefined

                  if (!lessonDB.data.lowerWeek) return undefined

                  //* >=|=> lower week <=|=<
                  //? ==< subject >==
                  if (teacherNames_Lower.indexOf(teacher.name) !== -1) {
                    let subjectLower: subject = { title: '' }
                    subjectLower.title = await SubjectService.getById(lessonDB.data.lowerWeek.subject_id).then(
                      result => {
                        return result as string
                      }
                    )
                    subjectLower.type = lessonDB.data.lowerWeek.type

                    //? ==< cabinet >==
                    let cabinetLower: string = ''
                    cabinetLower = await CabinetService.getById(lessonDB.data.lowerWeek.cabinet_id).then(result => {
                      return result as string
                    })

                    //? ==< data >==
                    dataLower = {
                      subject: subjectLower,
                      cabinet: cabinetLower,
                    }
                  } else dataLower = undefined
                  if (group)
                    return {
                      count: lessonDB.count,
                      time: lessonDB.time,
                      group: group.name,
                      data: { topWeek: dataTop, lowerWeek: dataLower },
                    } as lessonT
                })
              )

              daysByWeek[i].lessons.push(...lessons)
            }
          })
        )
      }

      return res.json({ status: 'OK', result: daysByWeek })
    } catch (e) {
      next(e)
    }
  }
}

export default new ScheduleController()
