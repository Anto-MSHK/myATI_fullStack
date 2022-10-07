import {
  BT_addSubject,
  BT_addTeacher,
  BT_addCabinet,
  QT_uniformTypes,
  BT_changeCabinet,
  BT_changeTeacher,
  BT_changeSubject,
  QT_Subject,
} from '@src/routes/eduStructureRouter/eduStructure.types'
import { RequestHandler } from 'express'
import { RT } from '@src/routes/resTypes'
import { validationController } from './validationController'
import EduStructureService from '@src/services/EduStructureService'
import { errorsMSG } from '../exceptions/API/errorsConst'
import { ApiError } from '../exceptions/API/api-error'
import Subject from '@src/models/TimeTable/Subject/Subject.model'
import Cabinet from '@src/models/TimeTable/Cabinet/Cabinet.model'
import { query } from 'express-validator'

type ofChange = RequestHandler<
  Record<string, any>,
  RT,
  BT_changeSubject | BT_changeTeacher | BT_changeCabinet,
  QT_uniformTypes
>

type getSubjectT = { title: string; types: string[] | undefined; cabinets: (string | undefined)[] }
class EduStructureController {
  add =
    (model: any): RequestHandler<Record<string, any>, RT, BT_addSubject | BT_addTeacher | BT_addCabinet> =>
    async (req, res, next) => {
      try {
        validationController(req, res)

        const service = new EduStructureService(model, req.body)

        var result = await service.add()
        if (result.isAlreadyExist) throw ApiError.INVALID_DATA(errorsMSG.ALREADY_EXIST)
        return res.json({ status: 'OK', result: result.result })
      } catch (e) {
        next(e)
      }
    }

  getSubject =
    (): RequestHandler<Record<string, any>, RT<getSubjectT | getSubjectT[]>, any, QT_Subject> =>
    async (req, res, next) => {
      try {
        validationController(req, res)
        var cabArr: (string | undefined)[] = []
        if (req.query.title) {
          let result: getSubjectT
          const candidate = await Subject.findOne({ title: req.query.title })

          if (!candidate) throw ApiError.INVALID_REQUEST(errorsMSG.INCORRECT)
          cabArr = await Promise.all<any>(
            candidate.cabinets_id?.map(async (el): Promise<string | undefined> => {
              const candidateCabinet = await Cabinet.findById({ _id: el })
              if (candidateCabinet) {
                return candidateCabinet.item
              }
              return undefined
            })
          )
          result = { title: candidate.title, types: candidate.types, cabinets: cabArr }
          return res.json({ status: 'OK', result: result })
        } else {
          let result: getSubjectT[] = []
          const candidates = await Subject.find({})
          result = await Promise.all<any>(
            candidates.map(async cand => {
              cabArr = await Promise.all<any>(
                cand.cabinets_id?.map(async el => {
                  const candidateCabinet = await Cabinet.findById({ _id: el })
                  if (candidateCabinet) {
                    return candidateCabinet.item
                  }
                  return undefined
                })
              )
              return { title: cand.title, types: cand.types, cabinets: cabArr }
            })
          )
          return res.json({ status: 'OK', result: result })
        }
      } catch (e) {
        next(e)
      }
    }

  change =
    (model: any): ofChange =>
    async (req, res, next) => {
      try {
        validationController(req, res)

        const service = new EduStructureService(model, req.body, req.query)

        await service.change()
        return res.json({ status: 'OK' })
      } catch (e) {
        next(e)
      }
    }

  delete =
    (model: any): RequestHandler<Record<string, any>, RT, any, QT_uniformTypes> =>
    async (req, res, next) => {
      try {
        validationController(req, res)

        const service = new EduStructureService(model, undefined, req.query)

        await service.delete()
        return res.json({ status: 'OK' })
      } catch (e) {
        next(e)
      }
    }
}

export default new EduStructureController()
