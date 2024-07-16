import { StyleSheet, Dimensions, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Colors from './Colors';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
console.log(getStatusBarHeight());

export default styles = StyleSheet.create({
    statusBar: {
        backgroundColor: Colors.colorStatusBar,
        height: Platform.OS === 'android' ? 0 : getStatusBarHeight()
    },
    splashContainer: {
        flex: 1,
        backgroundColor: Colors.colorBackground,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.colorBackground,
        padding: 10
    },
    Container: {
        flex: 1,
    },
    overlayStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    customOverlayStyles: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.colorLightGray,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('40%')
    },
    loginContainer: {
        // flex: 1,
        // padding: wp('5%'),
        paddingVertical: hp('3%')
    },
    forgetContainer: {
        // flex: 1,
        // padding: wp('5%'),
        paddingVertical: hp('5%')
    },
    signupContainer: {
        // flex: 1,
        // padding: wp('5%'),
        paddingVertical: hp('5%')
    },
    resetContainer: {
        flex: 1,
        // padding: wp('5%'),
        paddingVertical: hp('3%')
    },
    homeContainer: {
        flex: 1,
        // padding: wp('5%'),
        paddingVertical: hp('3%')
    },
    profileContainer: {
        flex: 1,
        padding: wp('5%'),
        paddingVertical: hp('1%'),
        paddingBottom: hp('8%')
    },
    drillingContainer: {
        flex: 1,
        padding: wp('5%'),
        paddingVertical: hp('1%'),
        paddingBottom: hp('8%')
    },
    drillContainer: {
        flex: 1,
    },
    explanationContainer: {
        flex: 1,
        padding: wp('5%'),
    },
    chartContainer: {
        flex: 1,
        padding: wp('5%'),
        marginTop: 32
    },
    privacyContainer: {
        flex: 1,
    },
    drawerContainer: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: Colors.colorBackground,
    },
    faintContainer: {
        flex: 1,
        backgroundColor: Colors.colorLightGray,
        alignItems: 'center'
    },
    faintContainer1: {
        backgroundColor: Colors.colorLightGray,
        alignItems: 'center'
    },
    modalBackground: {
        flex: 1,
        backgroundColor: Colors.colorWhite,
        justifyContent: 'center',
        paddingHorizontal: wp('5%')

    },
    modalBackground1: {
        flex: 1,
        backgroundColor: Colors.colorTransparent,
        justifyContent: 'center',
        paddingHorizontal: wp('0.5%')

    },
    midContainer: {
        flex: 1,
        backgroundColor: Colors.colorBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inContainer: {
        backgroundColor: Colors.colorBackground,
        marginHorizontal: wp('2%'),
    },
    centerContainer: {
        flex: 1,
        backgroundColor: Colors.colorBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    testContainer: {
        // flex: 1,
        padding: wp('5%'),
        height: hp('35%'),
        width: wp('90%'),
        borderRadius: 4,
        backgroundColor: Colors.colorBackground,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    logoView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: wp('34%'),
        height: hp('4.5%'),
        // resizeMode: "center",
    },
    logoHeader: {
        width: wp('34%'),
        height: hp('3%'),
        resizeMode: "contain",
    },
    headerButtonsView: {
        flex: 0.5,
        flexDirection: 'row',
    },
    langView: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // paddingHorizontal: wp('4%'),
        marginTop: hp('1%')
    },
    backBtnView: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingHorizontal: wp('4%'),
        marginTop: hp('1%')
    },
    playBtnView: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingHorizontal: wp('4%'),
        marginTop: hp('1%')
    },
    onRadioRing: {
        height: 18,
        width: 18,
        borderRadius: 18 / 2,
        borderWidth: 2,
        borderColor: Colors.colorText,
        justifyContent: 'center',
        alignItems: 'center'
    },
    onRadioDot: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: Colors.colorText,
        justifyContent: 'center',
        alignItems: 'center'
    },
    offRadioRing: {
        height: 18,
        width: 18,
        borderRadius: 18 / 2,
        borderWidth: 2,
        borderColor: Colors.colorText,
    },
    headerTextView: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingHorizontal: wp('4%'),
        marginTop: hp('1%')
    },
    firstHalfView: {
        height: hp('20%'),
        borderBottomRightRadius: RFValue(12),
        borderBottomLeftRadius: RFValue(12),
        backgroundColor: Colors.colorPrimary,
        padding: wp('5%')
    },
    secondHalfView: {
        height: '100%',// hp('80%'),
        backgroundColor: Colors.colorBackground,
        padding: wp('5%')
    },
    drawerView: {
        height: hp('100%'),
        backgroundColor: Colors.colorBackground,
        borderTopRightRadius: 6
    },
    drawerItem: {
        flexDirection: 'row',
        paddingHorizontal: wp('5%'),
        paddingVertical: wp('3%')
    },
    firstHalfInView: {
        height: hp('12%'),
        justifyContent: 'center',
        borderBottomRightRadius: RFValue(12),
        borderBottomLeftRadius: RFValue(12),
        backgroundColor: Colors.colorPrimary,
        paddingHorizontal: wp('5%'),
    },
    secondHalfInView: {
        height: hp('83%'),
        backgroundColor: Colors.colorBackground
    },
    virtualView: {
        justifyContent: 'space-around',
        alignContent: 'center',
        height: hp('73%'),
        margin: wp('4%'),
        paddingHorizontal: wp('3%'),
        paddingVertical: wp('3%'),
        marginTop: hp('-23%'),
        zIndex: 5,
        backgroundColor: Colors.colorWhite,
        borderRadius: 4,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
    },
    dashImg: {
        height: hp('30%'),
        width: wp('97%'),
        margin: wp('1.5%'),
        backgroundColor: Colors.colorWhite
    },
    recentData: {
        height: hp('22%'),
        width: wp('100%'),
        backgroundColor: Colors.colorLightBlueBackground,
    },
    dashData: {
        height: hp('38%'),
        width: wp('97%'),
        margin: wp('1.5%'),
        backgroundColor: Colors.colorBackground,
    },
    recentProItem: {
        backgroundColor: Colors.colorWhite,
        width: wp('35%'),
        height: hp('12%'),
        borderRadius: 4,
        borderWidth: 0,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginVertical: hp('2%'),
        marginHorizontal: wp('1.5%'),
        paddingHorizontal: wp('1%'),
        paddingVertical: hp('1%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    thumbnailSmallView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.colorPrimary,
        width: RFValue(16),
        height: RFValue(16),
        borderRadius: RFValue(8),
    },
    fullButton: {
        flexDirection: 'row',
        backgroundColor: Colors.colorWhite,
        width: wp('80%'),
        height: hp('7%'),
        borderRadius: 4,
        borderWidth: 0,
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: hp('5%'),
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('2%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    halfLeftButton: {
        backgroundColor: Colors.colorBackground,
        width: wp('42.5%'),
        height: wp('35%'),
        borderRadius: 6,
        borderWidth: 1,
        marginVertical: hp('1%'),
        paddingHorizontal: wp('4%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    halfRightButton: {
        backgroundColor: Colors.colorBackground,
        width: wp('42.5%'),
        height: wp('35%'),
        borderRadius: 6,
        borderWidth: 1,
        marginVertical: hp('1%'),
        paddingHorizontal: wp('4%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    emptyButton: {
        // backgroundColor: Colors.colorBackground,
        width: wp('42.5%'),
        height: wp('35%'),
        borderRadius: 6,
        borderWidth: 0,
        marginVertical: hp('1%'),
        paddingHorizontal: wp('4%'),
    },
    thumbnailView: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: RFValue(38),
        height: RFValue(38),
        borderRadius: RFValue(19),
        padding: RFValue(1),
    },
    iconView: {
        width: RFValue(38),
        height: RFValue(38),
        // resizeMode: "center",
    },
    textBox: {
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Colors.colorBorder,
        borderWidth: 0.5,
        borderRadius: 16,
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('5%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('4%')
    },
    continueButton: {
        width: wp('40%'),
        backgroundColor: Colors.colorPrimary,
        borderRadius: 16,
        alignSelf: 'center',
        marginVertical: hp('5%'),
        alignItems: 'center',
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('2%')
    },

    //profile
    profilePictureContainer: {
        marginTop: 50,
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden'
    },
    profilePictureImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    profileDetailsContainer: {
        marginTop: 30,
        alignItems: 'flex-start'
    },
    profileDetailsName: {
        // fontFamily: 'Helvetica Neue',
        fontSize: 18,
        fontWeight: '600',
        color: Colors.colorText,
    },
    profileDetailsLocation: {
        // fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '400',
        color: Colors.colorText,
    },
    logOutWrapper: {
        marginBottom: 50
    },



    searchInput: {
        padding: 4,
        borderWidth: 0
    },
    customerItem: {
        flexDirection: 'row',
        padding: 4,

    },
    circleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.colorLightGray,
        width: RFValue(28),
        height: RFValue(28),
        borderRadius: RFValue(14),
        padding: RFValue(1)
    },
    mainBox: {
        marginHorizontal: wp('2%'),
        marginVertical: hp('1%'),
        padding: wp('2%'),
        borderColor: Colors.colorBorder,
        borderWidth: RFValue('0.8'),
        backgroundColor: Colors.colorWhite,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
    },
    infoBox: {
        marginHorizontal: wp('2%'),
        marginVertical: hp('1%'),
        padding: wp('2%'),
        borderColor: Colors.colorSecondary,
        borderWidth: RFValue('0.6'),
        backgroundColor: Colors.colorFaintBackground,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
    },

    // subscription

    subscriptionView: {
        justifyContent: 'center',
        height: hp('60%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: wp('4%'),
        zIndex: 5,
        backgroundColor: Colors.colorBackground,
        borderRadius: 4,
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
    },
    creditCardView: {
        justifyContent: 'center',
        height: wp('60%'),
        // padding: wp('4%'),
        marginVertical: wp('4%'),
        backgroundColor: Colors.colorBackground,
        borderRadius: 8,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
    },
    successStoriesCardView: {
        justifyContent: 'center',
        // height: wp('60%'),
        padding: wp('2%'),
        marginVertical: wp('4%'),
        backgroundColor: Colors.colorBackground,
        borderRadius: 8,
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.2,
    },
    eventListView: {
        justifyContent: 'center',
        // height: wp('30%'),
        padding: wp('4%'),
        marginVertical: wp('4%'),
        backgroundColor: Colors.colorBackground,
        borderRadius: 8,
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
    },
    creditCardInView: {
        justifyContent: 'center',
        height: wp('60%'),
        padding: wp('4%'),
    },
    creditCardBackgroundView: {
        justifyContent: 'center',
        height: wp('95%'),
        // padding: wp('4%'),
        marginVertical: wp('4%'),
        backgroundColor: Colors.colorBackground,
        borderRadius: 8,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
    },
    creditCardBackgroundView1: {
        justifyContent: 'center',
        height: wp('95%'),
        padding: wp('4%'),
        marginVertical: wp('4%'),
        backgroundColor: Colors.colorBackground,
        borderRadius: 8,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
    },


    //===============>> common <<==================//
    boxTextInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginVertical: hp('1.5%'),
        // height: hp('7%'),
        // width: '95%',// wp('90%'),
        borderColor: Colors.colorBorder,
        borderRadius: 8,
        borderWidth: 0.6,
        padding: 4
    },
    boxTextView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp('0.5%'),
        height: hp('3.5%'),
        width: '100%',// wp('90%'),
        borderWidth: 0,
        padding: 4
    },
    peperBoxTextInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Colors.colorBlack,
        borderRadius: 2,
        borderWidth: 0,
        // height: hp('4%'),
        // marginVertical: hp('1%'),
        // paddingVertical: '1%',
        paddingHorizontal: '5%',
    },
    boxTextInputMulti: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Colors.colorBlack,
        borderRadius: 2,
        borderWidth: 0.6,
        height: hp('10%'),
        marginVertical: hp('1%'),
        paddingVertical: '1%',
        paddingHorizontal: '5%',
    },
    smallInputView: {
        // textAlignVertical: 'top',
        width: '100%',
        fontSize: RFPercentage(1.6),
        padding: Platform.OS === 'android' ? wp('0.5%') : wp('1%'),
    },
    pickerInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Colors.colorBorder,
        borderRadius: 6,
        borderWidth: 0.6,
        height: hp('4%'),
        marginVertical: hp('1%'),
        // paddingVertical: '1%',
        paddingHorizontal: '1%',
    },
    pickerBoxInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Colors.colorBorder,
        borderRadius: 6,
        borderWidth: 0.8,
        height: hp('4%'),
        marginVertical: hp('1%'),
        // paddingVertical: '1%',
        paddingHorizontal: '1%',
    },
    editButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('3.5%'),
        width: wp('27%'),
        borderRadius: 32,
        borderWidth: 0,
        backgroundColor: Colors.colorBackground,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 10.27,
        elevation: 10,
    },
    logoutButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('3.5%'),
        width: wp('30%'),
        borderRadius: 32,
        borderWidth: 0,
        backgroundColor: Colors.colorBackground,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 10.27,
        elevation: 10,
    },
    primaryButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('1.5%'),
        height: hp('5%'),
        width: wp('90%'),
        borderRadius: 32,
        borderWidth: 0,
        backgroundColor: Colors.colorAccent,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    secondaryButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('2%'),
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors.colorSecondary,
        backgroundColor: Colors.colorWhite
    },
    accentButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('2%'),
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors.colorSecondary,
        backgroundColor: Colors.colorSecondary
    },
    blackButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.colorBlackButton,
        paddingVertical: hp('1%'),
        margin: hp('2%'),
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    inputIOS: {
        justifyContent: 'center',
        fontSize: 16,
        borderRadius: 4,
        marginVertical: hp('2%'),
        marginHorizontal: wp('25%'), // to ensure the text is never behind the icon
        borderColor: Colors.colorBorder,
        borderRadius: 6,
        borderWidth: 0.8,
        height: hp('4%'),
        // paddingVertical: '1%',
        paddingHorizontal: '1%',
    },


    //===============>> input <<=================//
    container: {
        height: hp('5%'),
        position: 'relative',
    },
    container1: {
        height: hp('5%'),
        position: 'relative',
    },
    labelContainer: {
        position: 'absolute',
        backgroundColor: '#FFF',
        top: -16,
        left: 16,
        padding: 5,
        zIndex: 50,
    },
    textInput: {
        flex: 1,
        borderWidth: 0.8,
        borderColor: Colors.colorBorder,
        justifyContent: 'flex-end',
        // height: 44,
        borderRadius: 6,
        paddingVertical: '3%',
        paddingHorizontal: '2%',
        // paddingHorizontal: 25,
        fontSize: RFPercentage(1.6),
        color: Colors.colorText,
    },
    textInput1: {
        // flex: 1,
        flexDirection: 'row',
        borderWidth: 0.8,
        borderColor: Colors.colorBorder,
        // justifyContent: 'flex-end',
        // height: 44,
        borderRadius: 6,
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        // paddingHorizontal: 25,
    },
    textIn: {
        fontSize: RFPercentage(1.6),
        color: Colors.colorText,

    },

    openButton: {
        backgroundColor: Colors.colorWhite,
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignSelf: 'flex-start',
        width: RFValue(24),
        height: RFValue(24),
        borderRadius: RFValue(12),
        padding: RFValue(1),
        marginLeft: RFValue(-12),
        marginVertical: RFValue(6),
    },
    closeButton: {
        backgroundColor: Colors.colorWhite,
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        width: RFValue(28),
        height: RFValue(28),
        borderRadius: RFValue(14),
        padding: RFValue(1),
        marginRight: RFValue(-8),
        // marginVertical: RFValue(6),
    },
    subView: {
        flex: 0.5,
        backgroundColor: Colors.colorWhite,
        height: hp('100%'),
        width: wp('40%'),
        borderRightWidth: 0.6,
        borderColor: Colors.colorBorder,
    },
    styleVerticalLine: {
        height: 20,
        backgroundColor: Colors.colorSecondary,
        width: 1
    },
    styleHorizontalLine: {
        height: 1,
        backgroundColor: Colors.colorSecondary,
        width: 180
    },
    boxTextStyle: {
        alignItems: 'center',
        textAlign: 'center',
        padding: 5,
        fontSize: 14
        // fontSize: Constant.FontSize._12
    },
    boxStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('20%'),
        height: 65,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.colorSecondary,
        backgroundColor: Colors.colorWhite,
        padding: 6,
        marginBottom: 8,
    },
    poleline1: {
        width: 2,
        height: 32,
        alignSelf: 'center',
        backgroundColor: Colors.colorSecondary,
    },
    underline1: {
        width: '50%',
        height: 2,
        backgroundColor: Colors.colorSecondary,
    },



    //===============>> text <<==================//
    //regular
    text4: {
        fontSize: RFPercentage(0.4),
        color: Colors.colorText,
    },
    text6: {
        fontSize: RFPercentage(0.6),
        color: Colors.colorText,
    },
    text8: {
        fontSize: RFPercentage(0.8),
        color: Colors.colorText,
    },
    text10: {
        fontSize: RFPercentage(1.0),
        color: Colors.colorText,
    },
    text12: {
        fontSize: RFPercentage(1.2),
        color: Colors.colorText,
    },
    text14: {
        fontSize: RFPercentage(1.4),
        color: Colors.colorText,
    },
    text16: {
        fontSize: RFPercentage(1.6),
        color: Colors.colorText,
    },
    text18: {
        fontSize: RFPercentage(1.8),
        color: Colors.colorText,
    },
    text20: {
        fontSize: RFPercentage(2.0),
        color: Colors.colorText,
    },
    text22: {
        fontSize: RFPercentage(2.2),
        color: Colors.colorText,
    },
    text24: {
        fontSize: RFPercentage(2.4),
        color: Colors.colorText,
    },
    text26: {
        fontSize: RFPercentage(2.6),
        color: Colors.colorText,
    },

    //white
    textw4: {
        fontSize: RFPercentage(0.4),
        color: Colors.colorWhite,
    },
    textw6: {
        fontSize: RFPercentage(0.6),
        color: Colors.colorWhite,
    },
    textw8: {
        fontSize: RFPercentage(0.8),
        color: Colors.colorWhite,
    },
    textw10: {
        fontSize: RFPercentage(1.0),
        color: Colors.colorWhite,
    },
    textw12: {
        fontSize: RFPercentage(1.2),
        color: Colors.colorWhite,
    },
    textw14: {
        fontSize: RFPercentage(1.4),
        color: Colors.colorWhite,
    },
    textw16: {
        fontSize: RFPercentage(1.6),
        color: Colors.colorWhite,
    },
    textw18: {
        fontSize: RFPercentage(1.8),
        color: Colors.colorWhite,
    },
    textw20: {
        fontSize: RFPercentage(2.0),
        color: Colors.colorWhite,
    },
    textw28: {
        fontSize: RFPercentage(2.8),
        color: Colors.colorWhite,
    },

    //bold black
    textbb4: {
        fontSize: RFPercentage(0.4),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb6: {
        fontSize: RFPercentage(0.6),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb8: {
        fontSize: RFPercentage(0.8),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb10: {
        fontSize: RFPercentage(1.0),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb12: {
        fontSize: RFPercentage(1.2),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb14: {
        fontSize: RFPercentage(1.4),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb16: {
        fontSize: RFPercentage(1.6),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb18: {
        fontSize: RFPercentage(1.8),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb20: {
        fontSize: RFPercentage(2.0),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb22: {
        fontSize: RFPercentage(2.2),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb24: {
        fontSize: RFPercentage(2.4),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb26: {
        fontSize: RFPercentage(2.6),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb28: {
        fontSize: RFPercentage(2.8),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb30: {
        fontSize: RFPercentage(3.0),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb32: {
        fontSize: RFPercentage(3.2),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb34: {
        fontSize: RFPercentage(3.4),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },
    textbb36: {
        fontSize: RFPercentage(3.6),
        color: Colors.colorTextBold,
        fontWeight: 'bold',
    },

    //bold white
    textbw4: {
        fontSize: RFPercentage(0.4),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw6: {
        fontSize: RFPercentage(0.6),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw8: {
        fontSize: RFPercentage(0.8),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw10: {
        fontSize: RFPercentage(1.0),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw12: {
        fontSize: RFPercentage(1.2),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw14: {
        fontSize: RFPercentage(1.4),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw16: {
        fontSize: RFPercentage(1.6),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw18: {
        fontSize: RFPercentage(1.8),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw20: {
        fontSize: RFPercentage(2.0),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw22: {
        fontSize: RFPercentage(2.2),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw24: {
        fontSize: RFPercentage(2.4),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw26: {
        fontSize: RFPercentage(2.6),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw28: {
        fontSize: RFPercentage(2.8),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw30: {
        fontSize: RFPercentage(3.0),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw32: {
        fontSize: RFPercentage(3.2),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw34: {
        fontSize: RFPercentage(3.4),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },
    textbw36: {
        fontSize: RFPercentage(3.6),
        color: Colors.colorWhite,
        fontWeight: 'bold',
    },



    //===============>> underline <<==================//

    divider: {
        height: 8,
        backgroundColor: Colors.colorSilver,
    },
    poleline: {
        width: 0.6,
        backgroundColor: Colors.colorUnderline,
    },
    textview_poleline: {
        width: 0.6,
        height: '60%',
        backgroundColor: Colors.colorUnderline,
    },
    underline: {
        height: 0.7,
        backgroundColor: Colors.borderColor,
    },
    underlineWhite: {
        height: 1.5,
        backgroundColor: Colors.colorWhite,
    },
    underlineDotted: {
        borderStyle: 'dotted',
        borderWidth: 0.3,
        borderRadius: 1,
        backgroundColor: Colors.colorLightGray,
    },
    underlineFaint: {
        height: 0.2,
        backgroundColor: Colors.colorUnderline,
    },
    underlineDark: {
        height: 0.7,
        backgroundColor: Colors.colorUnderline,
    },
    underlineAccDark: {
        height: 0.7,
        backgroundColor: Colors.colorAccentDark,
    },
    underlineAcc: {
        height: 0.7,
        backgroundColor: Colors.colorAccentDark,
        marginHorizontal: 50,
        marginTop: 10
    },


    //===============>> neomorph <<==================//

    languageButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RFPercentage(2.0),
        shadowRadius: RFPercentage(0.6),
        backgroundColor: Colors.colorPrimary,
        width: RFPercentage(4.0),
        height: RFPercentage(4.0),
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RFPercentage(2.0),
        shadowRadius: RFPercentage(0.6),
        backgroundColor: Colors.colorPrimary,
        width: RFPercentage(4.0),
        height: RFPercentage(4.0),
    },
    playButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RFPercentage(3.0),
        shadowRadius: RFPercentage(0.6),
        backgroundColor: Colors.colorPrimary,
        width: RFPercentage(6.0),
        height: RFPercentage(6.0),
    },
    shadow1: {
        borderRadius: 20,
        shadowOpacity: 0.25,
        shadowColor: 'black',
        shadowRadius: 20,
        backgroundColor: '#ECF0F3',
        width: 300,
        height: 120,
    },
    shadow2: {
        borderRadius: 100,
        shadowOpacity: 0.25,
        shadowColor: 'purple',
        shadowRadius: 20,
        shadowOffset: { width: 20, height: 20 },
        backgroundColor: '#ECF0F3',
        width: 200,
        height: 200,
    },
    shadow3: {
        borderRadius: 20,
        shadowOpacity: 0.25,
        shadowColor: 'black',
        shadowRadius: 20,
        backgroundColor: '#ECF0F3',
        width: 300,
        height: 120,
    },
    shadow4: {
        borderRadius: 100,
        shadowOpacity: 0.25,
        shadowColor: 'purple',
        shadowRadius: 20,
        shadowOffset: { width: 20, height: 20 },
        backgroundColor: '#ECF0F3',
        width: 200,
        height: 200,
    },
    neomorph1: {
        borderRadius: 20,
        shadowRadius: 8,
        backgroundColor: '#ECF0F3',
        width: 300,
        height: 120,
    },
    neomorph2: {
        borderRadius: 80,
        shadowRadius: 12,
        backgroundColor: '#ECF0F3',
        width: 160,
        height: 160,
    },
    neomorph3: {
        borderRadius: 80,
        shadowRadius: 12,
        backgroundColor: '#ECF0F3',
        width: 160,
        height: 160,
        shadowOpacity: 0.5,
    },
    neomorph4: {
        borderRadius: 20,
        shadowRadius: 8,
        backgroundColor: '#ECF0F3',
        width: 300,
        height: 120,
    },
    neomorph5: {
        borderRadius: 80,
        shadowRadius: 8,
        backgroundColor: '#ECF0F3',
        width: 160,
        height: 160,
        shadowOffset: { width: -8, height: -8 },
    },
    neomorph6: {
        borderRadius: 80,
        shadowRadius: 12,
        backgroundColor: '#ECF0F3',
        width: 160,
        height: 160,
        shadowOpacity: 0.5,
    },
    neomorph7: {
        borderRadius: 100,
        shadowRadius: 12,
        backgroundColor: '#ECF0F3',
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    neomorph8: {
        borderRadius: 70,
        shadowRadius: 12,
        backgroundColor: '#ECF0F3',
        width: 140,
        height: 140,
    },
    neomorph9: {
        borderRadius: 100,
        shadowRadius: 12,
        backgroundColor: '#ECF0F3',
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    neomorph10: {
        borderRadius: 70,
        shadowRadius: 12,
        backgroundColor: '#ECF0F3',
        width: 140,
        height: 140,
    },
    neomorphblur1: {
        borderRadius: 100,
        shadowRadius: 12,
        backgroundColor: '#ECF0F3',
        width: 200,
        height: 200,
    },
    neomorphblur2: {
        shadowRadius: 12,
        backgroundColor: '#ECF0F3',
        width: 140,
        height: 140,
        shadowOffset: { width: -12, height: -12 },
    },
    neomorphblur3: {
        borderRadius: 100,
        shadowRadius: 12,
        backgroundColor: '#ECF0F3',
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    neomorphblur3_1: {
        borderRadius: 70,
        shadowRadius: 12,
        backgroundColor: '#ECF0F3',
        width: 140,
        height: 140,
        shadowOffset: { width: -12, height: -12 },
    },

});