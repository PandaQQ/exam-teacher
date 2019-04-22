import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'
import {Row,Col,Select,Input,Table, Icon, Divider,Button,Modal,Form} from 'antd'
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const confirm = Modal.confirm;

//路由组件
import { Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";

import httpServer from '@components/httpServer.js';
import * as URL from '@components/interfaceURL.js'


class QuizList extends React.Component {
    constructor(){
        super()
        this.state = {
            data : [],
            pagination : {
                pageSize : 10,
                current : 1,
                total : 0,
                defaultCurrent : 1,
            },
            visibleChangeModal : false,
            curPaperInfo : {}
        }
        this.turnStatus = "NORMAL"; //NORMAL:正常翻页   SEARCH:搜索翻页
    }

    //搜索类型
    handleChange(value) {
        this.searchKey = value;
    }


    //得到一页数据
    getPageDate(){
        httpServer({
            url : URL.get_papers
        },{
            className : 'QueryExamServiceImpl',
            page : this.state.pagination.current,
            rows : this.state.pagination.pageSize,
            type : 1,
        })
        .then((res)=>{
            let respDate = res.data.data;
            const data = [];
            for (let i = 0; i < respDate.length; i++) {

                let teacherName = "";
                let isSetTeacher = false;
                if(respDate[i].managerList.length == 1) {//已设置老师
                    teacherName = respDate[i].managerList[0].name;
                    isSetTeacher = true;
                }
                else {//未设置老师
                    isSetTeacher = false;
                }
                data.push({
                    key: i,
                    className: respDate[i].className,
                    subjectName : respDate[i].subjectName,
                    examDate : respDate[i].examDate,
                    teacherName : teacherName,
                    managerList : respDate[i].managerList,
                    classId : respDate[i].classId,
                    paperId : respDate[i].paperId,
                    isSetTeacher : isSetTeacher,
                });

            }

            this.state.pagination.total = parseInt(res.data.total);

            this.setState({
                data:data
            })


        })
    }


    componentWillMount(){
        this.getPageDate();
    }


    //点击开始阅卷按钮
    beginScoring(i){
        this.state.curPaperInfo = this.state.data[i];
        this.setState({curPaperInfo : this.state.curPaperInfo});
        httpServer({
            url : URL.auto_read
        },{
            className : 'StuExamBatchImpl',
            classId : this.state.curPaperInfo.classId,
            paperId : this.state.curPaperInfo.paperId,
        })
        //this.props.history.push("/main/paper_manage/scoring/all_papers/reading_paper/"+this.state.curPaperInfo.paperId+"/"+this.state.curPaperInfo.classId+"/"+this.state.data[i].managerList[0].managerId);//react-router 4.0 写法

        this.props.history.push("/main/quiz_manage/quiz_content");
    }


    render(){
        const { getFieldDecorator } = this.props.form;

        let localeObj = {
            emptyText: '暂无数据'
        }

        const columns = [{
            title: 'Quiz Name',
            dataIndex: 'className',
            key: 'className',
        }, {
            title: 'Quiz Type',
            dataIndex: 'subjectName',
            key: 'subjectName',
        }, {
            title: 'Create Time',
            dataIndex: 'examDate',
            key: 'examDate',
        }, {
            title: 'Action',
            key: 'action1',
            render: (text, record) => (
                <span>
          {
                  <Button type="primary" size="small" onClick={this.beginScoring.bind(this,record.key)}>Review Quiz</Button>
          }
        </span>
            ),
        }];


        return(
            <div>
                <BreadcrumbCustom pathList={['Quiz Management',['Quiz List']]}></BreadcrumbCustom>
                <div className="scoring-paper-content">
                    <div className="m-b-20">
                    </div>
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        locale={localeObj}
                    />
                </div>
            </div>
        )
    }
}
// export default Form.create()(ScoringPaper)
export default withRouter(Form.create()(QuizList));
