import { Request, Response, NextFunction } from 'express'
import { userModel } from '../model/userModel'
import { ApiError, asyncErrorCatch } from '../utils/ApiError'
import { ApiFeature } from '../utils/ApiFeature'

const getUsers = asyncErrorCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const apiFeature = new ApiFeature(userModel.find(), req.query)
    apiFeature.filter().sort().fields().paging()

    const data = await apiFeature.getQuery()
    res.status(200).json({
      status: 'success',
      data
    })
  }
)

// const createUser = asyncErrorCatch(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const data = await userModel.create(req.body)
//     res.status(200).json({
//       status: 'success',
//       data
//     })
//   }
// )

const getUser = asyncErrorCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userModel.findById(req.params.id)
    if (!data) {
      return next(new ApiError(404, 'Not find data with this id'))
    }
    res.status(200).json({
      status: 'success',
      data
    })
  }
)

const patchUser = asyncErrorCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!data) {
      return next(new ApiError(404, 'Not find data with this id'))
    }
    res.status(200).json({
      status: 'success',
      data
    })
  }
)

const deleteUser = asyncErrorCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userModel.findByIdAndDelete(req.params.id)
    if (!data) {
      return next(new ApiError(404, 'Not find data with this id'))
    }
    res.status(200).json({
      status: 'success',
      data
    })
  }
)

const aliasOldest = (req: Request, res: Response, next: NextFunction) => {
  req.query.limit = '3'
  req.query.sort = '-age'
  next()
}

const getUserStats = asyncErrorCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const stats = await userModel.aggregate([
      {
        $match: { age: { $gte: 26 } }
      },
      {
        $group: {
          _id: null,
          age: { $avg: '$age' },
          max: { $max: '$age' },
          min: { $min: '$age' },
          sum: { $sum: '$age' }
        }
      }
    ])
    res.status(200).json({
      status: 'success',
      stats
    })
  }
)

export { getUsers, getUser, patchUser, deleteUser, aliasOldest, getUserStats }
