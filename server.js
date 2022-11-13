import express, {json} from 'express'
import cors from 'cors'
import participantsRouter from './src/routes/participants.js'
import messagesRouter from './src/routes/messages.js'
import statusRouter from './src/routes/status.js'
import { removeInactive } from './src/functions/removeInactive.js'

const app = express()
app.use(cors())
app.use(json())

app.use('/participants', participantsRouter)
app.use('/messages', messagesRouter)
app.use('/status', statusRouter)

setInterval(removeInactive, 15000)

app.listen(5000, ()=>{
    console.log('Rodando!')
})