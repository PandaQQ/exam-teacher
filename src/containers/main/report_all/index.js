import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'
import {Row,Col,Select,Input,Table, Icon, Divider,Button} from 'antd'
const Option = Select.Option;
const Search = Input.Search;

import {Link} from 'react-router-dom'
import {withRouter} from "react-router-dom";
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class AllReport extends React.Component {
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
        }
    }

    //得到所有试卷
    getAllPapers(paperId,classId,managerId){
        httpServer({
            url : URL.get_all_papers
        },{
            className : 'QueryExamServiceImpl',
            page : this.state.pagination.current,
            rows : this.state.pagination.pageSize,
            type : 2,
            paperId : paperId,
            classId : classId,
            managerId : managerId,
        })
        .then((res)=>{
            const data = [];
            for (let i = 0; i < res.data.data.length; i++) {
                data.push({
                    key: i,
                    name: res.data.data[i].name,
                    Id : res.data.data[i].Id,
                    report_id : res.data.data[i].report_id,
                    totalscore : res.data.data[i].totalscore,
                });
            }

            this.setState({
                data:data
            })

        })
        .catch((err)=>{
            this.props.history.push('/main/paper_manage/scoring');
        })

    }

    //点击开始阅卷
    beginReading(){

    }

    componentWillMount(){
        this.getAllPapers(this.props.match.params.paperId,this.props.match.params.classId,this.props.match.params.managerId);
    }
    componentDidmount(){
    }

    componentWillReceiveProps(nextProps){
    }

    //阅卷老师选择
    handleChange(value) {
        console.log(`selected ${value}`);
    }



    render(){
        const columns = [{
            title: 'Report ID',
            dataIndex: 'report_id',
            key: 'report_id',
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'ID',
            dataIndex: 'Id',
            key: 'Id',
        },{
            title: 'Score',
            dataIndex: 'totalscore',
            key: 'totalscore',
        },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
          {
              <Button type="primary" size="small" onClick={this.beginReading.bind(this)}>
                  <Link
                      to={`/main/paper_manage/scoring/all_papers/reading_paper/${this.props.match.params.paperId}/${this.props.match.params.classId}/${this.state.data[record.key].instId}`}
                  >View Report</Link>
              </Button>
          }
        </span>
            ),
        }];

        let localeObj = {
            emptyText: '暂无数据'
        }

        return(
            <div>
                <BreadcrumbCustom pathList={['All Report']}></BreadcrumbCustom>
                <div className="scoring-paper-content">
                    <Table
                        // rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.data}
                        locale={localeObj}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(AllReport);
