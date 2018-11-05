import { prop } from 'ramda'
import { altState } from './utils'

const status		= prop('status')

const page			= prop('page')


const auth = altState('auth', { status, page})

export default auth