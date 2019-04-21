import React from 'react'

import { Form,Input,Select,Row,Col,Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import BreadcrumbCustom from '@components/BreadcrumbCustom'
import { connect } from 'react-redux'
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class AddStudent extends React.Component {
  constructor(){
    super()
    this.state = {
      pathList : ['Tester Management','Add Tester'],//面包屑路径
    }
  }

  //选择班级
  handleChange(value) {
    // console.log(`selected ${value}`);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        httpServer({
          url : URL.add_student
        },{
          className : 'StudentServiceImpl',
          type : 2,
          classId : values.class,
          name : values.name
        })
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
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
        <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
        <div className="add-student-content">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
              {...formItemLayout}
              label="NAME"
            >
              {getFieldDecorator('name',{
                rules: [{ required: true, message: 'PLEASE INPUT YOUR NAME！' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="PASSWORD"
              key = "pwd"
            >
              {getFieldDecorator('class',{
                rules: [{ required: true, message: 'PLEASE INPUT YOUR PASSWORD！' }],
              })(
                  <Input.Password />
              )}
            </FormItem>
            <Row>
              <Col span={12} offset={4}>
                <Button type="primary" htmlType="submit" className="f-r">ADD</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(
    mapStateToProps
)(Form.create()(AddStudent))
