import 'dotenv/config'

type Env = {
  SELF_HOST: string
  SELF_PORT: number
}

const env = process.env as unknown as Env

export default env