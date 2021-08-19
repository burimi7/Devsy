import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import Modal from '@material-ui/core/Modal';

import Fab from '@material-ui/core/Fab';

import './App.css';
import { StepConnector } from '@material-ui/core';

function App() {

  const [AllUsers, setUsers] = useState([]);
  const [TmpAllUsers, setTmpUsers] = useState([]);
  // const [AllUsers0, setUsers0] = useState([]);
  const [SelectedUser, SetSelectedUser] = useState(-1)
  const [DeleteUser, SetDeleteUser] = useState(-1);
  const [FitlerValue,SetFitlerValue]=useState('')
  const [open,SetOpen]=useState(false)
  const [isNewUser, setisNewUser]=useState(false)

  const classes = useStyles();

  const [NewUser, SetNewUser]=useState({
    id:0,
    firstname:'',
    lastname:'',
    email:'',
    birthday:'',
  })


  useEffect(() => {

    fetch('http://localhost:3000/api/User/GetUsers')
      .then(res => res.json())
      .then(
        (result) => {
          setUsers(result)
          setTmpUsers(result)
        },
        (error) => {
        }
      )

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div className="App">

{isNewUser===false ? 
<Fab color="primary" aria-label="add" style={{'float':'left'}} onClick={()=>{setisNewUser(true)}} >
        <label>New</label>
      </Fab>
      :null}

{/* NewUser */}
{isNewUser===true ? 
      <div className="NewUser">
        <h2>New user</h2>
        <div>
          <input type="text" placeholder="Firstname" defaultValue={NewUser.firstname} onChange={(e)=>{
            NewUser.firstname=e.target.value;
          SetNewUser(NewUser)
          }} />
          <input type="text" placeholder="Lastname" defaultValue={NewUser.lastname}  onChange={(e)=>{
            NewUser.lastname=e.target.value;
          SetNewUser(NewUser)
          }}/>
          <input type="text" placeholder="Email" defaultValue={NewUser.email}  onChange={(e)=>{
            NewUser.email=e.target.value;
          SetNewUser(NewUser)
          }}/>
          <input type="date" defaultValue={NewUser.birthday}  onChange={(e)=>{
            NewUser.birthday=e.target.value;
          SetNewUser(NewUser)
          }}/>
        </div>
        <br/>
        <Button variant="contained" color="primary" onClick={() => {
          NewUser.id=AllUsers.length
          SetNewUser(NewUser)
                    axios.post(`http://localhost:3000/api/User/AddUser`, NewUser)
                      .then(res => {
                        setUsers(res.data)
                        setTmpUsers(res.data)
                      })
                    SetSelectedUser(-1) //no user is selected
                    setisNewUser(false) 
                            
        }} >Add</Button>
        <Button variant="contained" color="default" onClick={() => {
          setisNewUser(false)                            
        }} >Cancel</Button>
      </div>
:
      <div>

      <input type="text" placeholder="Filter" defaultValue={FitlerValue} onChange={(e)=>{
        if (e.target.value.length > 0) {

          SetFitlerValue(e.target.value)

          setTmpUsers(
            AllUsers.filter(user => 
              user.firstname.includes(e.target.value)
                ||
                user.lastname.includes(e.target.value)
                ||
                user.email.includes(e.target.value)
                ||
                user.birthday.includes(e.target.value)
            )
          )

        }
        else{          
          setTmpUsers(AllUsers)
        }

      }} />    

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Firstname</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Birthday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {TmpAllUsers.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell>
                  {SelectedUser === row.id ?
                    <input type="text" defaultValue={row.firstname} onChange={(e) => {
                      AllUsers[index].firstname = e.target.value;
                      setUsers(AllUsers);
                    }} />
                    : row.firstname}

                </TableCell>
                <TableCell>

                  {SelectedUser === row.id ?
                    <input type="text" defaultValue={row.lastname} onChange={(e) => {
                      AllUsers[index].lastname = e.target.value;
                      setUsers(AllUsers);
                    }} />
                    : row.lastname}

                </TableCell>
                <TableCell>

                  {SelectedUser === row.id ?
                    <input type="text" defaultValue={row.email} onChange={(e) => {
                      AllUsers[index].email = e.target.value;
                      setUsers(AllUsers);
                    }} />
                    : row.email}

                </TableCell>

                <TableCell>

                  {SelectedUser === row.id ?
                    <input type="date" defaultValue={row.birthday} onChange={(e) => {
                      AllUsers[index].birthday = e.target.value;
                      setUsers(AllUsers);
                    }} />
                    : row.birthday}

                </TableCell>

                {SelectedUser === row.id ?
                  <TableCell><Button variant="contained" color="secondary" onClick={() => {
                    axios.post(`http://localhost:3000/api/User/EditUser`, AllUsers[index])
                      .then(res => {
                        setUsers(res.data)
                        setTmpUsers(res.data)
                      })
                    SetSelectedUser(-1) //no user is selected
                  }}>Save</Button></TableCell>
                  :
                  <TableCell><Button variant="contained" color="primary" onClick={() => { SetSelectedUser(row.id) }}>Edit</Button></TableCell>
                }
                {DeleteUser === row.id ?
                  <TableCell>
                    <label>Are you sure?</label><br />
                    <div style={{ 'display': 'flex' }}>
                      <Button variant="contained" color="secondary" onClick={() => {
                        axios.delete(`http://localhost:3000/api/User/DeleteUser/`+row.id )
                          .then(res => {
                            setUsers(res.data)
                          })
                        SetDeleteUser(-1); //no user is selected
                      }}
                      >Yes</Button><br />
                      <Button variant="contained" color="default" onClick={() => { SetDeleteUser(-1) }}>No</Button>
                    </div>
                  </TableCell>
                  :
                  <TableCell><Button variant="contained" color="default" onClick={() => { SetDeleteUser(row.id) }}>Delete</Button></TableCell>
                }


              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>


      </div>
    }
    </div>
  );
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default App;
