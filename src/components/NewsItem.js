import React from 'react'

const NewsItem = ({
    title = '',
    description = '',
    imageUrl = 'https://static.toiimg.com/thumb/msid-110436182,width-1070,height-580,imgsize-525399,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg',
    newsUrl = '',
    author = 'unknown',
    date = new Date(),
    source = ''
}) => {
    return (
        <div className='my-3'>
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0 }}>
                    <span className="badge rounded-pill bg-danger" style={{ left: '90%', zIndex: 1 }}>
                        {source}
                    </span>
                </div>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
