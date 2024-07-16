import React, { Component } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import ProfilePicture from '../../images/no_image.png';
import styles from '../../src (copy)/config/styles';
import colors from "../../src (copy)/config/colors";

const MENU_ITEMS = [
    { 'name': 'Explanation' },
    { 'name': 'Basic Drills' },
    { 'name': 'Advanced Drills' },
    { 'name': 'Events' },
    { 'name': 'Success Stories' },
    { 'name': 'Settings' },
];

class DrawerContent extends Component {

    componentWillReceiveProps(nextProps) {
        Animated.stagger(100, this.animationValues.map((value, index) =>
            Animated.spring(value, {
                toValue: nextProps.open ? 1 : 0
            }))
        ).start();
    }

    componentDidMount() {
        this.animationValues = [...new Array(MENU_ITEMS.length + 1)]
            .map(() => new Animated.Value(0));
    }

    componentWillUnmount() {
        delete this.animationValues;
    }

    logOutPressed = () => {
    };

    menuItemPressed = ({ index }) => {
    };

    renderMenuItems = () => {
        if (!this.animationValues) {
            return null;
        }
        return MENU_ITEMS.map((item, index) => {
            const leftPos = this.animationValues[index].interpolate({
                inputRange: [0, 1],
                outputRange: [-200, 0],
                useNativeDriver: true
            });

            return (
                <TouchableOpacity
                    key={`MenuItem_${index}`}
                    onPress={() => this.menuItemPressed({ item, index })}
                >
                    <Animated.View style={{ left: leftPos }}>
                        <Text style={styles.textbb14}>{item.name}</Text>
                    </Animated.View>
                </TouchableOpacity>
            );
        })
    };

    render() {
        if (!this.animationValues) {
            return null;
        }
        const imageScale = this.animationValues[this.animationValues.length - 1].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            useNativeDriver: true
        });
        return (
            <View style={styles.Container}>
                <ScrollView style={{ overflow: 'visible' }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <Animated.View style={[styles.profilePictureContainer, {
                        transform: [
                            { scaleX: imageScale },
                            { scaleY: imageScale },
                        ]
                    }]}>
                        <Animated.Image
                            style={styles.profilePictureImage}
                            source={ProfilePicture}
                        />
                    </Animated.View>
                    <View style={styles.profileDetailsContainer}>
                        <Text style={styles.profileDetailsName}>
                            {'Manish D'}
                        </Text>
                        <Text style={styles.profileDetailsLocation}>
                            {'Indore'}
                        </Text>
                    </View>
                    <View >
                        {this.renderMenuItems()}
                    </View>
                </ScrollView>

                <TouchableOpacity
                    style={[styles.logOutWrapper]}
                    onPress={() => this.logOutPressed()}
                >
                    <Text style={styles.textbb18}>{'logout'}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const Styles = {
    container: {
        flex: 1,
        paddingLeft: 20,
    },
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
        color: colors.colorText,
    },
    profileDetailsLocation: {
        // fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '400',
        color: colors.colorText,
    },
    menuContainer: {
        flex: 1,
        marginTop: 40,
        backgroundColor: colors.colorYellow
    },
    menuItemWrapper: {},
    menuItemText: {
        // lineHeight: 50,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.colorText,
    },
    logOutWrapper: {
        marginBottom: 50
    }
};

export { DrawerContent };