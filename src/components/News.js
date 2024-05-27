import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=66bd6be758cb406eab30a52aca74a70b&page=1&pageSize=20";
        let data = await fetch(url).then((response) => {
            response.json().then((news) => {
                this.setState({ articles: news.articles, totalResults: news.totalResults })
            })
        })
    }

    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=66bd6be758cb406eab30a52aca74a70b&page=${this.state.page + 1}&pageSize=20`;
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        }
        else {
            let data = await fetch(url).then((response) => {
                response.json().then((news) => {
                    this.setState({ articles: news.articles })
                })
            })

            this.setState({ page: this.state.page + 1 });
        }
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=66bd6be758cb406eab30a52aca74a70b&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url).then((response) => {
            response.json().then((news) => {
                this.setState({ articles: news.articles })
            })
        })

        this.setState({ page: this.state.page - 1 });
    }


    render() {
        return (
            <div className='container my-3'>
                <h2>NewsMonkey - Top Headlines</h2>

                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
