import { Request, Response, NextFunction } from 'express'

function getVideos(req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    status: 'error',
    message: 'getVideos api is still building'
  })
  next()
}

function createVideo(req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    status: 'error',
    message: 'createVideo api is still building'
  })
  next()
}

function getVideo(req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    status: 'error',
    message: 'getVideo api is still building'
  })
  next()
}

function patchVideo(req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    status: 'error',
    message: 'patchVideo api is still building'
  })
  next()
}

function deleteVideo(req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    status: 'error',
    message: 'deleteVideo api is still building'
  })
  next()
}

export { getVideos, getVideo, createVideo, patchVideo, deleteVideo }
