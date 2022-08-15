import express, { NextFunction } from 'express'
import videoRouter from './routes/Video'
import userRouter from './routes/User'
import bodyParser from 'body-parser'
import { ApiError } from './utils/ApiError'
import { globalErrorHandler } from './control/errorController'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'

export const app = express()

app.use(cors())
app.use(helmet())

app.use(bodyParser.json())

const limit = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'you can not visit too many times in this ip'
})

app.use(express.static(`${__dirname}/public`))

app.use('/api', limit)

app.use(
  hpp({
    whitelist: ['age']
  })
)

app.use('/api/v1/users', userRouter)
app.use('/api/v1/videos', videoRouter)

app.all('*', (req, res, next) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server`))
})

app.use(globalErrorHandler)
