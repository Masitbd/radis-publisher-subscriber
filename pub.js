const express = require('express')

const redis = require('redis')
const app = express()

let publisher = redis.createClient({
    url: 'redis://localhost:6379'
})

publisher.on('error', (err)=>console.log('Redia error'))
publisher.on('connect', (err)=>console.log('Redis Connected'))


const connect = async()=>{
    await publisher.connect()
}

connect()

app.get('/', (req, res)=>{
   res.send({
    msg: 'Publisher active fro port 3001'
   }) 
})
app.get('/publish', async(req, res)=>{
    const id = Math.floor(Math.random()*10)
    const data = {
        id,
        message: `Messaage - ${id}`
    }

    await publisher.publish('Message', JSON.stringify(data))
    res.send({
        message: 'Data published'
    })
})

app.listen(3001, ()=>{
    console.log('server run on 3001')
})