import React from 'react';

import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import UserAuthPanel from '../containers/UserAuthPanel/UserAuthPanel';
import SearchPanel from '../containers/SearchPanel/SearchPanel';
import TagList from '../containers/TagList/TagList';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyRawTheme from '../muiTheme';

class Wrapper extends React.Component {
  
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  getChildContext() {
    return {
      muiTheme: getMuiTheme(MyRawTheme)
    };
  };

  render() {
    const { children, title = 'DámeMatiku' } = this.props;
    return (
      <div className={'page'}>
        <AppBar
          title={<img src={'/logotype_inv.png'} style={{ marginTop: 14 }} />}
          onTitleTouchTap={() => window.location = '/'}
          iconElementLeft={<span />}
          iconElementRight={<UserAuthPanel />} />
        <div className={'pageContent'}>
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <SearchPanel />
          </div>
          {children}
        </div>
      </div>
    );
  };

}

export default Wrapper;
