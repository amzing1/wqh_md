import express from 'express'
import {
  createVideo,
  deleteVideo,
  getVideo,
  getVideos,
  patchVideo
} from '../control/videoController'

const videoRouter = express.Router()

videoRouter.route('/').get(getVideos).post(createVideo)
videoRouter.route('/:id').get(getVideo).patch(patchVideo).delete(deleteVideo)

export default videoRouter
