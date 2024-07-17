import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomTextView from '../../../Components/CustomTextView';
import { Colors } from '../../../Utils';
import AntDesign from "react-native-vector-icons/AntDesign";
import { getFontFamily } from '../../../Utils/FontFamily';

const ItemCatagories = props => {
  const { item, index, onPress } = props;

  return (
    <>
      <TouchableOpacity
        style={styles.itemView}
        onPress={() => { onPress() }}>

        <View style={styles.titleView}>
          <CustomTextView
            textStyle={styles.itemTitle}
            text={item?.title}
          />
        </View>

        <View style={styles.nextButton}>
          <AntDesign
            name={'arrowright'}
            size={RFValue(20)}
            color={Colors.colorPrimary} />
        </View>

      </TouchableOpacity>
    </>
  );
};

export default ItemCatagories;

const styles = StyleSheet.create({
  itemView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: RFPercentage(45),
    borderRadius: RFValue(8),
    margin: RFValue(8),
    padding: RFValue(12),
    backgroundColor: Colors.colorWhite,
  },
  titleView: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: RFValue(14),
    color: Colors.colorBlack,
    marginLeft: RFValue(8),
    fontFamily: getFontFamily("regular")
  },
  nextButton: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: RFValue(16),
    height: RFValue(40),
    width: RFValue(40),
  },

})
