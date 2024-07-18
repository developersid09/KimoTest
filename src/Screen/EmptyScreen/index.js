import React from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import { CustomStatusBar } from '../../Components/CustomStatusBar';
import { Colors } from '../../Utils';

const EmptyScreen = props => {


  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <CustomStatusBar />


    </ScrollView>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorBackground
  },
});
