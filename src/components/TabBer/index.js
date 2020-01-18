import { TabBar } from 'antd-mobile';
import React from 'react';
import { withRouter } from 'react-router-dom';
@withRouter
class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '1',
      hidden: false,
      fullScreen: true,
    };
  }
  componentDidMount() {
  }


  render() {
    let url = this.props.location.pathname
    let showNav = /^(\/video|\/book)$/.test(url)

    return <>
      {showNav && <div style={this.state.fullScreen ? { position: 'fixed', bottom: '0', width: '100%', zIndex: '10001' } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            icon={{ uri: require('../../assets/images/video_nomal.png') }}
            selectedIcon={{ uri: require('../../assets/images/video_pressed.png') }}
            title="视频"
            key="视频"
            selected={url === '/video' ? true : false}
            onPress={() => {
              if (url !== '/video') {
                this.props.history.push('/video')
              }
            }}
          />
          <TabBar.Item
            icon={{ uri: require('../../assets/images/book_nomal.png') }}
            selectedIcon={{ uri: require('../../assets/images/book_pressed.png') }}
            title="听书"
            key="听书"
            selected={url === '/book' ? true : false}
            onPress={() => {
              if (url !== '/book') {
                this.props.history.push('/book')
              }
            }}
          />
        </TabBar>
      </div>
      }
    </>
  }
}
export default TabBarExample
