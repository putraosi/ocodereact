import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FloatingInput} from '../component';

const Main = () => {
  const [fullname, setFullname] = useState('');

  return (
    <View style={styles.container}>
      <FloatingInput
        label={'Country Name'}
        value={fullname}
        onChangeText={value => setFullname(value)}
      />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',
    padding: 100,
    paddingTop:200
  },
});
