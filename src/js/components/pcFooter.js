import React from 'react';
import { Row, Col} from 'antd';
import {Tabs} from "antd/lib/index";


export default class PCFooter extends React.Component{
    constructor(){
        super();
        this.state = {
            current:'top',
        }
    }
    render(){
        return(
            <footer>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className='footer'>
                        &copy;&nbsp;2016 ReactNews. All Rights Reserved
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </footer>
        )
    }
}