import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {H1, H2} from '@workday/canvas-kit-react-core';
import '../index.scss';

interface DailyPhotoProps{
}

interface DailyPhotoState {
    photoDate: Date;
    photoDateStr: string;
    imageUrl: string;
    imageLoaded: boolean;
    imageUrlHD: string;
    explanation: string;
    title: string;
    copyright: string;
}

export class DailyPhoto extends React.Component<DailyPhotoProps, DailyPhotoState>{
    constructor(props: DailyPhotoProps){
        super(props);

        let dateSTR = new Date().toISOString();
        let dateISO = new Date(dateSTR);
        let year = dateISO.getFullYear().toString();
        let month = dateISO.getMonth()+1;
        let day = dateISO.getDate();
        let daySTR : string;
        let monthSTR : string;

        if(day < 10){
            daySTR = '0' + day.toString();
        } else{
            daySTR = day.toString();
        }

        if(month < 10){
            monthSTR = '0' + month.toString();
        } else{
            monthSTR = month.toString();
        }

        let dateFormatted = year + '-' + monthSTR + '-' + daySTR;

        this.state = {
            photoDateStr: dateFormatted,
            photoDate: new Date(),
            imageUrl: "",
            imageLoaded: false,
            imageUrlHD: "",
            explanation: "",
            title: "",
            copyright: ""
        }

        this.handleDateChange = this.handleDateChange.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.getPhotoData = this.getPhotoData.bind(this);
    }

    formatDate(date: Date): string{
        let dateSTR = date.toISOString();
        let dateISO = new Date(dateSTR);
        let year = dateISO.getFullYear().toString();
        let month = dateISO.getMonth()+1;
        let day = dateISO.getDate();
        let daySTR : string;
        let monthSTR : string;

        if(day < 10){
            daySTR = '0' + day.toString();
        } else{
            daySTR = day.toString();
        }

        if(month < 10){
            monthSTR = '0' + month.toString();
        } else{
            monthSTR = month.toString();
        }

        let dateFormatted = year + '-' + monthSTR + '-' + daySTR;

        return dateFormatted;
    }
    handleDateChange(date: Date): void{
        let newDate = this.formatDate(date);
        this.setState({photoDateStr: newDate, photoDate: date, imageLoaded: false});
    }
    getPhotoData(): void{
        fetch(`https://api.nasa.gov/planetary/apod?api_key=3PGxClEyXs24MUInO9qjycVwc9zgpcIziArKd7le&date=${this.state.photoDateStr}`)
            .then(resp => {
                resp.json().then((data) => {
                    this.setState({
                        imageUrl: data.url, 
                        imageLoaded: true,
                        imageUrlHD: data.hdurl,
                        explanation: data.explanation,
                        title: data.title,
                        copyright: data.copyright
                    });
                    // console.log(data);
                })
            })
            .catch(err => {
                console.error(err);
                console.log(err)
            })
    }
    componentDidMount(){
        this.getPhotoData();
    }
    componentDidUpdate(){
        if(!this.state.imageLoaded){
            this.getPhotoData();
        }
    }

    render(): React.ReactNode{
        if(this.state.imageLoaded){
            return(
                <React.Fragment>
                    <H1 >NASA Daily Photo</H1>
                    <div className="wdc-type">
                        <H2>{this.state.title}</H2>
                        <img src={this.state.imageUrl} alt="" style={{borderRadius: "4px"}}/>
                        <p className="wdc-type-body wdc-spacing-xl">{this.state.explanation}</p>
                    </div>
                    <div className="wdc-type">
                        <span className="wdc-type-variant-label">Choose a date: </span>
                        <DatePicker selected={this.state.photoDate} onChange={this.handleDateChange}/>
                    </div>
                </React.Fragment>
            )
        }else{
            return(<h1>Loading Image...</h1>)
        }
    }
}