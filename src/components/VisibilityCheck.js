import React, {useEffect, useRef} from 'react';
import {Dimensions, View} from 'react-native';

const window = Dimensions.get('window');

const VisibilityCheck = props => {
  const view = useRef(undefined);
  const interval = useRef(undefined);
  const lastValue = useRef(false);

  useEffect(() => {
    if (!props.disabled) startWatching();
    else stopWatching();
    return () => {
      stopWatching();
      //props.onUnmount();
    };
  }, []);

  const stopWatching = () => {
    if (!interval.current) return;
    interval.current = clearInterval(interval.current);
  };

  const startWatching = () => {
    if (interval.current) return;
    interval.current = setInterval(() => {
      if (!view.current) return;
      view.current.measure((x, y, width, height, pageX, pageY) => {
        const isVisible =
          pageY + height != 0 &&
          pageY >= 0 &&
          pageY + height <= window.height &&
          pageX + width > 0 &&
          pageX + width <= window.width;
        if (lastValue.current !== isVisible) {
          lastValue.current = isVisible;
          props.onChange(isVisible);
        }
      });
    }, props.delay || 200);
  };

  return (
    <View collapsable={false} ref={view} {...props}>
      {props.children}
    </View>
  );
};

export default VisibilityCheck;
