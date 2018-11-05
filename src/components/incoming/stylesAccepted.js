import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');

const CONTAINER_WIDTH = width * 0.9;

export const styles = StyleSheet.create({
    view: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        width: width,
        height: height,
        alignItems: 'center'
    },
    topView: {
        width: width,
        paddingTop: 30
    },
    bottomView: {
        width: width,
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection: 'column',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'space-between'
    },
    topTitleView: {
        marginBottom: 20
    },
    circle: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        marginLeft: 5,
        marginRight: 5
    },
    commonTextStyle: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    informationView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mainTitle: {
        fontSize: 22,
    },
    informationText: {
        marginBottom: 5
    },
    bottomInformationText: {
        marginBottom: 5,
        color: '#454545',
        fontWeight: '400',
        textAlign: 'center'
    },
    bottomNameText: {
        fontSize: 24,
        color: '#000000',
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center'
    },
    controlView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom:30
    },
    actionCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: '#eeeeee',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionView: {
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    actionText: {
        width: 85,
        fontSize: 14,
        textAlign: 'center',
        flexWrap: 'wrap',
        marginTop: 10
    },
    swipeArea: {
        width: 270,
        height: 70,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 35,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30,
        justifyContent: 'center'
    },
    phoneCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#79c831',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0
    },
    acceptText: {
        fontSize: 16,
        height: 20,
        color: '#79c831',
        alignSelf: 'center',
        marginLeft: 30
    },
    button: {
        height: 50,
        borderRadius:5,
        backgroundColor:'#ff552b',
        justifyContent:'center',
        alignItems:'center',
        marginTop:15
    },
    buttonText: {
        fontSize:16,
        color:'#ffffff',
        fontWeight:'bold'
    },
    declineActionCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f44f4f'
    },
    timer: {
        fontSize:18,
        marginTop:30,
        color:'#252525',
        alignSelf:'center'
    }
});