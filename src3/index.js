import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Navigator from './Navigator'
import { setNavigation } from './helpers/navigator'

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])
YellowBox.ignoreWarnings(['Require cycle:']);
console.disableYellowBox = true;


const Index = () =>
	<Provider store={store}>
		<Navigator ref={ref => setNavigation(ref)} />
	</Provider>

export default Index