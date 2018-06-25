import React from 'react';
import {Row, Col} from 'antd';
import {Tabs, Carousel} from 'antd';
import PCNewsBlock from './pc_news_blocks';
import PCNewsImageBlock from './pc_news_img_block';

const TabPane = Tabs.TabPane;
export default class PCNewsContainer extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="contatiner">
                        <div className="leftContatiner">
                            <div className="carousel">
                                <Carousel autoplay>
                                    <div><img src="../../img/carousel_1.jpg" alt=""/></div>
                                    <div><img src="../../img/carousel_2.jpg" alt=""/></div>
                                    <div><img src="../../img/carousel_3.jpg" alt=""/></div>
                                    <div><img src="../../img/carousel_4.jpg" alt=""/></div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock count={6} type="guoji" width="400px" cardTitle="国际头条" imageWidth="106px">
                            </PCNewsImageBlock>
                        </div>
                        <div className="tabs_news">
                            <Tabs>
                                <TabPane tab="头条新闻" key="1">
                                    <PCNewsBlock count={22} type="top" width="100%" bordered="false"/>
                                </TabPane>
                                <TabPane tab="国际" key="2">
                                    <PCNewsBlock count={22} type="guoji" width="100%" bordered="false"/>
                                </TabPane>
                            </Tabs>
                        </div>
                        <div>
                            <PCNewsImageBlock count={8} type="guonei" width="100%" cardTitle="国内头条" imageWidth="120px">
                            </PCNewsImageBlock>
                            <PCNewsImageBlock count={16} type="yule" width="100%" cardTitle="娱乐头条" imageWidth="120px">
                            </PCNewsImageBlock>
                        </div>

                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )

    }
}