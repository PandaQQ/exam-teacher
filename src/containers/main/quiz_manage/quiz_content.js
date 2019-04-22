import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'

import {Row,Col,Select,Input,Table, Icon, Divider,Button,Card,Tag,Modal} from 'antd'
const Option = Select.Option;
const Search = Input.Search;

import {Link} from 'react-router-dom'
import {withRouter} from "react-router-dom";

import ReadingCard from '../paper_manage/subpage/reading_card'
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'
import QuestionCard from './subpage/question';

class QuizContent extends React.Component {

    constructor(){
        super()
        this.state = {
            fillInList : [],
            shortAnswerList : [],
            programList : [],
        }
        this.gapscorelist = [];
        this.shoscorelist = [];
        this.proscorelist = [];
        this.totalScore = 0;
    }

    getStuAnswer(instId){
        httpServer({
            url : URL.get_stu_answer
        },{
            className : 'GetQuestionStuAnswerImpl',
            instId : instId,
        })
        .then((res)=>{
            let respDate = res.data.data;
            let fillInList =[];
            let shortAnswerList=[];
            let programList=[];
            for(let i=0;i<respDate.length;i++) {
                if(respDate[i].type == '1') { //填空题
                    fillInList.push(respDate[i]);
                }
                else if(respDate[i].type == '5') { //简答题
                    shortAnswerList.push(respDate[i]);
                }
                else if(respDate[i].type == '6') {//编程题
                    programList.push(respDate[i]);
                }
            }
            this.gapscorelist.length = fillInList.length;
            this.shoscorelist.length = shortAnswerList.length;
            this.proscorelist.length = programList.length;
            this.setState({
                fillInList : fillInList,
                shortAnswerList : shortAnswerList,
                programList : programList,
            })
        })
    }

    //老师打分框框改变
    scoreChange(type,i,value){
        if(type == '1') { //填空题
            this.gapscorelist[i] = value;
        }
        else if(type == '5') { //简答题
            this.shoscorelist[i] = value;
        }
        else if(type == '6') {//编程题
            this.proscorelist[i] = value;
        }
    }

    //提交
    submitScore(){

        //总分
        let totalScore = 0;
        let flag = false;
        for(let i = 0;i<this.gapscorelist.length;i++) {
            if(typeof this.gapscorelist[i] == "undefined") {
                flag = true;
                this.gapscorelist[i] = 0;
            }
            totalScore += parseInt(this.gapscorelist[i]);
        }

        for(let i = 0;i<this.shoscorelist.length;i++) {
            if(typeof this.shoscorelist[i] == "undefined") {
                flag = true;
                this.shoscorelist[i] = 0;
            }
            totalScore += parseInt(this.shoscorelist[i]);
        }

        for(let i = 0;i<this.proscorelist.length;i++) {
            if(typeof this.proscorelist[i] == "undefined") {
                flag = true;
                this.proscorelist[i] = 0;
            }
            totalScore += parseInt(this.proscorelist[i]);
        }

        if(flag) {
            Modal.warning({
                title: '您有题目还没有评分，请评分后再提交',
                okText : '确定'
            });
            return;
        }

        httpServer({
            url : URL.submit_score
        },{
            className : 'StudentExamUpdateImpl',
            instId :this.props.match.params.instId,
            gapscorelist : this.gapscorelist,
            shoscorelist : this.shoscorelist,
            proscorelist : this.proscorelist,
            totalScore : totalScore,
            updateType : 2,
        })
        .then((res)=>{
            this.props.history.push(`/main/paper_manage/scoring/all_papers/${this.props.match.params.paperId}/${this.props.match.params.classId}`);
        })

    }

    componentWillMount(){
        this.getStuAnswer(this.props.match.params.instId);
    }

    render(){
        return(
            <div>
                <BreadcrumbCustom pathList={['Quiz Management','Quiz List', 'Quiz Content']}></BreadcrumbCustom>
                <div className="reading-paper-content">
                    <div className="paper">
                        <div className="m-b-20">
                            <QuestionCard title="Questions" scoreChange={this.scoreChange.bind(this)} questionList={this.state.fillInList}></QuestionCard>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(QuizContent);
