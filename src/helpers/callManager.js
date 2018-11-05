import Sound from 'react-native-sound'

let _call = null

const _sounds = {
	ringing: null,
	calling: null
}
const _playing = {
	incoming: false,
	outgoing: false
}

const setCall = call => {
	_call = call
	return _call
}
const getCall = () => {
	return _call
}

const _play = (name) => () => {
	console.log('check if already ' + name + 'playing')
	if(_playing[name]) {
		console.log(name + ' already playing, no need to play')
		return
	}
	_playing[name] = true
	console.log('No not playing, will be played in a moment')

	const file = name === 'incoming' ? 'incoming.mp3' : 'outgoing.wav'

	_sounds[name] = new Sound(file, Sound.MAIN_BUNDLE, error => {
		if (error) {
			console.log(`failed to load ${file}: `, error)
			return
		}

		_sounds[name].setNumberOfLoops(-1)
		
		_sounds[name].play(success => {
			if(success) {
				console.log(file + 'play finished successfully')
			}
			else {
				console.log(file + 'playback failed due to audio decoding errors')
				_sounds[name].reset()
			}
		})
		_playing[name] = true
	})
}
const _kill = (name) => () => {
	console.log('check if ' + name + ' needs to be stopped')
	if(!Boolean(_playing[name])) {
		console.log('no need to stop:', _playing)
		return
	}
	 console.log('yes ' + name + ' needs to be stopped')

	_sounds[name].stop(() => {
		console.log(name + ' stopped')
		_sounds[name] && _sounds[name].release()
		_playing[name] = false
	})
}

const playOutgoing = _play('outgoing')
const killOutgoing = _kill('outgoing')

const playIncoming = _play('incoming')
const killIncoming = _kill('incoming')



export default {
	setCall, getCall,
	playIncoming, killIncoming, playOutgoing, killOutgoing
}