import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../Utils';

export default class CustomDropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            items,
            placeholder,
            onValueChange,
            value,
            key,
            borderWidth,
            borderRadius,
            styles,
            margin,
            paddingHorizontal
        } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <RNPickerSelect
                    itemKey={key}
                    onValueChange={onValueChange}
                    items={items}
                    value={value}
                    placeholder={{ label: placeholder, color: Colors.colorPrimary }}
                    style={styles ? styles : {
                        inputIOS: {
                            fontSize: 16,
                            // borderRadius: borderRadius ? borderRadius : 8,
                            // marginVertical: hp('2%'),
                            // marginHorizontal: margin, // to ensure the text is never behind the icon
                            // borderColor: Colors.colorBorder,
                            // borderWidth: borderWidth ? borderWidth : 0.8,
                            // height: hp('4.3%'),
                            // // paddingVertical: '1%',
                            // paddingHorizontal: paddingHorizontal, //'8%',
                        },
                        inputAndroid: {
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            borderWidth: 0.5,
                            borderColor: Colors.colorBlack,
                            borderRadius: 8,
                            color: Colors.colorBlack,
                            paddingRight: 30, // to ensure the text is never behind the icon
                        }
                    }}
                />
            </View>
        )
    }
}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
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
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});