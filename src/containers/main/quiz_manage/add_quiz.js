import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'
import { Form,Input,Select,Icon,Radio,Row,Col,Button,message,InputNumber,Card,DatePicker,Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { connect } from 'react-redux'

import ChooseQuestiuon from './subpage/choose_question'

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class AddQuiz extends React.Component {
    constructor(){
        super()
        this.state = {
            pathList : ['Quiz Management','Add Quiz'],
            localCounter : 0,
            ChooseQuestionList :[{//出卷列表
                "score": 0,
                "num" : 0,
                "questionType": 1,  //选择
                "knowledgePointInfo": []
            },{
                "score": 0,
                "num" : 0,
                "questionType": 2,  //多选
                "knowledgePointInfo": []
            },{
                "score": 0,
                "num" : 0,
                "questionType": 3,  //判断
                "knowledgePointInfo": []
            },{
                "score": 0,
                "num" : 0,
                "questionType": 4,  //填空
                "knowledgePointInfo": []
            },{
                "score": 0,
                "num" : 0,
                "questionType": 5,  //简答
                "knowledgePointInfo": []
            },{
                "score": 0,
                "num" : 0,
                "questionType": 6,  //程序
                "knowledgePointInfo": []
            }],
            knowledgePointInfo : [] //知识点列表
        }
        this.subjectId = -1;
        this.gradeId = -1;
    }

    //发送出卷请求
    sendChooseQuestion(sendObj){
        httpServer({
            url : URL.paper_info
        },sendObj)
    }

    //提交
    handleSubmit(e){
        e.preventDefault();

        let totalScore = 0;//这套试卷的总分

        let notSendObj = {
            "questionObjects" : [],
            "gradeId": this.gradeId,
            "subjectId": this.subjectId,
            "content": "备注"
        };

        //整合出题信息
        this.state.ChooseQuestionList.forEach((item)=>{//循环每种类型的题目
            if(item.num > 0) {
                let obj = {
                    "score": item.score,
                    "questionType": item.questionType,
                    "knowledgePointInfo" :{}
                }

                let countTotal = 0;
                //循环每个知识点
                item.knowledgePointInfo.forEach((item2)=>{
                    if(!obj.knowledgePointInfo[item2.knowledge]) {
                        obj.knowledgePointInfo[item2.knowledge] = item2.count;
                    }
                    else {
                        obj.knowledgePointInfo[item2.knowledge] = obj.knowledgePointInfo[item2.knowledge] + item2.count;
                    }
                    countTotal += item2.count;
                })
                totalScore += countTotal*item.score;

                notSendObj.questionObjects.push(obj);
            }
        })

        let sendOutObj = {
            "className" : 'MakeOutPaperImpl',
            "paperInfo" : JSON.stringify(notSendObj),
        }

        if(totalScore !== 100) { //总分不是100
            Modal.confirm({
                title: '提示',
                content: '这套试卷的总分是'+totalScore+"分,你确定提交吗？",
                okText: '确认',
                cancelText: '取消',
                onOk: ()=>{
                    //用户点击确认
                    this.sendChooseQuestion(sendOutObj);
                },
            });
        }
        else {//总分是100
            this.sendChooseQuestion(sendOutObj);
        }
        // console.log(sendOutObj)

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
            }
        });
    }


    //选择等级
    gradeChange(value){
        this.gradeId = value;

    }

    render(){
        //验证
        const { getFieldDecorator } = this.props.form;

        //表单项布局
        const formItemLayout = {
            labelCol: {
                sm: { span: 12 },
            },
            wrapperCol: {
                sm: { span: 12 },
            },
        };

        const formItemLayoutTop = {
            labelCol: {
                sm: { span: 24 },
                md: { span: 6 }
            },
            wrapperCol: {
                sm: { span: 24 },
                md: { span: 18 }
            },
        }

        return (
            <div>
                <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
                <div className="choose-questions-content" style={{ background: '#F5F5F5', padding: '30px' }}>
                    <Form onSubmit={this.handleSubmit.bind(this)} className="ant-advanced-search-form">
                        <Row>
                            <Col span={10}>
                                <FormItem
                                    label="QUIZ NAME"
                                    {...formItemLayoutTop}
                                >
                                    {getFieldDecorator('subjectId')(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="Type"
                                    {...formItemLayoutTop}
                                >
                                    {getFieldDecorator('gradeId')(
                                        <Select style={{ width: 150 }} onChange={this.gradeChange.bind(this)}>
                                            <Option value="1">Math</Option>
                                            <Option value="2">Programming</Option>
                                            <Option value="3">English</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <ChooseQuestiuon title="Question 1" knowledgePointInfo={this.state.knowledgePointInfo} singleQuestion={this.state.ChooseQuestionList[0]}></ChooseQuestiuon>
                        <ChooseQuestiuon title="Question 2" knowledgePointInfo={this.state.knowledgePointInfo} singleQuestion={this.state.ChooseQuestionList[1]}></ChooseQuestiuon>
                        <ChooseQuestiuon title="Question 3" knowledgePointInfo={this.state.knowledgePointInfo} singleQuestion={this.state.ChooseQuestionList[2]}></ChooseQuestiuon>
                        <ChooseQuestiuon title="Question 4" knowledgePointInfo={this.state.knowledgePointInfo} singleQuestion={this.state.ChooseQuestionList[3]}></ChooseQuestiuon>
                        <ChooseQuestiuon title="Question 5" knowledgePointInfo={this.state.knowledgePointInfo} singleQuestion={this.state.ChooseQuestionList[4]}></ChooseQuestiuon>
                        <FormItem>
                            <Row>
                                <Col span={22} style={{paddingRight : '24px'}}>
                                    <Button type="primary" htmlType="submit" className="f-r">Add Quiz</Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        subjectinfo: state.subjectinfo
    }
}

export default connect(
    mapStateToProps
)(Form.create()(AddQuiz))
