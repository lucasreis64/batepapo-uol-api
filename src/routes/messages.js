import express from 'express'
import { deleteMessage } from '../controllers/messages/delete.js'
import { getMessages } from '../controllers/messages/get.js'
import { postMessage } from '../controllers/messages/post.js'

const messagesRouter = express.Router()

messagesRouter.get('/', getMessages)
messagesRouter.post('/', postMessage)
messagesRouter.delete('/:id', deleteMessage)

export default messagesRouter
