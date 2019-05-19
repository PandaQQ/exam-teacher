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
              <Link to="/main/report_all">
                  <FastEnterCard title="All Report" icon="search"></FastEnterCard>
              </Link>
          </div>

        <div className="fast-enter-card">
          <Link to="/main/quiz_manage/quiz_list">
            <FastEnterCard title="Quiz" icon="desktop"></FastEnterCard>
          </Link>
        </div>

          <div className="fast-enter-card">
              <Link to="/main/student_manage/query_student">
                  <FastEnterCard title="Student" icon="usergroup-add"></FastEnterCard>
              </Link>
          </div>
      </div>
    )
  }
}
