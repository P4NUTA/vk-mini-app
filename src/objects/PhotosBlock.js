import React from 'react';

import '../styles/PhotosBlock.css';
import {openImage} from "../system/Utils";


class PhotosBlock extends React.Component {
    render() {
        return <div className="PhotosBlockContainer">
            <div className="PhotosBlockImages" >
                {
                    this.props.images.map((url, index) =>
                        <div key={index} className="PhotosBlockImageContainer">
                            <div className="PhotosBlockImage" style={{backgroundImage: `url(${url})`}}
                                 onClick={() => openImage(index, this.props.images)}/>
                        </div>
                    )
                }
            </div>
        </div>
    }
}

PhotosBlock.propTypes = {};

export default PhotosBlock;
