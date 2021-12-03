import React from 'react'

const NewsItem = (props)=> {
        let {title,description,imageURL,newsUrl,publishedAt,author,source} = props;
        return (
            <div className="my-3">
               <div className="card">
               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger " style = {{left: '90%', zIndex: '1'}}>
   {source}
    <span className="visually-hidden">unread messages</span>
  </span>
                <img src={!imageURL?"https://c.ndtvimg.com/2021-10/47f55im8_virat-kohli-eoin-morgan_625x300_18_October_21.jpg":imageURL} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} at {new Date(publishedAt).toGMTString()}</small></p>
                    <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                </div>
                </div>
            </div>
        )
}

export default NewsItem
