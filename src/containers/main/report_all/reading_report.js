import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'

import {Row,Col,Select,Input,Table, Icon, Divider,Button,Card,Tag,Modal} from 'antd'
const Option = Select.Option;
const Search = Input.Search;

import {withRouter} from "react-router-dom";

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'
import {Chart, Geom, Axis, Tooltip, Legend, Coord, Html, Guide, Line} from 'bizcharts';
import * as moment from "moment";

const json_data = '[{"time":1558166978627,"temperature":46,"type":"记录1"},{"time":1558166979628,"temperature":35,"type":"记录1"},{"time":1558166980626,"temperature":95,"type":"记录1"},{"time":1558166981627,"temperature":33,"type":"记录1"},{"time":1558166982626,"temperature":8,"type":"记录1"},{"time":1558166983627,"temperature":46,"type":"记录1"},{"time":1558166984628,"temperature":4,"type":"记录1"},{"time":1558166985628,"temperature":49,"type":"记录1"},{"time":1558166986626,"temperature":82,"type":"记录1"},{"time":1558166987626,"temperature":69,"type":"记录1"},{"time":1558166988626,"temperature":27,"type":"记录1"},{"time":1558166989626,"temperature":91,"type":"记录1"},{"time":1558166990628,"temperature":99,"type":"记录1"},{"time":1558166991628,"temperature":57,"type":"记录1"},{"time":1558166992628,"temperature":73,"type":"记录1"},{"time":1558166993627,"temperature":81,"type":"记录1"},{"time":1558166994628,"temperature":59,"type":"记录1"},{"time":1558166995628,"temperature":79,"type":"记录1"},{"time":1558166996627,"temperature":30,"type":"记录1"},{"time":1558166997628,"temperature":95,"type":"记录1"},{"time":1558166998628,"temperature":65,"type":"记录1"},{"time":1558166999628,"temperature":27,"type":"记录1"},{"time":1558167000628,"temperature":71,"type":"记录1"},{"time":1558167001628,"temperature":15,"type":"记录1"},{"time":1558167002628,"temperature":27,"type":"记录1"},{"time":1558167003628,"temperature":90,"type":"记录1"},{"time":1558167004628,"temperature":1,"type":"记录1"},{"time":1558167005628,"temperature":57,"type":"记录1"},{"time":1558167006628,"temperature":38,"type":"记录1"},{"time":1558167007628,"temperature":42,"type":"记录1"},{"time":1558167008628,"temperature":20,"type":"记录1"},{"time":1558167009628,"temperature":17,"type":"记录1"},{"time":1558167010628,"temperature":47,"type":"记录1"},{"time":1558167011628,"temperature":85,"type":"记录1"},{"time":1558167012628,"temperature":38,"type":"记录1"},{"time":1558167013628,"temperature":86,"type":"记录1"},{"time":1558167014628,"temperature":89,"type":"记录1"},{"time":1558167015628,"temperature":64,"type":"记录1"},{"time":1558167016628,"temperature":73,"type":"记录1"},{"time":1558167017628,"temperature":73,"type":"记录1"},{"time":1558167018628,"temperature":67,"type":"记录1"},{"time":1558167019628,"temperature":89,"type":"记录1"},{"time":1558167020628,"temperature":2,"type":"记录1"},{"time":1558167021628,"temperature":7,"type":"记录1"},{"time":1558167022626,"temperature":5,"type":"记录1"},{"time":1558167023626,"temperature":78,"type":"记录1"},{"time":1558167024629,"temperature":62,"type":"记录1"},{"time":1558167025628,"temperature":43,"type":"记录1"},{"time":1558167026628,"temperature":82,"type":"记录1"},{"time":1558167027628,"temperature":14,"type":"记录1"},{"time":1558167028628,"temperature":26,"type":"记录1"},{"time":1558167029628,"temperature":95,"type":"记录1"},{"time":1558167030628,"temperature":29,"type":"记录1"},{"time":1558167031626,"temperature":4,"type":"记录1"},{"time":1558167032628,"temperature":82,"type":"记录1"},{"time":1558167033628,"temperature":32,"type":"记录1"},{"time":1558167034629,"temperature":46,"type":"记录1"},{"time":1558167035629,"temperature":0,"type":"记录1"},{"time":1558167036628,"temperature":9,"type":"记录1"},{"time":1558167037628,"temperature":75,"type":"记录1"},{"time":1558167038629,"temperature":62,"type":"记录1"},{"time":1558167039628,"temperature":68,"type":"记录1"},{"time":1558167040629,"temperature":20,"type":"记录1"},{"time":1558167041629,"temperature":79,"type":"记录1"},{"time":1558167042629,"temperature":47,"type":"记录1"},{"time":1558167043629,"temperature":77,"type":"记录1"},{"time":1558167044629,"temperature":9,"type":"记录1"},{"time":1558167045629,"temperature":68,"type":"记录1"},{"time":1558167046629,"temperature":12,"type":"记录1"},{"time":1558167047629,"temperature":93,"type":"记录1"},{"time":1558167048629,"temperature":62,"type":"记录1"},{"time":1558167049629,"temperature":20,"type":"记录1"},{"time":1558167050629,"temperature":81,"type":"记录1"},{"time":1558167051627,"temperature":97,"type":"记录1"},{"time":1558167052629,"temperature":6,"type":"记录1"},{"time":1558167053629,"temperature":42,"type":"记录1"},{"time":1558167054629,"temperature":17,"type":"记录1"},{"time":1558167055629,"temperature":58,"type":"记录1"},{"time":1558167056629,"temperature":3,"type":"记录1"},{"time":1558167057628,"temperature":69,"type":"记录1"},{"time":1558167058629,"temperature":72,"type":"记录1"},{"time":1558167059629,"temperature":79,"type":"记录1"},{"time":1558167060629,"temperature":75,"type":"记录1"},{"time":1558167061629,"temperature":12,"type":"记录1"},{"time":1558167062629,"temperature":74,"type":"记录1"},{"time":1558167063628,"temperature":83,"type":"记录1"},{"time":1558167064628,"temperature":55,"type":"记录1"},{"time":1558167065628,"temperature":0,"type":"记录1"},{"time":1558167066628,"temperature":33,"type":"记录1"},{"time":1558167067627,"temperature":57,"type":"记录1"},{"time":1558167068627,"temperature":13,"type":"记录1"},{"time":1558167069626,"temperature":47,"type":"记录1"},{"time":1558167070627,"temperature":39,"type":"记录1"},{"time":1558167071629,"temperature":24,"type":"记录1"},{"time":1558167072629,"temperature":16,"type":"记录1"},{"time":1558167073629,"temperature":19,"type":"记录1"},{"time":1558167074629,"temperature":75,"type":"记录1"},{"time":1558167075629,"temperature":76,"type":"记录1"},{"time":1558167076629,"temperature":58,"type":"记录1"},{"time":1558167077629,"temperature":91,"type":"记录1"},{"time":1558167078629,"temperature":39,"type":"记录1"},{"time":1558167079629,"temperature":41,"type":"记录1"},{"time":1558167080626,"temperature":28,"type":"记录1"},{"time":1558167081629,"temperature":36,"type":"记录1"},{"time":1558167082629,"temperature":65,"type":"记录1"},{"time":1558167083629,"temperature":4,"type":"记录1"},{"time":1558167084629,"temperature":95,"type":"记录1"},{"time":1558167085629,"temperature":61,"type":"记录1"},{"time":1558167086629,"temperature":8,"type":"记录1"},{"time":1558167087630,"temperature":4,"type":"记录1"},{"time":1558167088629,"temperature":7,"type":"记录1"},{"time":1558167089629,"temperature":32,"type":"记录1"},{"time":1558167090629,"temperature":50,"type":"记录1"},{"time":1558167091629,"temperature":15,"type":"记录1"},{"time":1558167092628,"temperature":71,"type":"记录1"},{"time":1558167093629,"temperature":70,"type":"记录1"},{"time":1558167094629,"temperature":62,"type":"记录1"},{"time":1558167095629,"temperature":29,"type":"记录1"},{"time":1558167096629,"temperature":66,"type":"记录1"},{"time":1558167097629,"temperature":93,"type":"记录1"},{"time":1558167098629,"temperature":23,"type":"记录1"},{"time":1558167099629,"temperature":30,"type":"记录1"},{"time":1558167100629,"temperature":29,"type":"记录1"},{"time":1558167101629,"temperature":43,"type":"记录1"},{"time":1558167102629,"temperature":45,"type":"记录1"},{"time":1558167103629,"temperature":6,"type":"记录1"},{"time":1558167104629,"temperature":92,"type":"记录1"},{"time":1558167105629,"temperature":49,"type":"记录1"},{"time":1558167106629,"temperature":54,"type":"记录1"},{"time":1558167107629,"temperature":8,"type":"记录1"},{"time":1558167108629,"temperature":34,"type":"记录1"},{"time":1558167109629,"temperature":57,"type":"记录1"},{"time":1558167110629,"temperature":16,"type":"记录1"},{"time":1558167111629,"temperature":28,"type":"记录1"},{"time":1558167112629,"temperature":12,"type":"记录1"},{"time":1558167113629,"temperature":90,"type":"记录1"},{"time":1558167114629,"temperature":42,"type":"记录1"},{"time":1558167115628,"temperature":86,"type":"记录1"},{"time":1558167116629,"temperature":69,"type":"记录1"},{"time":1558167117629,"temperature":57,"type":"记录1"},{"time":1558167118629,"temperature":97,"type":"记录1"},{"time":1558167119629,"temperature":34,"type":"记录1"},{"time":1558167120629,"temperature":30,"type":"记录1"},{"time":1558167121629,"temperature":96,"type":"记录1"},{"time":1558167122629,"temperature":1,"type":"记录1"},{"time":1558167123629,"temperature":73,"type":"记录1"},{"time":1558167124629,"temperature":27,"type":"记录1"},{"time":1558167125629,"temperature":16,"type":"记录1"},{"time":1558167126629,"temperature":45,"type":"记录1"},{"time":1558167127629,"temperature":7,"type":"记录1"},{"time":1558167128629,"temperature":12,"type":"记录1"},{"time":1558167129629,"temperature":73,"type":"记录1"},{"time":1558167130629,"temperature":19,"type":"记录1"},{"time":1558167131629,"temperature":37,"type":"记录1"},{"time":1558167132626,"temperature":17,"type":"记录1"},{"time":1558167133629,"temperature":18,"type":"记录1"},{"time":1558167134629,"temperature":97,"type":"记录1"},{"time":1558167135629,"temperature":49,"type":"记录1"},{"time":1558167136629,"temperature":12,"type":"记录1"},{"time":1558167137629,"temperature":59,"type":"记录1"},{"time":1558167138629,"temperature":85,"type":"记录1"},{"time":1558167139629,"temperature":96,"type":"记录1"},{"time":1558167140629,"temperature":93,"type":"记录1"},{"time":1558167141629,"temperature":51,"type":"记录1"},{"time":1558167142629,"temperature":7,"type":"记录1"},{"time":1558167143629,"temperature":80,"type":"记录1"},{"time":1558167144629,"temperature":62,"type":"记录1"},{"time":1558167145630,"temperature":77,"type":"记录1"},{"time":1558167146629,"temperature":63,"type":"记录1"},{"time":1558167147629,"temperature":96,"type":"记录1"},{"time":1558167148629,"temperature":50,"type":"记录1"},{"time":1558167149629,"temperature":6,"type":"记录1"},{"time":1558167150629,"temperature":69,"type":"记录1"},{"time":1558167151628,"temperature":2,"type":"记录1"},{"time":1558167152628,"temperature":11,"type":"记录1"},{"time":1558167153628,"temperature":29,"type":"记录1"},{"time":1558167154628,"temperature":57,"type":"记录1"},{"time":1558167155629,"temperature":4,"type":"记录1"},{"time":1558167156628,"temperature":39,"type":"记录1"},{"time":1558167157628,"temperature":78,"type":"记录1"},{"time":1558167158627,"temperature":73,"type":"记录1"},{"time":1558167159628,"temperature":19,"type":"记录1"},{"time":1558167160629,"temperature":64,"type":"记录1"},{"time":1558167161629,"temperature":54,"type":"记录1"},{"time":1558167162628,"temperature":91,"type":"记录1"},{"time":1558167163628,"temperature":37,"type":"记录1"},{"time":1558167164628,"temperature":98,"type":"记录1"},{"time":1558167165628,"temperature":34,"type":"记录1"},{"time":1558167166629,"temperature":68,"type":"记录1"},{"time":1558167167628,"temperature":96,"type":"记录1"},{"time":1558167168629,"temperature":28,"type":"记录1"},{"time":1558167169628,"temperature":8,"type":"记录1"},{"time":1558167170629,"temperature":8,"type":"记录1"},{"time":1558167171628,"temperature":82,"type":"记录1"},{"time":1558167172630,"temperature":66,"type":"记录1"},{"time":1558167173629,"temperature":72,"type":"记录1"},{"time":1558167174629,"temperature":95,"type":"记录1"},{"time":1558167175629,"temperature":10,"type":"记录1"},{"time":1558167176628,"temperature":32,"type":"记录1"},{"time":1558167177629,"temperature":52,"type":"记录1"},{"time":1558167178628,"temperature":40,"type":"记录1"},{"time":1558167179629,"temperature":59,"type":"记录1"},{"time":1558167180630,"temperature":20,"type":"记录1"},{"time":1558167181628,"temperature":23,"type":"记录1"},{"time":1558167182629,"temperature":15,"type":"记录1"},{"time":1558167183628,"temperature":82,"type":"记录1"},{"time":1558167184628,"temperature":24,"type":"记录1"},{"time":1558167185629,"temperature":95,"type":"记录1"},{"time":1558167186629,"temperature":86,"type":"记录1"},{"time":1558167187629,"temperature":76,"type":"记录1"},{"time":1558167188628,"temperature":88,"type":"记录1"},{"time":1558167189628,"temperature":19,"type":"记录1"},{"time":1558167190628,"temperature":62,"type":"记录1"},{"time":1558167191629,"temperature":40,"type":"记录1"},{"time":1558167192629,"temperature":29,"type":"记录1"},{"time":1558167193629,"temperature":69,"type":"记录1"},{"time":1558167194629,"temperature":97,"type":"记录1"},{"time":1558167195628,"temperature":50,"type":"记录1"},{"time":1558167196627,"temperature":37,"type":"记录1"},{"time":1558167197628,"temperature":58,"type":"记录1"},{"time":1558167198628,"temperature":47,"type":"记录1"},{"time":1558167199628,"temperature":32,"type":"记录1"},{"time":1558167200628,"temperature":32,"type":"记录1"},{"time":1558167201628,"temperature":21,"type":"记录1"},{"time":1558167202628,"temperature":94,"type":"记录1"},{"time":1558167203629,"temperature":42,"type":"记录1"},{"time":1558167204628,"temperature":47,"type":"记录1"},{"time":1558167205629,"temperature":99,"type":"记录1"},{"time":1558167206629,"temperature":80,"type":"记录1"},{"time":1558167207629,"temperature":43,"type":"记录1"},{"time":1558167208628,"temperature":88,"type":"记录1"},{"time":1558167209628,"temperature":50,"type":"记录1"},{"time":1558167210629,"temperature":41,"type":"记录1"},{"time":1558167211628,"temperature":81,"type":"记录1"},{"time":1558167212630,"temperature":9,"type":"记录1"},{"time":1558167213628,"temperature":69,"type":"记录1"},{"time":1558167214628,"temperature":57,"type":"记录1"},{"time":1558167215629,"temperature":62,"type":"记录1"},{"time":1558167216629,"temperature":76,"type":"记录1"},{"time":1558167217628,"temperature":10,"type":"记录1"},{"time":1558167218628,"temperature":21,"type":"记录1"},{"time":1558167219628,"temperature":15,"type":"记录1"},{"time":1558167220628,"temperature":32,"type":"记录1"},{"time":1558167221628,"temperature":76,"type":"记录1"},{"time":1558167222629,"temperature":88,"type":"记录1"},{"time":1558167223628,"temperature":68,"type":"记录1"},{"time":1558167224628,"temperature":24,"type":"记录1"},{"time":1558167225629,"temperature":18,"type":"记录1"},{"time":1558167226629,"temperature":81,"type":"记录1"},{"time":1558167227627,"temperature":94,"type":"记录1"},{"time":1558167228627,"temperature":29,"type":"记录1"},{"time":1558167229629,"temperature":91,"type":"记录1"},{"time":1558167230627,"temperature":49,"type":"记录1"},{"time":1558167231628,"temperature":90,"type":"记录1"},{"time":1558167232628,"temperature":66,"type":"记录1"},{"time":1558167233629,"temperature":30,"type":"记录1"},{"time":1558167234629,"temperature":97,"type":"记录1"},{"time":1558167235628,"temperature":82,"type":"记录1"},{"time":1558167236628,"temperature":3,"type":"记录1"},{"time":1558167237628,"temperature":92,"type":"记录1"},{"time":1558167238628,"temperature":7,"type":"记录1"},{"time":1558167239627,"temperature":46,"type":"记录1"},{"time":1558167240627,"temperature":12,"type":"记录1"},{"time":1558167241627,"temperature":72,"type":"记录1"},{"time":1558167242628,"temperature":92,"type":"记录1"},{"time":1558167243627,"temperature":62,"type":"记录1"},{"time":1558167244628,"temperature":41,"type":"记录1"},{"time":1558167245628,"temperature":88,"type":"记录1"},{"time":1558167246628,"temperature":99,"type":"记录1"},{"time":1558167247628,"temperature":9,"type":"记录1"},{"time":1558167248628,"temperature":47,"type":"记录1"},{"time":1558167249627,"temperature":47,"type":"记录1"},{"time":1558167250628,"temperature":56,"type":"记录1"},{"time":1558167251628,"temperature":62,"type":"记录1"},{"time":1558167252628,"temperature":69,"type":"记录1"},{"time":1558167253628,"temperature":35,"type":"记录1"},{"time":1558167254628,"temperature":10,"type":"记录1"},{"time":1558167255628,"temperature":64,"type":"记录1"},{"time":1558167256628,"temperature":65,"type":"记录1"},{"time":1558167257628,"temperature":48,"type":"记录1"},{"time":1558167258628,"temperature":5,"type":"记录1"},{"time":1558167259627,"temperature":48,"type":"记录1"},{"time":1558167260627,"temperature":96,"type":"记录1"},{"time":1558167261627,"temperature":96,"type":"记录1"},{"time":1558167262628,"temperature":84,"type":"记录1"},{"time":1558167263628,"temperature":81,"type":"记录1"},{"time":1558167264628,"temperature":67,"type":"记录1"},{"time":1558167265628,"temperature":82,"type":"记录1"},{"time":1558167266627,"temperature":59,"type":"记录1"},{"time":1558167267629,"temperature":14,"type":"记录1"},{"time":1558167268628,"temperature":17,"type":"记录1"},{"time":1558167269628,"temperature":37,"type":"记录1"},{"time":1558167270628,"temperature":50,"type":"记录1"},{"time":1558167271628,"temperature":15,"type":"记录1"},{"time":1558167272627,"temperature":98,"type":"记录1"},{"time":1558167273628,"temperature":58,"type":"记录1"},{"time":1558167274628,"temperature":80,"type":"记录1"},{"time":1558167275627,"temperature":50,"type":"记录1"},{"time":1558167276628,"temperature":87,"type":"记录1"},{"time":1558167277628,"temperature":49,"type":"记录1"}]';
let chart;
let data = [];
const scale = {
    time: {
        alias: "Time",
        type: "time",
        mask: "MM:ss",
        nice: false
    },
    temperature: {
        alias: "Meditation",
        min: 1,
        tickCount: 10,
        ticks: [0,10,20,30,40,50,60,70,80,90,100],
        max: 100
    },
    type: {
        type: "cat"
    }
};


