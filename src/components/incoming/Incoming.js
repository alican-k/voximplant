import React from 'react'
import {Image, ImageBackground, StatusBar, Text, TouchableOpacity, View} from 'react-native'
import { connect } from 'react-redux'
import {styles} from './stylesIncoming'
import Container from './Container'
import { callReject, callAnswer } from '../../actions'
import images from '../../assets/images'

class InComingCalls extends React.Component {
	constructor() {
		super()
		this.handleCallReject = this.handleCallReject.bind(this)
		this.handleCallAnswer = this.handleCallAnswer.bind(this)		
	}
	handleCallReject() {
		this.props.callReject()
	}
	handleCallAnswer() {
		console.log('acepted')
		this.props.callAnswer()
	}
    render() {
        return (
            <ImageBackground style={styles.backgroundImage}
                             source={images.background}>
                <View style={styles.topView}>
                    <StatusBar
                        barStyle="light-content"
                    />
                    <Container>
                        <View style={styles.topTitleView}>
                            <Text style={[styles.commonTextStyle, styles.mainTitle]}>
                                Job Opportunity
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.commonTextStyle, styles.informationText]}>
                                Aktas Talent
                            </Text>
                            <View style={styles.informationView}>
                                <Text style={[styles.commonTextStyle, styles.informationText]}>
                                    San Francisco, SF
                                </Text>
                                <View style={styles.circle}/>
                                <Text style={[styles.commonTextStyle, styles.informationText]}>
                                    Product Designer
                                </Text>
                            </View>
                            <Text style={[styles.commonTextStyle, styles.informationText]}>
                                6 Months Contract ($100 - $120 per hour)
                            </Text>

                        </View>
                    </Container>

                </View>

                <View style={styles.bottomView}>
                    <View>
                        <Container>
                            <Text style={[styles.commonTextStyle, styles.bottomInformationText]}>
                                Incoming Call
                            </Text>

                            <Text style={[styles.commonTextStyle, styles.bottomNameText]}>
                                { this.props.call.callerVoxIncomingData }
                            </Text>

                            <Text style={[styles.commonTextStyle, styles.bottomInformationText]}>
                                Aktas Talent - San Francisco, SF
                            </Text>
                        </Container>
                    </View>

                    <View>
                        <Container>
                            <View style={styles.controlView}>
                                <View style={styles.actionView}>
                                    <TouchableOpacity>
                                        <View style={styles.actionCircle}>
                                            <Image
                                                source={images.schedule}/>
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.actionText}>
                                        Schedule Call
                                    </Text>
                                </View>
                                <View style={styles.actionView}>
                                    <TouchableOpacity onPress={this.handleCallReject}>
                                        <View style={styles.actionCircle}>
                                            <Image
                                                source={images.close}/>
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.actionText}>
                                        Not Interested
                                    </Text>
                                </View>
                                <View style={styles.actionView}>
                                    <TouchableOpacity>
                                        <View style={styles.actionCircle}>
                                            <Image
                                                source={images.call}/>
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.actionText}>
                                        Call Me {'\n'} 1 Hour Later
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.swipeArea}>

                                <TouchableOpacity style={styles.phoneCircle} onPress={this.handleCallAnswer}>
                                    <Image source={images.phone}/>
                                </TouchableOpacity>
                                <Text style={styles.acceptText}>
                                    Slide to accept
                                </Text>
                            </View>

                        </Container>
                    </View>
                </View>

            </ImageBackground>
        )
    }
}

export default connect(
	({ call }) => ({ call }),
	{ callReject, callAnswer }
)(InComingCalls)



// import React from 'react'
// import { Text, View, StyleSheet } from 'react-native'
// import { connect } from 'react-redux'
// import { compose } from 'recompose'

// const IncomingIndex = () =>
// 	<View style={styles.container}>
// 		<Text>incoming screen</Text>
// 	</View>

// export default compose(
// 	connect(null, null),
// )(IncomingIndex)

// const styles = StyleSheet.create({
// 	container: {
		
// 	}
// })