import {
  BT_addSubject,
  BT_addTeacher,
  BT_addCabinet,
  QT_uniformTypes,
  BT_changeCabinet,
  BT_changeTeacher,
  BT_changeSubject,
} from '@src/routes/eduStructureRouter/eduStructure.types'
import { RequestHandler } from 'express'
import { RT } from '@src/routes/resTypes'
import { validationController } from './validationController'
import EduStructureService from '@src/services/EduStructureService'
import { errorsMSG } from '../exceptions/API/errorsConst'
import { ApiError } from '../exceptions/API/api-error'

type ofChange = RequestHandler<
  Record<string, any>,
  RT,
  BT_changeSubject | BT_changeTeacher | BT_changeCabinet,
  QT_uniformTypes
>
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
