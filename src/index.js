import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import RootComponent from './components'

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])
YellowBox.ignoreWarnings(['Require cycle:']);
console.disableYellowBox = true;


const Index = () =>
	<Provider store={store}>
		<RootComponent />
	</Provider>

export default Index