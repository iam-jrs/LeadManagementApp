import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { K } from '../constants/AppConstants';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      disabled ? styles.buttonDisabled : {},
      style,
    ]}
    onPress={onPress}
    disabled={disabled || loading}
    activeOpacity={0.7}
  >
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: K.colorsConstants.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonDisabled: {
    backgroundColor: K.colorsConstants.disable,
  },
  buttonText: {
    color: '#fff',
    fontSize: K.fontSizeConstants.regular,
    fontWeight: 'bold',
  },
});

export default CustomButton;