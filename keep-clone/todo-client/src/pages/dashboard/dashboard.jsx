import React from 'react'
import {  useHistory } from "react-router-dom";
import { useEffect,useState } from "react";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import Count from "./components/Count";
import axios from 'axios';
import Footer from "./components/Footer";
import './style.css';


const Dashboard = () => {
  const history=useHistory();
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")))
  useEffect(() => {
    const w=JSON.parse(localStorage.getItem("user"));
    if(!w)
    history.push('/');

    const fetchnewdata = async () => {
      try {
  
        const res = await axios.get("https://mern-todo-auntentication.herokuapp.com/api/users/find/"+w._id);

        console.log(res.status);
        localStorage.setItem("user",JSON.stringify(res.data));
        setuser(res.data);
        

      } catch (err) {
          console.error("Error response:");
          console.error(err.response.data);    // ***
      }
  
    }



    if(!w)
    history.push('/');
    else
    setuser(w)
    fetchnewdata();
  }, [])
  
  const [notes, setNotes] = useState(user.task);
  async function addNote(newNote) {
    setNotes((prevValue) => {
      return [...prevValue, newNote];
    });
    const res = await axios.put("http://localhost:8800/api/users/add/"+user._id,{task:newNote});
    console.log(res.status);
  }

async function deleteNotes(id) {
    setNotes((preValue) => {
      return [...preValue.filter((note, index) => index !== id)];
    });
    const res= await axios.put("http://localhost:8800/api/users/delete/"+user._id,notes);
    console.log(res.data);
  }
  console.log(notes);

  
  return (
    <div className="App">
      <Header name={user.username} />
      <Count
        count={
          notes.length === 0
            ? "Empty"
            : `Showing ${notes.length} Notes in Database`
        }
      />
      <CreateArea onAdd={addNote}/>
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          onDelete={deleteNotes}
        />
      ))}
      <Footer />
    </div>
  );
}


export default Dashboard;