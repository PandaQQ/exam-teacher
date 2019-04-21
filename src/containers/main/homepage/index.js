import React from 'react'
import { Card,Icon } from 'antd';
import { Link  } from 'react-router-dom';
import FastEnterCard from './subpage/fast_enter_card.js'


export default class Homepage extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }
  render(){
    return(
      <div  className="homepage clearfix">
        <div className="fast-enter-card">
          <Link to="/main/choose_questions">
            <FastEnterCard title="考试出卷" icon="profile"></FastEnterCard>
          </Link>
        </div>
        <div className="fast-enter-card">
          <Link to="/main/paper_manage/scoring">
            <FastEnterCard title="在线阅卷" icon="desktop"></FastEnterCard>
          </Link>
        </div>
          <div className="fast-enter-card">
              <Link to="/main/student_manage/query_student">
                  <FastEnterCard title="学生管理" icon="usergroup-add"></FastEnterCard>
              </Link>
          </div>
      </div>
    )
  }
}
