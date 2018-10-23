import { AppRegistry, Platform } from 'react-native'
import Index from './src/index'
import {name as appName} from './app.json'
import bgMessaging from './bgMessaging'

AppRegistry.registerComponent(appName, () => Index)


// import { AppRegistry, Platform } from 'react-native'
// import App from './App'
// import {name as appName} from './app.json'
// import bgMessaging from './bgMessaging'



// AppRegistry.registerComponent(appName, () => App)

if(Platform.OS === 'android')
 	AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging)