//单选题
import React from 'react';
import ReactDOM from 'react-dom'

import { Form,Input,Select,Icon,Radio,Row,Col,Button,Upload,message,Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

let localCounter = 4;
class SingleQuestion extends React.Component {

    constructor(){
        super();
        this.state = {
            fileList : [],
            rightAnswer : '',
        }
    }

    //提交
    handleSubmit(e){
        e.preventDefault();


        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if(this.state.rightAnswer === '') {
                    Modal.warning({
                        content: '请选择正确答案',
                        okText : '确定'
                    });
                    return;
                }
                let choice = [];
                for(let variable in values) {
                    if (/^option/.test(variable)) {
                        choice.push(values[variable]);
                    }
                }

                //提交题目信息
                httpServer({
                    url : URL.q_checkin
                },{
                    className : 'QuestionInfoServiceImpl',
                    gradeId : this.props.level,
                    pointId : values.knowledgePoint,
                    questionstem : values.tigan,
                    imageSrc : '',
                    type : 2,
                    answer : this.state.rightAnswer,
                    choice : choice,
                    choiceType : 0
                })

            }
        });
    }

    //点击答案
    clickWhichAnswer(option){
        this.setState({rightAnswer : option})
        // console.log(this.state.rightAnswer)
    }

    //增加选项
    addOption(){
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        let nextOptionCode = 'A'.charCodeAt(0);
        if(keys.length > 0) {
            let lastOptionCode = keys[keys.length - 1].option.charCodeAt(0);
            nextOptionCode = lastOptionCode+1;
        }
        keys.push({
            option : String.fromCharCode(nextOptionCode),
            key : ++localCounter
        });
        // this.setState({answerOptions : this.state.answerOptions})
        form.setFieldsValue({
            keys: keys,
        });
    }

    //删除选项
    deleteOption(key,i){

        const { form } = this.props;
        let keys = form.getFieldValue('keys');
        if(i === keys.length-1) {
            //删除的是最后一个
            this.setState({rightAnswer : ''})
        }
        keys = keys.filter(item => item.option !== key)
        for(let j = i;j<keys.length;j++) {
            keys[j].option = String.fromCharCode(keys[j].option.charCodeAt(0)-1);
        }
        form.setFieldsValue({
            keys: keys,
        });
    }



    render(){
        //验证
        const { getFieldDecorator,getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [{
                option : 'A',
                key : 0
            },{
                option : 'B',
                key : 1
            },{
                option : 'C',
                key : 2
            },{
                option : 'D',
                key : 3
            }] });
        //表单项布局
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };

        //答案列表
        const keys = getFieldValue('keys');
        const answerList = keys.map((item, i) => {
            return (
                <Row key = {item.key}>
                    <Col span={21}>
                        <FormItem
                            {...formItemLayout}
                            label={'OPTION '+item.option}
                        >
                            {getFieldDecorator('option'+item.option)(
                                <Input addonAfter={<Radio checked={this.state.rightAnswer === item.option} onClick={this.clickWhichAnswer.bind(this,item.option)}>RIGHT ANSWER</Radio>}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={2} offset={1}>
                        <Button onClick={this.deleteOption.bind(this,item.option,i)}><Icon type="delete"></Icon></Button>
                    </Col>
                </Row>
            )
        })

        return(
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Row>
                        <Col span={21}>
                            <FormItem
                                {...formItemLayout}
                                label="CONTENT"
                            >
                                {getFieldDecorator('tigan', {
                                    rules: [{ required: true, message: '提干不能为空！' }],
                                })(
                                    <TextArea rows={4} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={2} offset={1}>
                        </Col>
                    </Row>



                    {answerList}
                    <FormItem>
                        <Button type="primary" className="f-r" onClick={this.addOption.bind(this)}>NEW OPTION</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }

}

export default Form.create()(SingleQuestion);
