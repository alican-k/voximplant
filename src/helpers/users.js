let choise = 1

const users = [
	{
		userName: 'alican',
		email	: 'alican@talentenvoyapp.talentenvoy.voximplant.com',
		password: '00000000'
	}, {
		userName: 'alicancandidate',
		email	: 'alicancandidate@talentenvoyapp.talentenvoy.voximplant.com',
		password: '00000000'
	}
]

const selectUser = userIndex => {
	choise = userIndex
	console.log('me: ', getMe())
	console.log('callee: ', getCallee())	
}

const getMe = () => users[choise]
const getCallee = () => users[(choise + 1) % 2]

export default { selectUser, getCallee, getMe }
