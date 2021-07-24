import React, {useEffect, useState, useRef} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import ProgressBar from './ProgressBar';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import Post from './Post';

const ViewTypes = {
  TYPE_VIDEO: 0,
  TYPE_LOAD: 1,
};

const width = Dimensions.get('window').width;

const PostRecyclerView = ({
  posts,
  onRefresh,
  style,
  refreshing,
  onEndReached,
  hasMore,
}) => {
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
          dim.height = 120 + width;
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
        return <Post item={data} />;
      case ViewTypes.TYPE_LOAD:
        return <ProgressBar />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setDataProvider(dataProvider.cloneWithRows(posts));
  }, [posts]);

  const visibleLog = (all, now, notNow) => {
    //console.log('All : ' + JSON.stringify(all));
    //console.log('Now : ' + JSON.stringify(now));
    //console.log('NotNow : ' + JSON.stringify(notNow));
  };

  if (posts.length > 0) {
    return (
      <RecyclerListView
        style={style}
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        onEndReached={onEndReached}
        forceNonDeterministicRendering={true}
        rowRenderer={rowRenderer}
        renderAheadOffset={1000}
        onVisibleIndicesChanged={visibleLog}
        scrollViewProps={{
          refreshControl: (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ),
        }}
        renderFooter={() => {
          if (hasMore && hasMore.current) {
            return <ProgressBar />;
          }
          return null;
        }}
      />
    );
  } else {
    return <ProgressBar />;
  }
};

export default PostRecyclerView;