// tip_read = https://img.alicdn.com/tfs/TB1fO8Abv6H8KJjy0FjXXaXepXa-180-102.png
// tip_green = https://img.alicdn.com/tfs/TB1MZlwbBfH8KJjy1XbXXbLdXXa-180-102.png
const renderTip = (d = {}) => `<div class="error2-tip" >` +
    `<img src='https://img.alicdn.com/tfs/TB1MZlwbBfH8KJjy1XbXXbLdXXa-180-102.png' />` +
    `<div class='title'>Student Choice ${d.choice} in Q${d.question}</div>` +
    `<div class='text'>${d.right}</div>` +
    '</div>';


class ReadingReport extends React.Component {

    constructor(){
        super()
        this.state = {
            fillInList : [],
            shortAnswerList : [],
            programList : [],
            data: []
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


    componentWillMount(){
        // this.getStuAnswer(this.props.match.params.instId);

        // setInterval(() => {
        //     let now = new Date();
        //     let time = now.getTime();
        //     let temperature1 = ~~(Math.random() * 100) ;
        //
        //     if (data.length >= 300) {
        //         // data.shift();
        //         // data.shift();
        //         console.log('SHOW DATA');
        //         console.log(data);
        //         let json =  JSON.stringify(data);
        //         console.log('SHOW DATA');
        //         console.log(json);
        //     }
        //
        //     data.push({
        //         time: time,
        //         temperature: temperature1,
        //         type: "记录1"
        //     });
        //
        //     this.setState({
        //         data
        //     });
        // }, 1000);


        data = JSON.parse(json_data);
        console.log(data);
        this.setState({
            data
        });
    }

    render(){
        let cards = [];
        let cards_data = [
            { start_time: 1558166984628, end_time: 1558166984628, question: 1, choice_option: 'A'},
            { start_time: 1558166984628, end_time: 1558166984628, question: 2, choice_option: 'A'},
            { start_time: 1558166984628, end_time: 1558166984628, question: 3, choice_option: 'A'},
            { start_time: 1558166984628, end_time: 1558166984628, question: 4, choice_option: 'A'},
            { start_time: 1558166984628, end_time: 1558166984628, question: 4, choice_option: 'A'},
            { start_time: 1558166984628, end_time: 1558166984628, question: 5, choice_option: 'A'},
        ];
        for (let i = 0; i < cards_data.length; i++) {
            let object = cards_data[i];
            cards.push(
                (<div className="com-warning-box">
                        <div className="right">
                            <div className="title">
                                <span className="time">Activity {i+1}</span></div>
                            <ul className="message">
                                <li>
                                    <div className="name">START TIME：</div>
                                    <span className="value">{moment.unix(object.start_time).format("HH:ss")}</span>
                                </li>
                                <li>
                                    <span className="name">END TIME：</span>
                                    <span className="value">{moment.unix(object.end_time).format("HH:ss")}</span>
                                </li>
                                <li>
                                    <span className="name">Question: </span>
                                    <span className="value">{object.question}</span>
                                </li>
                                <li>
                                    <span className="name">STUDENT CHOICE OPTION: </span>
                                    <span className="value">{object.choice_option}</span>
                                </li>
                            </ul>
                        </div>
                </div>)
            )
        }

        let guides = [];
        let guides_data = [
            {position: { time: 1558166984628,  temperature:4 }, tip:{question: '1', choice:'A', right: 'RIGHT'}},
            {position: { time: 1558167112629,  temperature:12 }, tip:{question: '2', choice:'A', right: 'RIGHT'}},
            {position: { time: 1558167171628,  temperature:82 }, tip:{question: '3', choice:'B', right: 'WRONG'}},
            {position: { time: 1558167224628,  temperature:24 }, tip:{question: '4', choice:'C', right: 'WRONG'}},
        ];

        for (let i = 0; i < guides_data.length; i++) {
            let object = guides_data[i];
            guides.push(
                <Guide.Html
                    key={object.time+'1'}
                    type="html"
                    zIndex={9999}
                    position={object.position}
                    html={renderTip(object.tip)}
                    alignX="middle"
                    alignY="bottom"
                />,
                <Guide.Line
                    key={object.time+'2'}
                    zIndex={9999}
                    start={{ time: object.position.time, temperature: 0 }}
                    end={object.position}
                    lineStyle={{
                        stroke: '#38E998',
                        lineWidth: 2,
                        lineDash: [1000, 0, 0],
                    }}/>
            );
        }

        console.log(data.length)
        let chart;
        chart = (<Chart scale={scale}
                        data={data}
                        forceFit
                        onGetG2Instance={g2Chart => {
                            chart = g2Chart;
                        }}>



            <Axis name="x" visible={false} />
            <Tooltip />
            <Axis
                name="value"
                grid={{
                    lineStyle: {
                        stroke: 'rgba(255,255,255,.2)',
                    },
                }}
                label={{
                    textStyle: {
                        fontSize: 22,
                        fontWeight: 200,
                        fill: 'rgba(255,255,255,1)',
                    },
                }}
                line={{
                    stroke: 'rgba(255,255,255,.2)',
                    lineWidth: 1,
                }}
            />

            {/*<Geom type="area"*/}
                  {/*shape="smooth"*/}
                  {/*position="time*temperature"/>*/}
            <Geom
                type="line"
                position="time*temperature"
                shape="smooth"
                size={1}
            />
            <Guide>
                {guides}
            </Guide>
        </Chart>);
        return(
            <div>
                <BreadcrumbCustom pathList={['All Report', 'Reading Report']}></BreadcrumbCustom>
                <div className="reading-paper-content">
                    <div className="paper">
                        <div className="chart-wrapper">
                            <div className="chart-canvas">
                                {chart}
                            </div>
                            {/* hack Axis */}
                            <div className="axis">
                                <div className="line" />
                            </div>
                        </div>
                        <div className="warnings">
                            {cards}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ReadingReport);
