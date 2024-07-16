import React from 'react';
import { StatusBar } from "react-native";
import { Colors } from '../Utils';

const CustomStatusBar = ({ }) => (
    <>
        <StatusBar
            animated={true}
            backgroundColor={Colors.colorStatusBar}
            barStyle={'light-content'}
            showHideTransition={'slide'}
        />
    </>
);

export { CustomStatusBar };