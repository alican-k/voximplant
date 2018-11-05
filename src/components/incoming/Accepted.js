import React from 'react';
import {Image, ImageBackground, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import { connect } from 'react-redux'
import {styles} from './stylesAccepted'
import Container from "./Container"
import { callHangupRequest } from '../../actions'
import images from '../../assets/images'

const sl = i => ('0' + i).slice(-2)

class AcceptCalls extends React.Component {
	constructor() {
		super()
		this.handleCallHangupRequest = this.handleCallHangupRequest.bind(this)
	}
	handleCallHangupRequest() {
		console.log('hang up')
		this.props.callHangupRequest()
	}
    render() {
		const { duration } = this.props.call
		const minute = sl(Math.floor(duration / 60))
		const seconds = sl(duration % 60)
		
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
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => console.log('onPress')}>
                            <Text style={styles.buttonText}>Job Detail</Text>
                        </TouchableOpacity>
                    </Container>

                </View>

                <View style={styles.bottomView}>
                    <View>
                        <Container>
                            <Text style={[styles.commonTextStyle, styles.timer]}>
                                { minute } : { seconds }
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
                                                source={images.mute}/>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.actionView}>
                                    <TouchableOpacity onPress={this.handleCallHangupRequest}>
                                        <View style={styles.declineActionCircle}>
                                            <Image
                                                source={images.phone}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.actionView}>
                                    <TouchableOpacity>
                                        <View style={styles.actionCircle}>
                                            <Image
                                                source={images.spekaer}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Container>
                    </View>
                </View>

            </ImageBackground>
        );
    }
}

export default connect(
	({ call }) => ({ call }), 
	{ callHangupRequest }
)(AcceptCalls)