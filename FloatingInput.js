import React, {useEffect, useState} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Easing,
} from 'react-native';

const os = Platform.OS;

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

const FloatingInput = ({
  type,
  value,
  autoCapitalize = 'sentences',
  label,
  labelError,
  secureTextEntry,
  placeholder,
  isInputError,
  keyboardType,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [animated] = useState(new Animated.Value(value === '' ? 0 : 1));
  const [color, setColor] = useState('#282828');

  useEffect(() => {
    animatedFocus();
  }, [isFocused, isInputError]);

  const animatedFocus = () => {
    if (isInputError) setColor('#EA232A');
    else if (isFocused) setColor('#d03d56');
    else setColor('#fff');

    Animated.timing(animated, {
      toValue: value !== '' || isFocused ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
    }).start();
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const showError = labelError ? true : false;

  return (
    <View style={styles.container}>
      <AnimatedText style={styles.label(animated, color, type)}>
        {label}
      </AnimatedText>

      <View style={styles.containerInput(color)}>
        {type == 'phone' && (
          <>
            <Text style={styles.phone(value)}>{'+62'}</Text>
            <AnimatedView style={styles.line(animated, color)} />
          </>
        )}

        <TextInput
          style={styles.input(type)}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={'#C9C9C9'}
          numberOfLines={1}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>

      {showError && <Text style={styles.error}>{labelError}</Text>}
    </View>
  );
};

export default FloatingInput;

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
  },

  containerInput: color => ({
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: os === 'android' ? 1 : 0.5,
    borderColor: color,
    borderRadius: 8,
  }),

  phone: value => ({
    fontSize: 16,
    color: value.length ? '#282828' : '#fff',
    marginLeft: 16,
    marginRight: 8,
  }),

  line: (animated, color) => ({
    width: 1,
    height: '100%',
    backgroundColor: animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['#fff', color],
    }),
  }),

  label: (animated, color, type) => ({
    position: 'absolute',
    backgroundColor: '#202124',
    paddingHorizontal: 2,
    left: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [type == 'phone' ? 60 : 16, 16],
    }),
    top: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [12, -8],
    }),
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['#fff', color],
    }),
    zIndex: 999,
  }),

  input: type => ({
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    paddingHorizontal: type == 'phone' ? 8 : 16,
  }),

  error: {
    fontSize: 12,
    color: '#d03d56',
    marginTop: 4,
  },
});
