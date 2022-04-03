import { createClient, RedisClientType } from 'redis'
export default class RedisClient {
    client: RedisClientType<any>
    constructor() {
        this.client = createClient({ url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' })
        this.init()
    }

    init(): void {
        this.client.once('error', (err: any) => console.log('Something Wrong! : ' + err))
        this.client.once('connect', () => console.log(`Successfully Connected to Redis!`))
    }

    async get(field: string): Promise<any> {
        if (field) {
            return await this.client.get(field).catch((err: any) => Promise.reject('Something wrong! : ' + err))
        }
        return null
    }

    async set(field: string, value: any): Promise<any> {
        if (field && value) {
            return await this.client.set(field, value)
        }
        return Promise.reject('field & value must not empty!')
    }

    async connect() {
        await this.client.connect()
    }
}   