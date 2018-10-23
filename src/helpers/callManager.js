let _call = null

const setCall = call => {
	_call = call
	return _call
}

const getCall = () => _call

export default {
	setCall, getCall
}