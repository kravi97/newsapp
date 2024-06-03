import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ country = 'in', pageSize = 8, apiKey, category = 'general', setProgress }) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const updateNews = async () => {
        setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apikey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        setLoading(true)
        await fetch(url).then((response) => {
            setProgress(30);
            response.json().then((news) => {
                setArticles(news.articles)
                setTotalResults(news.totalResults)
                setLoading(false)
                setProgress(100);
            })
        })
    }

    useEffect(() => {
        updateNews();
    }, [])

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`;
        setPage(page + 1)
        fetch(url).then((response) => {
            response.json().then((news) => {
                setArticles(articles.concat(news.articles))
                setTotalResults(news.totalResults)
            })
        })
    };

    return (
        <>
            <h2 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey - Top {category.charAt(0).toUpperCase() + category.slice(1)} Headlines</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
