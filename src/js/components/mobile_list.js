import React from 'react';
import {Row, Col} from 'antd';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

export default class MobileList extends React.Component {
    constructor() {
        super();
        this.state = {
            news: "",
        }
    }

    componentWillMount() {
        var myFetchOptions = {
            method: "GET",
        }
        var url = "http://localhost:8080/data/FeHelper20180608153907.json";
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
            .then(response => {
                return response.json()
            }).then(json => {
            this.setState({news: json});
        })
    }

    render() {
        const {news} = this.state;
        const router = (
            <Route exact path="/" component={newsList}/>
        );

        const newsList = news.length
            ?
            news.map((newsItem, index) => (
                <section key={index} className="m_article list-item special_section clearfix">
                    <Link to={`details/${newsItem.uniquekey}`}>
                        <div className="m_article_img">
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                        </div>
                        <div className="m_article_info">
                            <div className="m_article_title">
                                <span>{newsItem.title}</span>
                            </div>
                            <div className="m_article_desc clearfix">
                                <div className="m_article_desc_l">
                                    <span className="m_article_channel">{newsItem.realType}</span>
                                    <span className="m_article_time">{newsItem.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            ))
            :
            "没有加载到任何新闻";
        return (
            <div>
                    <Row>
                        <Col span={24}>
                            {newsList}
                        </Col>
                    </Row>
            </div>
        )
    }
}