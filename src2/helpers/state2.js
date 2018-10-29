import { prop, propEq } from 'ramda'
import { altState } from './utils'

const voxClientState			= prop('voxClientState')
const displayName				= prop('displayName')
const isLoggedIn				= propEq('voxClientState', 'LOGGED_IN')

export const main = altState('main', {voxClientState, displayName, isLoggedIn})