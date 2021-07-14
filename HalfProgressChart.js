/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { VictoryPie, VictoryLabel } from 'victory-native';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  theme,
} from '../../../../src/constants/constants';
import { Svg } from 'react-native-svg';

const possibleWidth = {
  large: SCREEN_WIDTH * 0.86,
  normal: SCREEN_WIDTH * 0.75,
};
const possibleHeight = {
  normal: SCREEN_HEIGHT * 0.375,
  large: SCREEN_HEIGHT * 0.5,
};

const HalfProgressChart = ({
  percentage = 25,
  width = 'normal',
  height = 'normal',
  backgroundColor,
  color = '#000',
  labelColor,
  strockColor = '#000',
  style,
  containerStyle,
  ...props
}) => {
  const {
    colors: { alert },
  } = theme;
  // relative measures
  const chosenWidth = possibleWidth[width];
  const chosenHeight = possibleHeight[height];
  const communStyle = {
    backgroundColor: backgroundColor,
    height: chosenHeight,
    width: chosenWidth,
    justifyContent: 'center',
  };

  const svgCord = '0 0 ' + chosenWidth + ' ' + chosenHeight;
  console.log('chosenWidth', chosenWidth)
  console.log('chosenHeight', chosenHeight)

  const getData = percent => {
    return [
      { x: 1, y: percent },
      { x: 2, y: 100 - percent },
    ];
  };

  const percentageData = getData(percentage);

  return (
    <View style={[communStyle, containerStyle]}>
      <Svg viewBox={svgCord} width="100%" height="100%">
        <VictoryPie
          startAngle={-90}
          endAngle={90}
          standalone={false}
          animate={{ duration: 1000 }}
          width={chosenWidth}
          height={chosenHeight}
          data={percentageData}
          innerRadius={chosenWidth / 3}
          cornerRadius={5}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const colors = color;
                return datum.x === 1 ? colors : '#f8f8f8';
              },
            },
          }}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={SCREEN_WIDTH * 0.125}
          y={chosenHeight / 2 + 10}
          text={'-100'}
          style={{ fontSize: 10 }}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={chosenWidth - SCREEN_WIDTH * 0.125}
          y={chosenHeight / 2 + 10}
          text={'100'}
          style={{ fontSize: 10 }}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={chosenWidth / 2}
          y={chosenHeight / 2 - 30}
          text={'25'}
          style={{ fontSize: 40 }}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={chosenWidth / 2}
          y={chosenHeight / 2}
          text={'March 2019'}
          style={{ fontSize: 12 }}
        />
      </Svg>
    </View>
  );
};

HalfProgressChart.propTypes = {
  percentage: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  labelColor: PropTypes.string,
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
};

export default HalfProgressChart;
