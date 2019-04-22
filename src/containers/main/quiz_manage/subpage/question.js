import React from 'react'

import {Row,Col,Input, Icon, Divider,Button,Card,Tag,InputNumber} from 'antd'

export default class QuestionCard extends React.Component {
    constructor(){
        super()
        this.state = {
            type : 0, //1 填空题  5 简答题 6 编程题
        }
    }

    componentWillMount(){
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.questionList[0]) {
            this.setState({type : nextProps.questionList[0].type})
        }

    }

    //老师打分框框改变
    scoreChange(i,value){
        this.props.scoreChange(this.state.type,i,value);
    }

    render(){

        let questionList = [];
        this.props.questionList.forEach((item,i)=>{
            questionList.push(
                <div className="question-single" key={i}>
                    <Tag>Question {i+1}:</Tag>
                    <div className="content">
                        {item.questionstem}
                    </div>
                    <div className="content">
                        <div className="bold">Options: </div>
                        <div>A: 1</div>
                        <div>B: 2</div>
                        <div>C: 3</div>
                        <div>D: 4</div>
                    </div>
                    <div className="content">
                        <div className="bold">Answer: </div>
                        <div>{item.answer}</div>
                    </div>
                    {i == this.props.questionList.length-1 ? "" : <Divider dashed="true"/>}
                </div>
            )
        })


        return(
            <Card title={this.props.title} bordered={false} style={{ width: '100%' }}>
                {questionList}
            </Card>
        )
    }
}
