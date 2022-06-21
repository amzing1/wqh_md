import 'dotenv/config'
import { app } from './app'
import mongoose from 'mongoose'

process.on('unhandledRejection', err => {
  console.log(err)
  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', err => {
  console.log(err)
  server.close(() => {
    process.exit(1)
  })
})

mongoose
  .connect('mongodb://localhost:27017/video-test')
  .then(con => {
    console.log('connect db sucess!')
  })
  .catch(err => {
    console.log(err)
  })

const server = app.listen(Number(process.env.PORT), '127.0.0.1', () => {
  console.log(`server start running at ${process.env.PORT}`)
})
