import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  View,
} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import GridItemThreeImage from './GridItemThreeImage';
import GridItemVideoLeft from './GridItemVideoLeft';
import GridItemVideoRight from './GridItemVideoRight';
import {Constants} from '../Helper/Constants';
import {colors_light} from '../values/Colors';

const ViewTypes = {
  TYPE_THREE_NORMAL: 0,
  TYPE_BIG_RIGHT: 1,
  TYPE_BIG_LEFT: 2,
};

let {width} = Dimensions.get('window');

const GridRecyclerView = ({
  posts,
  onRefresh,
  style,
  refreshing,
  onEndReached,
}) => {
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1.objectId !== r2.objectId;
    }),
  );

  const layoutProvider = new LayoutProvider(
    index => {
      if (index % 6 === 1) return ViewTypes.TYPE_BIG_RIGHT;
      else if (index % 6 === 4) return ViewTypes.TYPE_BIG_LEFT;
      else return ViewTypes.TYPE_THREE_NORMAL;
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.TYPE_THREE_NORMAL:
          dim.width = width;
          dim.height = width / 3;
          break;
        case ViewTypes.TYPE_BIG_RIGHT:
          dim.width = width;
          dim.height = (width / 3) * 2 + Constants.exploreItemMargin;
          break;
        case ViewTypes.TYPE_BIG_LEFT:
          dim.width = width;
          dim.height = (width / 3) * 2 + Constants.exploreItemMargin;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

  const rowRenderer = (type, data) => {
    switch (type) {
      case ViewTypes.TYPE_THREE_NORMAL:
        return <GridItemThreeImage data={data} />;
      case ViewTypes.TYPE_BIG_LEFT:
        return <GridItemVideoLeft data={data} />;
      case ViewTypes.TYPE_BIG_RIGHT:
        return <GridItemVideoRight data={data} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setDataProvider(dataProvider.cloneWithRows(posts));
  }, [posts]);

  if (posts.length > 0) {
    return (
      <RecyclerListView
        style={style}
        contentContainerStyle={{marginTop: 1, marginBottom: 1}}
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={rowRenderer}
        onEndReached={onEndReached}
        renderAheadOffset={1000}
        scrollViewProps={{
          refreshControl: (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ),
        }}
      />
    );
  } else {
    return (
      <View
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={40} color={colors_light.neutralColor} />
      </View>
    );
  }
};

export default GridRecyclerView;
