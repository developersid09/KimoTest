import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Modal from 'react-native-modal';
import CustomTextView from './CustomeTextView';
import { Colors } from '../Utils';

const CustomPopup = props => {
  const {
    isVisible,
    headerText,
    component,
    ButtonText,
    buttonPress,
    CancelButtonText,
    cancelButtonPress,
    animationIn,
    popupIcon,
    popupIconStyle,
    style,
    disabled,
    icon,
    buttonWidth,
    isClose,
    closeButton,
  } = props;

  return (
    <>
      <Modal isVisible={isVisible}>
        <View style={styles.centerView}>
          <View style={styles.modelView}>

            <View style={styles.mainBody}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerTextStyle}>{headerText}</Text>
              </View>

              <View style={styles.bodyContainer}>{component}</View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButtonStyle}
                  // disabled={disabled ? disabled : false}
                  onPress={() => cancelButtonPress()}
                >
                  <Text style={styles.cancleTextStyle}>{CancelButtonText}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitButtonStyle}
                  // disabled={disabled ? disabled : false}
                  onPress={() => buttonPress()}
                >
                  <Text style={styles.submitTextStyle}>{ButtonText}</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </Modal>
    </>
  );
};

export default CustomPopup;

const styles = StyleSheet.create({
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelView: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 16,
    width: RFPercentage(40),
    // height: RFPercentage(30),
    backgroundColor: Colors.colorWhite,
    borderRadius: 8,
    shadowColor: Colors.colorBlack,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 9,
  },
  mainBody: {
    width: '85%',
    // height: '100%',
    alignSelf: 'center'
  },
  headerContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignContent: 'flex-start'
  },
  headerTextStyle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.colorPrimary,
    margin: 16,
  },
  bodyContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignContent: 'flex-start'
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  submitButtonStyle: {
    padding: 12,
    backgroundColor: Colors.colorPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    margin: 16,
    borderRadius: 8
  },
  submitTextStyle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: 'center',
    color: Colors.colorWhite,
  },
  cancelButtonStyle: {
    padding: 12,
    backgroundColor: Colors.colorGray,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    margin: 16,
    borderRadius: 8
  },
  cancleTextStyle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: 'center',
    color: Colors.colorWhite,
  },
})
