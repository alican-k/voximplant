import Sound from 'react-native-sound'

let _call = null
const _sounds = {
	ringing: null,
	calling: null
}

const setCall = call => {
	_call = call
	return _call
}
const getCall = () => {
	return _call
}

const _play = (name) => () => {
	if(_sounds[name]) return

	const file = name + '.mp3'

	_sounds[name] = new Sound(file, Sound.MAIN_BUNDLE, error => {
		if (error) {
			console.log(`failed to load ${file}: `, error)
			return
		}

		_sounds[name].setNumberOfLoops(-1)
		
		_sounds[name].play(success => {
			if(success)
				console.log(file + 'played successfully')
			else {
				console.log(file + 'playback failed due to audio decoding errors')
				_sounds[name].reset()
			}
		})
	})
}
const _kill = (name) => () => {
	if(!Boolean(_sounds[name])) return

	_sounds[name].stop(() => {
		console.log(name + ' stopped')
		_sounds[name] && _sounds[name].release()
		_sounds[name] = null
	})
}

const playCalling = _play('calling')
const killCalling = _kill('calling')

const playRinging = _play('ringing')
const killRinging = _kill('ringing')



export default {
	setCall, getCall,
	playRinging, killRinging, playCalling, killCalling
}