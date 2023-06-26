import * as React from "react";
import Top from "./TopBar";
import { useState, useEffect } from "react";
require('../Components/CustomerForm.css')
import { useLocation } from "react-router-dom";
import pnp from 'sp-pnp-js';
import { Card, Col, Container, Row, Form, Button, DropdownButton, Dropdown, } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import Toast from 'react-bootstrap/Toast';
// import { useForm } from "react-hook-form";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
export default function CustomerForm() {
    const location = useLocation();
    const [arr, SetArr] = useState([])
    const [username, setUsername] = useState("")
    const [last, setLast] = useState("")
    const [state, setState] = useState("Select")
    const [city, setCity] = useState("Select")
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [stateArr, setStateArr] = useState([])
    const [cityArr, setCityArr] = useState([])
    const [fromdate, setFormdate] = useState('')
    const [todate, setTodate] = useState('')
    const [showA, setShowA] = useState(false);
    const [id,setId]=useState(0);

    const get = () => {
        let itemArr: any = []
        pnp.sp.web.lists.getByTitle('CarsInformation').items.select('*').getAll().then((Items: any[]) => {
            for (let i = 0; i < Items.length; i++) {
                console.log(Items[i].PlateNumber)
                if (Items[i].ID === location.state.data)
                    itemArr.push({
                        Title: Items[i].Title,
                        CarName: Items[i].CarName,
                        PlateNumber: Items[i].PlateNumber,
                        Specification: Items[i].Specification,
                        Rentend: Items[i].Rented,
                        CarImage: JSON.parse(Items[i].CarImage).serverRelativeUrl,
                        year: Items[i].year0
                    })
                    setId(Items[i].ID)
            }
            SetArr(itemArr)
            console.log(arr)
        }).catch((e => {
            console.log(e)
        }))
    }
    const getMaster = () => {
        debugger;
        let State: any = []
        let City: any = []
        pnp.sp.web.lists.getByTitle("MasterList").items.select("*").getAll().then((items: any[]) => {
            for (let i = 0; i < items.length; i++) {
                if (items[i].Title === "State") {
                    State.push({
                        StateName: items[i].Value
                    })
                }
                else if (items[i].Title === "City") {
                    City.push({
                        CityName: items[i].Value
                    })
                }
            }
            setStateArr(State)
            setCityArr(City)
            console.log(stateArr)
            console.log(cityArr)

        }).catch((e) => {
            console.log(e)
        })
    }

    console.log(username)
    useEffect(() => {
        getMaster();
        get();

    }, [])
    let Add = document.getElementById("Required")
    let Add1 = document.getElementById("Required1")
    let Add2 = document.getElementById("Required2")
    let Add3 = document.getElementById("Required3")
    let Add4 = document.getElementById("Required4")
    let Add5 = document.getElementById("Required5")
    let Add6 = document.getElementById("Required6")
    let Add7 = document.getElementById("Required7")

    const add = async () => {
        debugger;
        if (username == '') {
            Add.textContent = "Required*"
        }
        else if (last == '') {
            Add1.textContent = "Required*"
        }
        else if (email == '') {
            Add2.textContent = "Required*"
        }
        else if (phone == '') {
            Add3.textContent = 'Required*'
        }
        else if (city == '') {
            Add4.textContent = 'Required*'
        }
        else if (state == '') {
            Add5.textContent = 'Required*'
        }
        else if (fromdate == '') {
            Add6.textContent = 'Required*'
        }
        else if (todate == '') {
            Add7.textContent = 'Required*'
        }
        else {
            setShowA(!showA)
            debugger
            await pnp.sp.web.lists.getByTitle('CustomerData').items.add({
                Title: username,
                LastName: last,
                UserName: email,
                Phone: phone,
                State: state,
                City: city,
                FromDate: fromdate,
                ToDate: todate
            })
            await pnp.sp.web.lists.getByTitle("CarsInformation").items.getById(id).update({
                Rentend:'Yes'
            })
            setUsername('')
            setPhone('')
            setLast('')
            setEmail('')
            setCity('')
            setState('')
            setFormdate('')
            setTodate('')
        }
    }
    const Firstname = (e: any) => {
        setUsername(e.target.value)
        Add.textContent = ''
    }
    const Last = (e: any) => {
        setLast(e.target.value)
        Add1.textContent = ''
    }
    const Email = (e: any) => {
        setEmail(e.target.value)
        Add2.textContent = ''
    }
    const Phone = (e: any) => {
        setPhone(e.target.value)
        Add3.textContent = ''
    }
    const From = (e: any) => {
        setFormdate(e.target.value)
        Add6.textContent = ''
    }
    const To = (e: any) => {
        setTodate(e.target.value)
        Add7.textContent = ''
    }
    const handleselect = (e: any) => {
        setCity(e);
        debugger;
        Add5.textContent = ''

    }
    const handleselect1 = (e: any) => {
        setState(e);
        Add4.textContent = ''
        debugger;
    }
    const popclose=()=>{
        setShowA(false)
    }
    return (
        <div>
            <Toast show={showA} onClose={popclose}
                className="toast">
                <Toast.Header style={{ backgroundColor: 'green' }}>
                    <p className="me-auto" style={{
                        color: 'white', textAlign: 'center', margin: '5px'
                    }}> Your car has been booked successfully!</p>
                </Toast.Header>
            </Toast>
            <Top />
            <div className="bodyContent">
                <Container>
                    <div className="displaycar">
                        <Row>
                            {arr.map((item, k) => (
                                <Col key={k} xs={12} md={12} lg={12} >
                                    <Card className="card1">
                                        <Card.Img src={item.CarImage} className="Image" />
                                        <Card.Body>
                                            <Card.Text className="CardText5">Manufacturer:{item.Title}</Card.Text>
                                            <Card.Text className="CardText5">CarName:{item.CarName}</Card.Text>
                                            <Card.Text className="CardText5">PlateNumber:{item.PlateNumber}</Card.Text>
                                            <Card.Text className="CardText5">Year:{item.year}</Card.Text>
                                            <Card.Text className="CardText5">Specification:{item.Specification}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div >
                </Container>
                <h1>Customer Details</h1>
                <div className="Form" >
                    <Row className="p-4">
                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                onChange={(e) => { Firstname(e) }} value={username}
                            />
                            <p id='Required' style={{ color: 'red' }}></p>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationFormik02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                onChange={(e) => { Last(e) }}
                                value={last}
                            />
                            <p id='Required1' style={{ color: 'red' }}></p>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationFormikUsername">
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    name="username"
                                    value={email}
                                    onChange={(e) => Email(e)}
                                />
                            </InputGroup>
                            <p id='Required2' style={{ color: 'red' }}></p>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationFormik02">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="number"
                                value={phone}
                                onChange={(event) => Phone(event)}
                            />
                             <p id='Required3' style={{ color: 'red' }}></p>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                            <Form.Label>City</Form.Label>
                            <DropdownButton className='Dpbtn'title={city} onSelect={handleselect} >
                                {cityArr.map((i, key) => (
                                    <Dropdown.Item eventKey={i.CityName}>{i.CityName}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                            <p id='Required4' style={{ color: 'red' }}></p>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationFormik02">
                            <Form.Label>State</Form.Label>
                            <DropdownButton className="Dpbtn" title={state} onSelect={handleselect1} >
                                {stateArr.map((i, key) => (
                                    <Dropdown.Item eventKey={i.StateName}>{i.StateName}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                            <p id='Required5' style={{ color: 'red' }}></p>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                            <Form.Label>From date</Form.Label>
                            <Form.Control
                                type="date"
                                name="firstName"
                                onChange={(e) => { From(e) }} value={fromdate}
                            />
                            <p id='Required6' style={{ color: 'red' }}></p>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationFormik02">
                            <Form.Label>To date</Form.Label>
                            <Form.Control
                                type="date"
                                name="lastName"
                                onChange={(e) => To(e)}
                                value={todate}
                            />
                            <p id='Required7' style={{ color: 'red' }}></p>
                        </Form.Group>
                    </Row>
                    <Button className="btn23 mb-3" type="submit" onClick={() => add()}>Submit form</Button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}