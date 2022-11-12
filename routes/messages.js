import express from 'express'

import { getMessages, postMessage } from '../controllers/messages.js'

const messagesRouter = express.Router()

messagesRouter.get('/', getMessages)
messagesRouter.post('/', postMessage)

export default messagesRouter
