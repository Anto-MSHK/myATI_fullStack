import { RT } from '@src/routes/resTypes'
import Subject from '@src/models/eduStructure/Subject/Subject.model'
import Teacher from '@src/models/eduStructure/Teacher/Teacher.model'
import Cabinet from '@src/models/eduStructure/Cabinet/Cabinet.model'
import { BT_uniformTypes, QT_uniformTypes } from '@src/routes/eduStructureRouter/eduStructure.types'
import { ISubjectDocument } from '@src/models/eduStructure/Subject/Subject.types'
import { ITeacherDocument } from '@src/models/eduStructure/Teacher/Teacher.types'
import { ICabinetDocument } from '@src/models/eduStructure/Cabinet/Cabinet.types'
import { Model, Models } from 'mongoose'
import { errorsMSG } from '../exceptions/API/errorsConst'
import { ObjectId } from 'mongodb'
import { ApiError } from '../exceptions/API/api-error'

class EduStructureService<model = ISubjectDocument | ITeacherDocument | ICabinetDocument> {
  datatype: Model<model>
  body: BT_uniformTypes | undefined
  query: QT_uniformTypes | undefined

  constructor(type: Model<model>, body?: BT_uniformTypes | undefined, query?: QT_uniformTypes) {
    if (!type) {
      throw new Error('UNKNOWN_ERROR')
    }
    this.datatype = type
    this.body = body
    this.query = query
    this.add = this.add.bind(this)
    this.addSubjectToTeacher = this.addSubjectToTeacher.bind(this)
    this.addCabinetToSubject = this.addCabinetToSubject.bind(this)
    this.addTypeLessonToSubject = this.addTypeLessonToSubject.bind(this)
    this.change = this.change.bind(this)
    this.delete = this.delete.bind(this)
  }

  getById = async (id: ObjectId | undefined) => {
    try {
      // if (!id) {
      //   return 'нет данных'
      // }
      const candidate = await this.datatype.findById({ _id: id })
      // if (!candidate) {
      //   return 'нет данных'
      // }

      switch (this.datatype.modelName) {
        case 'Subject':
          return (candidate as ISubjectDocument).title
        case 'Teacher':
          return { name: (candidate as ITeacherDocument).name, degree: (candidate as ITeacherDocument).degree }
        case 'Cabinet':
          return (candidate as ICabinetDocument).item
        default:
          return 'нет данных'
      }
    } catch (e: any) {
      return 'нет данных'
    }
  }

  add = async () => {
    try {
      if (!this.body) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }

      if (!(this.body as any)[Object.keys(this.body)[0]]) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }
      var a = Object.keys(this.body)[0],
        b = Object.values(this.body)[0]
      const candidate = await (this.datatype as any).findOne(
        {
          [a]: b,
        }
        //   { runValidators: true, context: 'query' }
      )

      if (candidate) {
        return {
          isAlreadyExist: true,
          result: candidate._id,
        }
      } else {
        const model = new this.datatype({
          ...this.body,
        })

        await model.save()
        return { isAlreadyExist: false, result: model._id }
      }
    } catch (e: any) {
      return { result: undefined }
    }
  }

  addSubjectToTeacher = async (name: string | undefined) => {
    try {
      if (!this.body) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }

      if (!(this.body as any)[Object.keys(this.body)[0]]) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }

      var title = Object.values(this.body)[0]
      const candidate = await Subject.findOne({
        title: title,
      })

      if (!candidate) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }

      const teacherCandidate = await Teacher.findOne({
        name: name,
      })

      if (!teacherCandidate) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }

      var id = candidate._id
      await teacherCandidate?.updateOne({ $addToSet: { subjects_id: id } })

      return { result: teacherCandidate }
    } catch (e: any) {
      return { result: undefined }
    }
  }

  addCabinetToSubject = async (title: string | undefined) => {
    try {
      if (!this.body) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }

      if (!(this.body as any)[Object.keys(this.body)[0]]) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }

      var item = Object.values(this.body)[0]
      const candidate = await Cabinet.findOne({
        item: item,
      })

      if (!candidate) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }

      const subjectCandidate = await Subject.findOne({
        title: title,
      })

      if (!subjectCandidate) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }

      var id = candidate._id
      await subjectCandidate?.updateOne({ $addToSet: { cabinets_id: id } })

      return { result: subjectCandidate }
    } catch (e: any) {
      return { result: undefined }
    }
  }

  addTypeLessonToSubject = async (type: string | undefined) => {
    try {
      if (!this.body) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }

      if (!(this.body as any)[Object.keys(this.body)[0]]) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }

      var title = Object.values(this.body)[0]
      const candidate = await Subject.findOne({
        title: title,
      })

      if (!candidate) {
        throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
      }

      await candidate?.updateOne({ $addToSet: { types: type } })

      return { result: candidate }
    } catch (e: any) {
      return { result: undefined }
    }
  }

  change = async () => {
    if (!this.body) {
      throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
    }
    const candidate = await this.datatype.findOne(this.query)
    if (!candidate) {
      throw ApiError.INVALID_DATA(errorsMSG.NOT_EXIST)
    }

    await candidate.updateOne(this.body)
  }

  delete = async () => {
    const candidate = await this.datatype.findOne(this.query)

    if (!candidate) {
      throw ApiError.INVALID_DATA(errorsMSG.NOT_EXIST)
    }

    switch (candidate.collection.collectionName) {
      case 'subjects':
        await Teacher.findOneAndUpdate(
          { subjects_id: { $elemMatch: { $eq: candidate._id } } },
          { $pull: { subjects_id: candidate._id } }
        )
        break
      case 'cabinets':
        await Subject.findOneAndUpdate(
          { cabinets_id: { $elemMatch: { $eq: candidate._id } } },
          { $pull: { cabinets_id: candidate._id } }
        )
        break
      default:
        throw Error('Incorrect collection name: ' + candidate.collection.collectionName)
    }

    await candidate.delete()
  }
}
export default EduStructureService
