import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';

const w = Dimensions.get('window').width;

type TProps = {
  title: string;
  color: string;
};

const Button = ({title, color, ...props}: TouchableOpacityProps & TProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        flex: 1,
        padding: 5,
        width: w * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
      }}>
      <Text style={{color: '#fff', fontSize: 22}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
