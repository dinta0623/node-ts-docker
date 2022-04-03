require('dotenv').config()
import express, { Request, Response, Application } from 'express'
import RedisClient from './redis'

// const app: Application = express()
// const port: number | string = 8080
// const redis = new RedisClient();

// (async function () {
//     await redis.connect()
//     console.log('😎 ok')
// }())

class Server {
    app: Application
    port: any = process.env.PORT || 8080
    redis: RedisClient
    constructor() {
        this.app = express()
        this.redis = new RedisClient();
    }
    async initialize(): Promise<void> {
        await this.redis.connect().then(() => console.log('Connected to redis 😎'))
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello World!')
        })
        this.app.get('/set/:field/:value', async (req: Request, res: Response) => {
            await this.redis.set(req.params.field, req.params.value)
            return res.json({
                status: 200,
                message: `Successfully adding ${req.params.field}`
            })
        })
        this.app.get('/get/:field', async (req: Request, res: Response) => {
            const result = await this.redis.get(req.params.field)
            return res.json({
                status: 200,
                message: `Successfully requesting ${req.params.field}`,
                result: result || null
            })
        })
        this.app.listen(this.port, () => console.log('running well!'))
    }
}

(new Server()).initialize()

