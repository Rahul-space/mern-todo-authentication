import React, { useState } from "react";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";

function CreateArea({ onAdd }) {
  const [isExpanded, setExpanded] = useState(false);
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")))
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  function handleExpanded() {
    setExpanded(true);
  }

  function submitButton(event) {
    console.log(note);
    //const res = await axios.post("localhost:8800/api/users/add/634c4a492887da8d5ed1d491",note);

    //console.log(res.status);
    onAdd(note);

    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        {isExpanded && (
          <input
            value={note.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
        )}
        <p>
          <textarea
            value={note.content}
            onClick={handleExpanded}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
          ></textarea>
        </p>
        <button onClick={submitButton}>
          <IoIosAdd size={35} />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
