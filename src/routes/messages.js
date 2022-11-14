import express from 'express'
import { deleteMessage } from '../controllers/messages/delete.js'
import { getMessages } from '../controllers/messages/get.js'
import { postMessage } from '../controllers/messages/post.js'
import { messagePut } from '../controllers/messages/put.js'

const messagesRouter = express.Router()

messagesRouter.get('/', getMessages)
messagesRouter.post('/', postMessage)
messagesRouter.delete('/:id', deleteMessage)
messagesRouter.put('/:id', messagePut)

export default messagesRouter
