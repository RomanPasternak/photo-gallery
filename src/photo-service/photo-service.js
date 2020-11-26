export default class PhotoService {
    
    getResorse = async (url) => {
        const res = await fetch(url);
        return await res.json();
    };
    
    getImages = async (page, size) => {
        const res = await this.getResorse(`https://picsum.photos/v2/list?page=${page}&limit=${size}`);
        return res.map(this._transform);
    }

    _transform = (img, likeId) => {
        return {
            id: img.id,
            download_url: img.download_url, 
            author: img.author,
            likeID: likeId
        };
    }
}