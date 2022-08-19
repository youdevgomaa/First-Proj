import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from './src/components/Button';
import {CalcData} from './src/values/CalcData';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const App = () => {
  const [buttonPressed, setButtonPressed] = useState('');
  const [onOperationDone, setOnOperationDone] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  const onPressHandler = (item: string, index: Number, index2: Number) => {
    if (index === 0 && index2 === 0) {
      //c
      setButtonPressed('');
      return;
    }
    if (
      buttonPressed.includes('+') ||
      buttonPressed.includes('-') ||
      buttonPressed.includes('*') ||
      buttonPressed.includes('/') ||
      buttonPressed.includes('%')
    ) {
      if (
        item === '+' ||
        item === '-' ||
        item === '*' ||
        item === '/' ||
        item === '%'
      ) {
        return;
      }
    }
    if (index === 4 && index2 === 2) {
      //delete
      setButtonPressed(prev => prev.slice(0, -1));

      return;
    }
    if (item === '^2') {
      const operationStr = buttonPressed.split('^2');
      const value: Number = parseFloat(operationStr[0]) ** 2;
      console.log(value);
      setButtonPressed(value.toString());
      setOnOperationDone(true);
      return;
    }
    if (index === 4 && index2 === 3) {
      //equal
      if (buttonPressed.includes('*')) {
        const operationStr = buttonPressed.split('*');
        setButtonPressed(
          (
            parseFloat(operationStr[0]) * parseFloat(operationStr[1])
          ).toString(),
        );
      }

      if (buttonPressed.includes('+')) {
        const operationStr = buttonPressed.split('+');
        setButtonPressed(
          (
            parseFloat(operationStr[0]) + parseFloat(operationStr[1])
          ).toString(),
        );
      }
      if (buttonPressed.includes('-')) {
        const operationStr = buttonPressed.split('-');
        setButtonPressed(
          (
            parseFloat(operationStr[0]) - parseFloat(operationStr[1])
          ).toString(),
        );
      }
      if (buttonPressed.includes('/')) {
        const operationStr = buttonPressed.split('/');
        setButtonPressed(
          (
            parseFloat(operationStr[0]) / parseFloat(operationStr[1])
          ).toString(),
        );
      }
      if (buttonPressed.includes('%')) {
        const operationStr = buttonPressed.split('%');
        setButtonPressed(
          (
            parseFloat(operationStr[0]) % parseFloat(operationStr[1])
          ).toString(),
        );
      }
      setOnOperationDone(true);
      return;
    }
    if (onOperationDone) {
      if (
        !(index === 3 && index2 === 3) &&
        !(index === 2 && index2 === 3) &&
        !(index === 1 && index2 === 3) &&
        !(index === 0 && index2 === 3) &&
        !(index === 0 && index2 === 2) &&
        !(index === 0 && index2 == 1)
      ) {
        setButtonPressed(item);
      } else {
        setButtonPressed(prev => prev + item);
      }
      setOnOperationDone(false);
      return;
    } else {
      setButtonPressed(prev => prev + item);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSplashDone(true);
    }, 1500);
  }, []);

  return (
    <>
      {splashDone ? (
        <View style={styles.container}>
          <Text style={[styles.base, {margin: 30}]}>
            {buttonPressed || "Let's Start"}
          </Text>
          {CalcData.map((item, index) => {
            return (
              <View style={styles.row}>
                {item.map((item2, index2) => (
                  <Button
                    title={item2}
                    color={index === 0 || index2 === 3 ? '#444444' : '#000'}
                    onPress={() => onPressHandler(item2, index, index2)}
                  />
                ))}
              </View>
            );
          })}
        </View>
      ) : (
        <View
          style={{
            width: w,
            height: h,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 200, height: 200}}
            source={require('./src/assets/calculator.png')}
          />
        </View>
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  base: {fontSize: 35, height: 79},
  container: {width: w, flex: 1, height: h},
  row: {flexDirection: 'row', width: w, height: 116},
});
