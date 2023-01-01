import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

  constructor(){
    super();
    console.log("Hello this is contructor form news component")
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f19ec3b3b8d346ea9530f11fdfdb4a78&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles, 
        totalResults: parsedData.totalResults,
        loading: false
    });
  }

  handleNext = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f19ec3b3b8d346ea9530f11fdfdb4a78&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    
    this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
    })
  }

  handlePrev = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f19ec3b3b8d346ea9530f11fdfdb4a78&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    
    this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
    })
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className="text-center my-5">NewMonkey - top headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={!element.urlToImage?"https://www.sammobile.com/wp-content/uploads/2022/05/Google-Pixel-7-Pro-Colors-720x402.jpg":element.urlToImage} newsUrl={element.url}/>
                    </div>
          })}
        </div>
        <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&laquo; Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &raquo;</button>
        </div>  
      </div>
    )
  }
}

export default News
