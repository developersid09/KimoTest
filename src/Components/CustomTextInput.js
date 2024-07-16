import React from 'react';
import { View, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../Utils';
import styles from '../Utils/styles';

export default class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            maxLength,
            value,
            isMultiple,
            label,
            tint,
            error,
            keyboardType,
            changeText,
            secureTextEntry,
            textContentType,
            isNumeric,
            disable,
            editable,
            isForeIcon,
            foreIcon,
            onClickForeIcon,
            isBackIcon,
            backIcon,
            onClickBackIcon,
        } = this.props;

        return (
            <View style={styles.boxTextInput}>
                {isForeIcon &&
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 4 }}
                        onPress={onClickForeIcon}>
                        <Icon name={foreIcon} color={Colors.colorGray} size={20} />
                    </TouchableOpacity>
                }
                <View style={{ flex: 8, justifyContent: 'center', padding: 4 }}>
                    <TextInput
                        value={value}
                        maxLength={maxLength}
                        placeholder={label}
                        tintColor={tint}
                        style={[styles.smallInputView, { color: tint }]}
                        autoCapitalize="none"
                        keyboardType={keyboardType}
                        onChangeText={changeText}
                        textContentType={textContentType}
                        secureTextEntry={secureTextEntry ? true : false}
                        multiline={isMultiple ? true : false}
                        editable={editable}
                        keyboardAppearance={'light'}
                        returnKeyType={'done'}
                    />
                </View>
                {isBackIcon &&
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 4 }}
                        onPress={onClickBackIcon}>
                        <Icon name={backIcon} color={Colors.colorGray} size={20} />
                    </TouchableOpacity>
                }
            </View>
        );
    }
}