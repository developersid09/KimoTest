import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomTextView from '../../../Components/CustomTextView';
import { Colors } from '../../../Utils';
import { getFontFamily } from '../../../Utils/FontFamily';

const ItemTopSpots = props => {
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

        <Image
          style={styles.imageView}
          resizeMode='cover'
          source={item?.image}
        />

      </TouchableOpacity>
    </>
  );
};

export default ItemTopSpots;

const styles = StyleSheet.create({
  itemView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: RFPercentage(45),
    borderRadius: RFValue(8),
    margin: RFValue(8),
    paddingLeft: RFValue(12),
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: Colors.colorWhite,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 6,
  },
  titleView: {
    flex: 3,
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
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  imageView: {
    height: RFValue(60),
    width: RFValue(100),
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignSelf: 'flex-end',
  }

})
