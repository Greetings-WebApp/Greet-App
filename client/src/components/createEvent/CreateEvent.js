import React, { useState, useContext } from "react";
import axios from "axios";
import DispatchContext from "../../context/DispatchContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CreateEvent() {
  const history = useHistory();
  const appDispatch = useContext(DispatchContext);
  const [display, setDisplay] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dateOfEvent: "",
    event: "",
  });

  const { name, dateOfEvent, event } = formData;

  const change = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("GreetToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (!name || !dateOfEvent || !event) {
      appDispatch({
        type: "flashMessage",
        value: "Please fill the form completely!",
        status: false,
      });
    }
    try {
      const res = await axios.post(
        "/api/friend",
        { name, dateOfEvent, event },
        config
      );
      history.push("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Link className="" to="/">
        <img className="logo_create" src="/images/misc/logo.png" alt="logo" />
      </Link>
      <div className="contain">
        <h1 className="large">Create Your Event</h1>
        <p className="lead">
          <i className="fa fa-user"></i> Let's get some information to set your
          event.
        </p>
        <form className="form" onSubmit={(e) => submit(e)}>
          <div className="form-group">
            <small className="form-text">Name of Friend</small>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => change(e)}
              className="inputField"
            />
          </div>
          <div className="form-group">
            <small className="form-text">Date of event</small>
            <input
              type="date"
              name="dateOfEvent"
              className="inputField"
              value={dateOfEvent}
              onChange={(e) => change(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">Event Name</small>
            <input
              type="text"
              placeholder="Birthday, anniversary, etc."
              name="event"
              value={event}
              onChange={(e) => change(e)}
              className="inputField"
            />
          </div>
          <div className="my-2">
            <button
              onClick={() => setDisplay(!display)}
              type="button"
              className="btn-1"
            >
              Add Additional information
            </button>
            <button onClick={(e) => submit(e)} type="button" className="btn-1">
              CREATE
            </button>
          </div>
          {display && (
            <>
              <div className="form-group">
                <small className="form-text">Tell us more about Event</small>
                <textarea
                  placeholder="..."
                  rows="5"
                  cols="50"
                  name="bio"
                ></textarea>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}

// CreateEvent.propTypes = {
//   addEvent: PropTypes.func.isRequired,
// };
