import React from 'react';
import { Row, Col } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
    Menu, Icon, Tabs,
    message,
    Form,
    Input,
    Button,
    Checkbox,
    Modal,
    Card,
    notification,
} from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: '',
        }
    }
    componentDidMount() {
        var myFetchOptions = {
            method: "GET",
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
            .then(response => {
                return response.json();
            }).then(json => {
                this.setState({ comments: json });
            });
    }
    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: "GET",
        }
        var formData = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&comment=" + formData.remark, myFetchOptions)
            .then(response => {
                return response.json();
            }).then(json => {
                this.componentDidMount();
            });
    }
    addUserCollection() {
        var myFetchOptions = {
            method: "GET",
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
            .then(response => {
                return response.json();
            }).then(json => {
                //收藏成功后做一下全局提醒
                notification['success']({ message: 'ReactNews 提醒', description: '收藏此文章成功' })
            });
    }
    render() {
        let { getFieldProps } = this.props.form;
        const { comments } = this.state;
        const commentList = comments.length ?
            comments.map((comment, index) => (
                <Card key={index} title={comment.UserName} extra={<a href="#">发布于 {comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            "没有加载到任何评论";
        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="您的评论">
                                <Input type="textarea" placeholder="随便写" {...getFieldProps('remark', { initiaValue: "" })} />
                            </FormItem>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                            &nbsp;&nbsp;
                            <Button type="primary" htmlType="submit" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
                        </Form>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default CommonComments = Form.create({})(CommonComments);