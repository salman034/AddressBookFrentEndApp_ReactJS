import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Form.css";
import { useState } from "react";
import AddressbookService from "../service/AddressbookService"; 
import CancelButton from '../components/assets/icons/cancel.png';
import states from "../components/assets/states";

export default function Form(props) {

  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  let navigate = useNavigate();
  const params = useParams();
  
  const [contact, setContact] = useState({
    personId:"",
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isUpdate: false,
  });

  function saveData(e) {
    e.preventDefault();
    alert(" Data updated Succesfully");
    let person = {
    fullName: contact.fullName,
    phoneNumber: contact.phoneNumber,
    address: contact.address,
    city: contact.city,
    state: contact.state,
    zip: contact.zip,
    }

    if(contact.isUpdate){
      AddressbookService.updatePerson(params.id,person).then((response)=>{
        console.log("updated successfully: ");
          navigate("/home");
        
      });
    }else{
      AddressbookService.addPerson(person).then((response)=>{
        console.log("Added: "+response);
          navigate("/home")
        })
      
    }
  }

  const resetForm = (e) =>{
    e.preventDefault()
    setContact({
      ...contact,personId:"",
      fullName: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      zip: "", 
      isUpdate: false,
    })
  }

  const handleInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setContact({...contact,[name]:value})
    console.log([name]+" ",value)
  }

  const id = props.state;
  useEffect(()=>{
    console.log(params.id)
    if(params.id){
      getContactDataById(id);
    }
  },[id])

  useEffect(() => {
    setState(states);
    console.log(state);
  }, []);

  const handleState = (event) => {
    const citiesOfState= states.find(state => state.name === event.target.value).city
    setCity(citiesOfState);
    changeValue(event);
  }

  const changeValue = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const getContactDataById = (id) =>{
    AddressbookService.getPersonById(params.id).then((response)=>{
      console.log(response)
      setContact({...contact,...response,
        personId:response.data.data.personId,
        fullName:response.data.data.fullName,
        phoneNumber:response.data.data.phoneNumber,
        address:response.data.data.address,
        city:response.data.data.city,
        state:response.data.data.state,
        zip:response.data.data.zip,
        isUpdate:true,
      })
    })
  }

  return (
    <div>
      <div className="form-content">
        <form action="#" className="form" onSubmit={saveData} onReset={resetForm}>
          <div className="form-head-content">
            <div className="form-head">Person Address Form</div>
            <div className="form-logo-content">
              <Link to="/home">
                <span id="img"><Link to="/home"><img src={CancelButton} height="20" width="20" alt="" /></Link>
                <Link to="/home"></Link>
                 </span>
              </Link>
            </div>
          </div>
          <div className="row-content">
            <label className="label_text" htmlFor="name">
              Full Name
            </label>
            <input
              className="input"
              type="text"
              name="fullName"
              id="fullName"
              value={contact.fullName}
              onChange={handleInput}
              required
            />
            <error-output className="name-error" htmlFor="text" />
          </div>

          <div className="row-content">
            <label className="label_text" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="input"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={contact.phoneNumber}
              onChange={handleInput}
              required
            />
            <error-output className="phone-error" htmlFor="text" />
          </div>

          <div className="row-content">
            <label className="label_text" htmlFor="address">
              Address
            </label>
            <textarea
              className="input"
              id="address"
              name="address"
              style={{ height: "100px" }}
             
              defaultValue={contact.address}
              onChange={handleInput}
              required
            />
            <error-output
              id="address-error"
              className="address-error"
              htmlFor="address"
            />
          </div>
          <div className="row-content-exp">
            <div className="oneRow-content">
              <label className="label_text" htmlFor="city">
                City
              </label>
              <select
                className="select-input"
                id="city"
                name="city"
                typeof="text"
                value={contact.city}
                onChange={handleInput}
                required
                >
                <option value="0" >
                  Select City
                </option>
                {
                  city &&
                  city !== undefined ?
                  city.map((cities,index) => {
                    return(
                      <option key={index} value={cities}>{cities}</option>
                    )
                  })
                  :"No City"
                }
              </select>
            </div>
            <div className="oneRow-content">
              <label className="label_text" htmlFor="state">
                State
              </label>
              <select
                className="select-input"
                id="state"
                name="state"
                value={contact.state}
                onChange={(event) => handleState(event)}
                
                >
                <option value="0" >
                  Select State
                </option>
                {
                  state &&
                  state !== undefined ?
                  state.map((states,index) => {
                    return(
                      <option key={index} value={states.name}>{states.name}</option>
                    )
                  })
                  :"No State"
                }
                
              </select>
            </div>
            <div className="oneRow-content">
              <label className="label:text" htmlFor="zip">
                Zip
              </label>
              <input
                className="input"
                type="text"
                name="zip"
                id="zip"
                value={contact.zip}
                onChange={handleInput}
                required
              />
            </div>
          </div>
          
          <div className="add-reset">
            <button type="submit" className="button addButton" id="addButton">
              {contact.isUpdate?"Update":"Add"}
            </button>
            <button
              type="reset"
              
              className="resetButton button"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
}
