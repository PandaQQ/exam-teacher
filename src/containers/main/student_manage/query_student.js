import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'
import { Form } from 'antd';
import {Row,Col,Select,Input,Table, Icon, Divider,Button,Modal,message} from 'antd'
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const confirm = Modal.confirm;

import httpServer from '@components/httpServer.js';
import { connect } from 'react-redux'
import * as URL from '@components/interfaceURL.js'

class QueryStudent extends React.Component {
  constructor(){
    super()
    this.state = {
      selectedRowKeys : [], //选择的行
      data : [],
      pagination : {
        pageSize : 10,
        current : 1,
        total : 0,
        defaultCurrent : 1,
      },
      visibleChangeModal : false,//修改框是否显示
      curSelectClass : {//当前所选的学生
        key : 0,
        name : "",
        class : "",
        studentId : 1,
      },
      classInfo : [],//班级信息
    }
    this.searchKey = "1";//默认按照班级搜索  1班级 2科目  3状态
    this.turnStatus = "NORMAL"; //NORMAL:正常翻页   SEARCH:搜索翻页
    this.searchContent = ""; //搜索内容
  }

  //得到一页数据
  getPageDate(){
    httpServer({
      url : URL.get_student
    },{
      className : 'StudentServiceImpl',
      page : this.state.pagination.current,
      rows : this.state.pagination.pageSize,
      type : 1,
    })
    .then((res)=>{
      const data = [];
      for (let i = 0; i < res.data.data.length; i++) {

        data.push({
          key: i,
          name: res.data.data[i].name,
          Id: res.data.data[i].Id,
        });
      }

      this.state.pagination.total = res.data.total;

      this.setState({
        data:data,
        pagination : this.state.pagination
      })
    })
  }

  //得到搜索的数据
  getSearchData(){
    httpServer({
      url : URL.search_student
    },{
      className : 'StudentServiceImpl',
      content : this.searchContent,
      searchType : this.searchKey,
      page : this.state.pagination.current,
      rows : this.state.pagination.pageSize,
      type : 1
    })
    .then((res)=>{
      const data = [];
      for (let i = 0; i < res.data.data.length; i++) {
        let className = "";
        this.props.classinfo.classArr.some((item)=>{
          if(item.classId == res.data.data[i].classId) {
            className = item.className;
            return true;
          }
          return false;
        })

        data.push({
          key: i,
          name: res.data.data[i].name,
          class : className,
          classId : res.data.data[i].classId,
          studentId : res.data.data[i].stuId
        });
      }
      this.state.pagination.total = res.data.total;

      this.setState({
        data:data,
        pagination : this.state.pagination
      })

    })
  }

  //翻页
  handleTableChange(pagination, filters, sorter){
    const pager = this.state.pagination;
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({
      pagination: pager,
    });
    if(this.turnStatus === "NORMAL") {
      this.getPageDate();
    }
    else {
      this.getSearchData();
    }

  }


  componentWillMount(){
    this.getPageDate();
  }

  //删除班级
  deleteClass(record){
    this.setState({curSelectClass : record})
    confirm({
      title: '你确定删除吗？',
      okText : '确定',
      cancelText : '取消',
      onOk:()=>{
        httpServer({
          url : URL.delete_student
        },{
          className : 'StudentServiceImpl',
          type : 4,
          stuId : this.state.curSelectClass.studentId,
        })
        .then((res)=>{
          this.getPageDate();//重新获取第一页
        })
      },
    });

  }


  //搜索类型选择
  handleChange(value) {
    this.searchKey = value;
  }


  //选择某一行
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: 'ID',
      dataIndex: 'Id',
      key: 'Id',
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="danger" size="small" onClick={this.deleteClass.bind(this,record)}>DELETE</Button>
        </span>
      ),
    }];

    //行选择
    const rowSelection = {
      selectedRowKeys : this.state.selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
    };

    let localeObj = {
      emptyText: '暂无数据'
    }
    //表单布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 , offset : 4},
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };


    return(
      <div>
        <BreadcrumbCustom pathList={['Student Management','Student List']}></BreadcrumbCustom>
        <div className="class-manage-content">
          <div className="m-t-20">
            <Table
              columns={columns}
              dataSource={this.state.data}
              locale={localeObj}
              onChange={this.handleTableChange.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        classinfo: state.classinfo
    }
}

export default connect(
    mapStateToProps
)(Form.create()(QueryStudent))
