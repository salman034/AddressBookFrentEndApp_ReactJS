import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import AddressbookService from "../service/AddressbookService";
import { useEffect } from "react";
import delete1 from "../components/assets/icons/delete.svg"
import edit1 from "../components/assets/icons/edit.svg"
import {useNavigate } from "react-router-dom";

export default function Home(props) {
  let navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContactsApi();
  });

  function fetchContactsApi() {
    AddressbookService.getAll()
      .then((result) => {
        setContacts(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

//   function sortByCity() {
//     AddressbookService.sortByCity().then((response) => {
//         setContacts(response.data.data );
//         console.log(response);
//     });
// }
//     function sortByState() {
//     AddressbookService.sortByState().then((response) => {
//         setContacts(response.data.data);
//         console.log(response);
//     });
// } 
  
  let deleteContact = (id)=> {   
    var answer = window.confirm("Data once deleted cannot be restored!! Do you wish to continue ?");
    if(answer === true){
      AddressbookService.delete(id);
        alert("Data deleted successfully!!");
        fetchContactsApi();
    }
    else{
      window.location.reload();
    }
};

    const updateContact = (id)=>{
      alert("You are modified the existing data!!")
      navigate(`/form/${id}`);
   
};    
  return (
    <div>
      <span></span>

      <div className="main-content">
        <div className="header-content">
          <div className="person-detail-text">
            PERSON DETAILS <div className="person-count"></div>
          </div>
          <Link to="/login" className="add-button">
            <img src="../assets/icons/add+24px.svg" alt="" />
             Logout
          </Link>
          <Link to="/form" className="add-button">
            <img src="../assets/icons/add+24px.svg" alt="" />
            + Add Person
          </Link>
        </div>
      

      <div className="table-main">
        <table id="table-display" className="table">
          <thead>
            <tr>
              <th>SlNo</th>             
              <th>Full Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>ZipCode</th>
              <th>PhoneNumber</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           
          {
             contacts.map((contact,i)=>{
              return(
                <tr key={contact.personId}>
                  <td>{i}</td>
                  <td>{contact.fullName}</td>
                  <td>{contact.address}</td>
                  <td>{contact.city}</td>
                  <td>{contact.state}</td>
                  <td>{contact.zip}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>
                  <img
                    name={contact.personId}
                    src={delete1}
                    alt="delete"
                    onClick={() => deleteContact(contact.id)}
                  />
                  <img
                    name={contact.personId}
                    src={edit1}
                    alt="update"
                    onClick={() => updateContact(contact.id)}
                  />
                </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}