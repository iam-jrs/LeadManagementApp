/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  DimensionValue,
  Platform,
  TextInput,
  Text,
} from 'react-native';

import { K } from '../constants/AppConstants';

type FormTextInputProps = {
  inputHeight?: DimensionValue;
  leadingIcon?: React.ReactNode;
  hintText: string;
  keyboardType?: KeyboardTypeOptions;
  onInputTextChange: (text: string) => void;
  isSecure?: boolean;
  inputValue?: string;
  showValidation?: boolean;
  validationText?: string;
  errStatus?: boolean;
  onBlur?: () => void;
  style?: StyleProp<ViewStyle>;
  editable?: boolean;
  multiline?: boolean;
  textAlign?: 'center' | 'left' | 'right';
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  fontSize?: number;
};

const CustomTextInput: React.FC<FormTextInputProps> = ({
  inputHeight = 50,
  leadingIcon,
  hintText,
  keyboardType = 'default',
  onInputTextChange,
  isSecure = false,
  inputValue = '',
  showValidation = false,
  validationText = '',
  errStatus = false,
  onBlur,
  style,
  editable = true,
  multiline = true,
  textAlign = 'left',
  textAlignVertical = 'auto',
  maxLength = 300,
  autoCapitalize = 'none',
  fontSize = 16,
}) => {
  return (
    <View style={style}>
      <View
        style={[
          styles.container,
          {
            borderColor: errStatus
              ? K.colorsConstants.red
              : K.colorsConstants.greenSuccess,
            height: inputHeight,
            backgroundColor:
              showValidation && validationText
                ? '#5A18184F'
                : K.colorsConstants.white,
          },
        ]}
      >
        {leadingIcon && (
          <View style={styles.leadingContainer}>{leadingIcon}</View>
        )}
        <TextInput
          allowFontScaling={false}
          value={inputValue}
          style={[
            styles.inputText,
            {
              color: editable ? K.colorsConstants.appTextColor : 'grey',
              minHeight: inputHeight,
              textAlignVertical: 'top',
              verticalAlign: 'top',
              fontSize: fontSize ?? K.fontSizeConstants.regular,
              paddingTop: Platform.OS === 'android' ? 10 : isSecure ? 0 : 13,
            },
          ]}
          multiline={isSecure ? false : multiline}
          secureTextEntry={isSecure}
          editable={editable}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholder={hintText}
          placeholderTextColor={'#8A8A8A'}
          maxLength={maxLength}
          onChangeText={onInputTextChange}
          onBlur={onBlur}
          textAlign={textAlign}
          textAlignVertical={textAlignVertical}
          autoCorrect={false}
          textContentType="none"
          autoComplete="off"
        
        />
      </View>
      {showValidation && validationText && (
        <Text style={styles.validationText}>{validationText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.7,
    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 0,
  },
  leadingContainer: {
    width: 20,
    height: 20,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    flex: 1,
    fontSize: K.fontSizeConstants.regular,
    marginLeft: 8,
    // fontFamily: K.fontFamilyConstants.Nunito.regular,
  },
  eyeButton: {
    marginLeft: 4,
  },
  validationText: {
    color: K.colorsConstants.red,
    // fontFamily: K.fontFamilyConstants.Nunito.regular,
    marginTop: 4,
    fontSize: K.fontSizeConstants.thin,
  },
});

export default CustomTextInput;
