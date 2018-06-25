import React from 'react';
import { Row, Col } from 'antd';
import {
    Menu, Icon, Tabs,
    message,
    Form,
    Input,
    Button,
    Checkbox,
    Modal,
} from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
        }
    }
    setModalVisible(value) {
        this.setState({ modalVisible: value });
    }
    setHasLogined(value) {
        this.setState({ hasLogined: value });
    }
    setUserNickName(value) {
        this.setState({ userNickName: value });
    }
    login() {
        this.setModalVisible(true);
    }
    handleClick(e) {
        if (e.key = "register") {
            this.setState({ current: 'register' });
            if (this.state.hasLogined) {
                this.setModalVisible(false);
            } else {
                this.setModalVisible(true);
            }
        } else {
            this.setState({ current: e.key });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'Get',
        }
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password
            + "&r_userName=" + formData.r_userName + "&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.r_confirmPassword, myFetchOptions)
            .then(response => response.json()).then(json => {
                this.setState({ userNickName: json.userNickName, userid: json.userid })
                localStorage.userid = json.UserId;
                localStorage.userNickName = json.NickUserName;
            });
        if (this.state.action == "login") {
            this.setHasLogined(true);
        }
        message.success("请求成功！");
        this.setModalVisible(false);
    }
    callback(key) {
        debugger;
        if (key == 1) {
            this.setState({ action: "login" });
        } else if (key == 2) {
            this.setState({ action: "register" })
        }
    }
    logout() {
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({ hasLogined: false });
    };
    render() {
        let { getFieldProps } = this.props.form;
        const userShow = this.state.hasLogined ?
            <Icon type='inbox'></Icon>
            :
            <Icon type='setting' onClick={this.login.bind(this)}></Icon>;
        return (
            <div id="mobileHeader">
                <header>
                    <img src="../../img/logo.png" alt="logo" />
                    <span>ReactNews</span>
                    {userShow}
                </header>
                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                    onCancel={() => this.setModalVisible(false)}
                    onOk={() => this.setModalVisible(false)}
                    okText="关闭">
                    <Tabs type="card" onChange={this.callback.bind(this)}>
                        <TabPane tab="注册" key="2">
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')} />
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入密码" {...getFieldProps('r_password')} />
                                </FormItem>
                                <FormItem label="确认密码">
                                    <Input type="password" placeholder="请确认密码" {...getFieldProps('r_confirmPassword')} />
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="登录" key={"1"}>
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账号" {...getFieldProps('userName')} />
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入密码" {...getFieldProps('password')} />
                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}

export default MobileHeader = Form.create({})(MobileHeader);