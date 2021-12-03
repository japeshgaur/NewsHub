import React, {useEffect} from 'react'
import { useState } from 'react';
import  Spinner  from './Spinner';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {

    const [articles, setarticles] = useState([])
    const [Loading, setLoading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    
   const capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

        

     const  UpdateNews = async ()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=967a2d84dbd049769cc8fefdf572ebc0&page=${page}&pagesize=${props.pageSize}`;
       
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - News Monkey`;
        UpdateNews();
        // eslint-disable-next-line
    }, [])

    // handlePrevChange = async ()=>{
    //     setState({page: state.page - 1});
    //     UpdateNews();
    // }
    // handleNextChange = async ()=>{
    //    setState({page: state.page + 1});
    //     UpdateNews();
    // }
    const fetchMoreData = async () => {
          setpage(page+1)
          const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=967a2d84dbd049769cc8fefdf572ebc0&page=${page+1}&pagesize=${props.pageSize}`;
          setpage(page+1)
          setLoading(false)
          let data = await fetch(url);
          let parsedData = await data.json()
          setarticles(articles.concat(parsedData.articles))
          settotalResults(parsedData.totalResults)
      };

   
        return (
            < >
                <h1 className="text-center " style={{margin: '20px 0px', marginTop: '90px'}}>News Monkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
             {Loading && <Spinner />}
             <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
            <div className="container">
                <div className="row">
                {  articles.map((element)=>{

                return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description} imageURL = {element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source = {element.source.name}/>
                    </div>                
                })}
                </div>
                </div>
                </InfiniteScroll>
                
            </>
        )
}
News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
  }
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }


export default News
