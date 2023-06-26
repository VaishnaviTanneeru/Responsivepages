import * as React from "react";
import Top from "./TopBar";
import { useEffect, useState } from "react";
import * as pnp from 'sp-pnp-js';
require('../Components/Dashboard.css')
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css')
import { Card, Row, Col, Container, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
export default function Dashboard() {
    const [result, setResult] = useState([])
    const navigate = useNavigate();
    const fetchdata = (CarName: string) => {
        let Array: any = []
        pnp.sp.web.lists.getByTitle("CarsInformation").items.select('*').getAll().then((arr: any[]) => {
            
            for (let i = 0; i < arr.length; i++) {
                console.log(arr[i].PlateNumber)
                                if (CarName === '' && arr[i].Rented === "Yes") {
                    Array.push({
                        Title: arr[i].Title,
                        CarName: arr[i].CarName,
                        PlatNumber: arr[i].PlateNumber,
                        Specification: arr[i].Specification,
                        year: arr[i].year0,
                        Rented: arr[i].Rented,
                        CarImage: JSON.parse(arr[i].CarImage).serverRelativeUrl,
                        String: "Booked",
                        Id:arr[i].ID
                    })
                } else if (CarName === arr[i].Title && arr[i].Rented === "Yes") {
                    Array.push({
                        Title: arr[i].Title,
                        CarName: arr[i].CarName,
                        PlatNumber: arr[i].PlateNumber,
                        Specification: arr[i].Specification,
                        year: arr[i].year0,
                        Rented: arr[i].Rented,
                        CarImage: JSON.parse(arr[i].CarImage).serverRelativeUrl,
                        String: "Booked",
                        Id:arr[i].ID
                    })
                }
               
                    if (CarName === '') {
                        Array.push({
                            Title: arr[i].Title,
                            CarName: arr[i].CarName,
                            PlatNumber: arr[i].PlateNumber,
                            Specification: arr[i].Specification,
                            year: arr[i].year0,
                            Rented: arr[i].Rented,
                            CarImage: JSON.parse(arr[i].CarImage).serverRelativeUrl,
                            String: "Available",
                            Id:arr[i].ID
                        })
                    }
                    else if (CarName === arr[i].Title) {
                        Array.push({
                            Title: arr[i].Title,
                            CarName: arr[i].CarName,
                            PlatNumber: arr[i].PlateNumber,
                            Specification: arr[i].Specification,
                            year: arr[i].year0,
                            Rented: arr[i].Rented,
                            CarImage: JSON.parse(arr[i].CarImage).serverRelativeUrl,
                            String: "Available",
                            Id:arr[i].ID
                        })
                    }
                
            }
            setResult(Array)
        }).catch(err => {
            console.log(err)
        })
    };
    useEffect(() => {
        fetchdata("")
    }, [])
    const Update = (data: any) => {
        navigate("/CustomerForm", { state: { data } })
        console.log("iiooo",data)
    }
    return (
        <div>
            <Top />
            <div style={{ display: 'flex' }}>
                <div className="BlueDiv">
                    <p className="Head">Book a car near you and <br />drive in minutes!</p>
                    <button className="BookNow">Book Now</button>
                    <img className="MainCar" src={require('../Images/MainCar.png')}></img>
                </div>
                <div className="SkyBlueDiv"></div>
            </div>
            <div className="CarIcons">
                <img className="RollsRoyce" onClick={() => fetchdata("Volkswagen")}
                    src={require('../Images/RollsRoyce.png')} />
                <img className="RollsRoyce" onClick={() => fetchdata("Mercedes")}
                    src={require('../Images/BZ.png')} />
                <img className="RollsRoyce" onClick={() => fetchdata("Audi")}
                    src={require('../Images/Suzuki.png')} />
                <img className="RollsRoyce" onClick={() => fetchdata("Mini Cooper")}
                    src={require('../Images/Honda.png')} />
                <img className="RollsRoyce"
                    src={require('../Images/Hyundai.png')} />
                <img className="RollsRoyce"
                    src={require('../Images/BMW.png')} />
                <img className="RollsRoyce"
                    src={require('../Images/Toyoyota.png')} />
                <img className="RollsRoyce"
                    src={require('../Images/Jaguar.png')} />
            </div>
            <div>
                <Container>
                    <Row>
                        {result.map((item, k) => (
                            <Col key={k} xs={12} md={4} lg={3} >
                                <Card className="Card1">
                                    {
                                        item.String === 'Booked' ?
                                            <Button className="TopBtn">{item.String}</Button>
                                            :
                                            <Button className="TopBtn1">{item.String}</Button>
                                    }
                                    <Card.Img src={item.CarImage} />
                                    <Card.Body>
                                        <div style={{ display: 'flex' }}>
                                            <Card.Text className="CardText">{item.Title}</Card.Text>
                                            <div className="line"></div>
                                            <Card.Text className="CardText1">{item.year}</Card.Text>

                                        </div>
                                        {
                                            item.String === 'Booked' ?
                                                <Button className="CardBtn2" disabled>Book Now</Button>

                                                :
                                                <Button className="CardBtn2" onClick={event => Update(item.Id)} >Book Now</Button>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    )

}