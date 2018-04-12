import WxImageViewer from 'libs/WxImageViewer';
import React, { Component } from 'react';
class ImageViewer extends Component {

  render() {
    
    return (
      <div>
        {
          this.props.isOpen ? <WxImageViewer onClose={this.props.closeImageViewer} urls={this.props.images} index={this.props.index} maxZoomNum={2}/> : ""
        }
      </div>
    )
  }
}

export default ImageViewer;