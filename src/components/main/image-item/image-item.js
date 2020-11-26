import React from 'react';

//import LikePart from './like-part'

import PhotoService from '../../../photo-service/photo-service'

import './image-item.css';

export default class ImageItem extends React.Component {
   

    photoServise = new PhotoService();
    
    _arr = [false, false, false, false, false];

    state = {
        numberPictures: 5,
        likes: null,
        data: null

    };
    
    componentDidMount() {
        this.photoServise.getImages(1,this.state.numberPictures)
            .then((result) => {
                this.setState({
                    likes: this._arr,
                    data: result
                })
            });
    };

    componentDidUpdate(prevState) {
        if(this.state.numberPictures !== prevState.numberPictures){
            this.photoServise.getImages(1,this.state.numberPictures).then((result) => {
                this.setState(() => {
                    return {
                        data: result
                    }
                });
            });
        }
    }

    addImage = () => {
        this.setState(prevState => ({
            numberPictures: prevState.numberPictures + 5,
            likes: [...prevState.likes, ...this._arr]
        }));

    };

    likeAdd = (id) => {
        const { likes } = this.state;
        const result = likes.map((item, index) => {
            if (index === id){
                return item = !item;
            } else {
                return item
            }
        });
        this.setState(() => {
            return {
                likes: result
            }
        });
        
    };
    
    filterLike = () =>{
        const { likes, data } = this.state;
        debugger
        let d = [...data];
        let newData = [];
        
        for(let i = 0; i < likes.length; i++){
            if(likes[i]){
                newData = [...newData, d[i]];
            };
        };
        
        this.setState({
            data: newData
        });
    };

    render(){
        const { data, likes } = this.state;
        
        if( !data ){
            return null;
        }

        const items = data.map(({id, download_url, author, likeID}) => {
            return(
                <div className="card-image" key={id}>
                    <a href={download_url}>
                        <img className="img-content"  
                            src={download_url} 
                            alt={author}/>
                    </a>
                    <span className="card-title">{ author }</span>
                    <div >
                        <div className="likeContainer">
                            <button className="likeButton"
                                onClick={ () => this.likeAdd(likeID) }>LIKE</button>
                            <span>{ Number( likes[likeID] )  }</span>
                        </div>
                    </div>
                </div>
            );
        });

        return(
            <div>
                <div>
                    <button  onClick={ this.filterLike }
                            className="image-btn">Liked Image</button>
                </div>

                <div className="img-container">
                    { items }
                </div>
                <div>
                    <button onClick={ this.addImage } 
                            className="image-btn">add more images</button>
                </div>
            </div>       
        );
    };
};