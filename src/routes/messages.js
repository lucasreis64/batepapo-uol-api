import express from 'express'

import { getMessages } from '../controllers/messages/get.js'
import { postMessage } from '../controllers/messages/post.js'

const messagesRouter = express.Router()

messagesRouter.get('/', getMessages)
messagesRouter.post('/', postMessage)

export default messagesRouter
