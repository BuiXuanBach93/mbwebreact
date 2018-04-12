import React from 'react';
import ImageViewer from 'components/ImageViewer';

const TAG = 'Photo'

export default class Photo extends React.Component {
    
    constructor(props){
        super(props)
        console.log(TAG +'>Constructor>Props', props)
        this.state = { isOpenImageViewer: true}
    }

    handleCloseImageViewer = () =>{
        // this.props.router.goBack()
    }
    render() {
        return (
            <div className="app">
                <ImageViewer index={this.props.location.state.index} isOpen={this.state.isOpenImageViewer} closeImageViewer={this.handleCloseImageViewer} images={this.props.location.state.images}/>
            </div>
        );
    }
}