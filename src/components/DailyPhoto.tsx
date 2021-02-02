import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {PageHeader} from '@workday/canvas-kit-react-page-header';
import {IconButton} from '@workday/canvas-kit-react-button';
import {exportIcon, fullscreenIcon} from '@workday/canvas-system-icons-web';
import {H2} from '@workday/canvas-kit-react-core';
import Card from '@workday/canvas-kit-react-card';
import {LoadingDots} from '@workday/canvas-kit-react-loading-animation';
import '../index.scss';
import './DailyPhoto.scss';

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
    mediaType: string;
    url: string;
    today: Date;
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
            copyright: "",
            mediaType: "",
            url: "",
            today: new Date()
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
                        copyright: data.copyright,
                        mediaType: data.media_type,
                        url: data.url
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
        // TODO: Add state to include media type to allow video
        if(this.state.imageLoaded && this.state.mediaType === "image"){
            return(
                <div id="APOD">
                    <PageHeader title="Astonomy Photo of the Day">
                        <IconButton icon={exportIcon} aria-label="export"/>
                        <IconButton icon={fullscreenIcon} aria-label="fullscreen"/>
                    </PageHeader>
                    <H2>{this.state.title}</H2>
                    <div id="holder-div">
                        <div className="wdc-type" id="left-div">
                            <img src={this.state.imageUrl} alt="" style={{borderRadius: "4px"}} id="DailyPhoto"/>
                        </div>
                        <div id="right-div">
                            <Card heading="Description:">
                                {this.state.explanation}
                            </Card>
                            <Card heading="Photo Selector" id="photo-selector">
                                <span className="wdc-type-variant-label">Choose a date: </span>
                                <DatePicker 
                                    selected={this.state.photoDate} 
                                    onChange={this.handleDateChange}
                                    maxDate={this.state.today}/>
                            </Card>
                        </div>
                    </div>
                </div>
            )
        }else if(this.state.imageLoaded && this.state.mediaType === "video"){
            return(
                <div id="APOD">
                    <PageHeader title="Astonomy Photo of the Day">
                        <IconButton icon={exportIcon} aria-label="export"/>
                        <IconButton icon={fullscreenIcon} aria-label="fullscreen"/>
                    </PageHeader>
                    <H2>{this.state.title}</H2>
                    <div id="holder-div">
                        <div className="wdc-type" id="left-div">
                            <iframe
                                src={this.state.url}
                                frameBorder="0"
                                allow="autoplay; encryptedMedia"
                                allowFullScreen
                                title="video"
                                width="100%"
                                height="80%"
                            />
                        </div>
                        <div id="right-div">
                            <Card heading="Description:">
                                {this.state.explanation}
                            </Card>
                            <Card heading="Photo Selector" id="photo-selector">
                                <span className="wdc-type-variant-label">Choose a date: </span>
                                <DatePicker selected={this.state.photoDate} onChange={this.handleDateChange}/>
                            </Card>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(<LoadingDots id="loading-dots"/>)
        }
    }
}