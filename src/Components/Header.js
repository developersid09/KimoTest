import React from 'react';
import { Image, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Colors } from '../Utils';

const Header = () => {
    return (
        <View style={styles.loginHeader}>
            <Image
                style={styles.logoImage}
                resizeMode='center'
                source={require('../Assets/Images/app_logo.png')}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    loginHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        width: '100%',
        backgroundColor: Colors.colorWhite
    },
    logoImage: {
        width: RFValue(90),
        height: RFValue(36),
        padding: RFValue(8),
    },
});

export { Header };