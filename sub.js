const redis = require('redis');

(async ()=>{
    let subscriber = redis.createClient({
        url: 'redis://localhost:6379'
    });

    subscriber.on('error', (err)=>console.log('Redia error'))
    subscriber.on('connect', (err)=>console.log('Redis Connected'))
 

    await subscriber.connect()

})()