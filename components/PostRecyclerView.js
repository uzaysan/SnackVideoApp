import React, {useEffect, useState} from 'react';
import {Dimensions, RefreshControl, ActivityIndicator} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {colors_light} from '../values/Colors';
import Post from './Post';

const ViewTypes = {
  TYPE_VIDEO: 0,
  TYPE_LOAD: 1,
};

const width = Dimensions.get('window').width;

const PostRecyclerView = ({posts, onRefresh, style, refreshing}) => {
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1.objectId !== r2.objectId;
    }),
  );

  const layoutProvider = new LayoutProvider(
    index => {
      return ViewTypes.TYPE_VIDEO;
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.TYPE_VIDEO:
          dim.width = width;
          dim.height = 115 + width;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

  const rowRenderer = (type, data) => {
    switch (type) {
      case ViewTypes.TYPE_VIDEO:
        return <Post post={data} />;
      case ViewTypes.TYPE_LOAD:
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
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        contentContainerStyle={{marginTop: 3, marginBottom: 3}}
        //onEndReached={addNewItems}
        renderFooter={() => (
          <View
            style={{
              width: '100%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={40} color={colors_light.neutralColor} />
          </View>
        )}
        forceNonDeterministicRendering={true}
        rowRenderer={rowRenderer}
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

export default PostRecyclerView;
