import * as React from "react";
require("./Newww.module.scss");
import * as pnp from "sp-pnp-js";
import { Icon } from '@fluentui/react/lib/Icon';
import { Alert24Filled } from '@fluentui/react-icons';
require("./Top.css")
import { Link } from "react-router-dom";
import { INewwwProps } from "./INewwwProps";
// import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';  

export default class Top extends React.Component<any, any>{
    constructor(props: INewwwProps) {
        super(props);
        this.state = {
            Name: '',
            userId: 0,
            EmailId: '',
            curDT: new Date().toLocaleString(),
            skyimage: '',
            location: '',
            weatherid: '',
            temperature: '',
            windspeed: '',
            humidity: '',
        }
        // this.getWeather=this.getWeather.bind(this)
    }

    async componentDidMount(): Promise<any> {
        debugger;
        await pnp.sp.web.currentUser.get().then(user => {
            console.log("Current user name: " + user.Title);
            this.setState({
                Name: user.Title,
                EmailId: user.Email,
                userId: user.Id
            })
        });
        await this.getWeather();
    }
    private async getWeather() {
        debugger;
        //   console.log(this.props.description)
        const info = await fetch('https://ipinfo.io/json')
        const locinfo = await info.json();
        console.log(locinfo)
        // console.log(locinfo.Celsius.toString())
        this.setState({ location: locinfo.city })
        let locString = locinfo.loc.split(',');
        let latitude = parseFloat(locString[0]);
        let longitude = parseFloat(locString[1]);
        const weather = await fetch('https://cors.5apps.com/?uri=http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&APPID=c3e00c8860695fd6096fe32896042eda')
        const weatherinfo = await weather.json();
        console.log(weatherinfo)
        // //   let windSpeedkmh = Math.round(weatherinfo.wind.speed * 3.6);
        // //   let Celsius = Math.round(weatherinfo.main.temp)
        //   let iconId = weatherinfo.weather[0].icon;
        //   let weatherURL = "http://openweathermap.org/img/w/" + iconId + ".png";
        //   console.log(weatherURL)
        //   this.setState({
        //     skyimage: weatherURL,
        //     location: locinfo.city + ', ' + locinfo.region + ', ' + locinfo.country,
        //     weatherid: weatherinfo.weather[0].description,
        //     // temperature: Celsius.toString(),
        //     // windspeed: windSpeedkmh + ' km/hr',
        //     humidity: weatherinfo.main.humidity
        //   })
        const url = 'https://api.openweathermap.org/data/2.5/weather?appid={openweathermap_apikey}&q=chicago';

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            },
        });

        const text = await response.text();
        console.log(text)
    }


    render() {
        return (
            <div>
                <div className="Topbar">
                    <Link to={"/"}><Icon className="Homeicon" iconName="Home" /></Link>
                    <p className="Tt"> {this.state.curDT}</p>
                    <p className="pp">WelCome  User</p>
                    <img src={`https://cloudangles.sharepoint.com/sites/Training/_layouts/15/userphoto.aspx?size=L&accountname=${this.state.EmailId}`} alt="imageOfuser logo" className="ulogo" />
                    <p className="User">{this.state.Name}</p>
                    <div className="Icon">
                        <Alert24Filled />
                    </div>
                    <div className="Loc">
                        <p>{this.state.location}</p>
                    </div>
                </div>
            </div>


        )
    }
}