import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomTextView from '../../../Components/CustomTextView';
import { Colors } from '../../../Utils';
import AntDesign from "react-native-vector-icons/AntDesign";
import { getFontFamily } from '../../../Utils/FontFamily';

const ItemHighlight = props => {
  const { item, index, onPress } = props;

  return (
    <>
      <TouchableOpacity
        style={styles.itemView}
        onPress={() => { onPress() }}>
        <Image
          style={styles.highlightImg}
          resizeMode='cover'
          imageStyle={{ borderRadius: RFValue(8) }}
          source={item?.image}
        />

        <CustomTextView
          textStyle={styles.itemTitle}
          text={item?.title}
        />

        <CustomTextView
          textStyle={styles.itemDescription}
          text={item?.description}
        />

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

export default ItemHighlight;

const styles = StyleSheet.create({
  itemView: {
    width: RFValue(300),
    height: RFValue(340),
    borderRadius: RFValue(8),
    margin: RFValue(8),
    alignSelf: 'flex-start',
    backgroundColor: Colors.colorWhite,
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 9,
  },
  itemTitle: {
    fontSize: RFValue(20),
    color: Colors.colorPrimary,
    marginVertical: RFValue(16),
    marginLeft: RFValue(16),
    fontFamily: getFontFamily("bold")
  },
  highlightImg: {
    width: RFValue(300),
    height: RFValue(170),
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    alignSelf: 'flex-start',
  },
  itemDescription: {
    fontSize: RFValue(14),
    color: Colors.colorBlack,
    marginBottom: RFValue(8),
    marginLeft: RFValue(16),
    fontFamily: getFontFamily("regular")
  },
  nextButton: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: RFValue(16),
    height: RFValue(40),
    width: RFValue(40),
    borderRadius: RFValue(20),
    backgroundColor: Colors.colorBackground
  },

})
