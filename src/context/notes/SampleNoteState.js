import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const host = "http://localhost:5000";

	const initialNotes = [];
	const [notes, setNotes] = useState(initialNotes);

	//Fetch All notes
	const getNotes = async () => {
		//TODO API call
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: "GET", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});
		const json = await response.json();
		setNotes(json);
	};

	//Add a Note
	const addNote = async (title, description, tag) => {
		//TODO API call
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
		});
		const note = await response.json();
		setNotes(notes.concat(note));
	};

	//Delete a note
	const deleteNote = async (id) => {
		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: "DELETE", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});
		const json = response.json(); // parses JSON response into native JavaScript objects

		const newNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
	};

	//Edit a note
	const editNote = async (id, title, description, tag) => {
		//API Call

		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: "PUT", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
		});
		const json = response.json(); // parses JSON response into native JavaScript objects

		let newNotes = JSON.parse(JSON.stringify(notes));
		for (let index = 0; index < notes.length; index++) {
			const element = newNotes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;

				break;
			}
		}
		setNotes(newNotes);
	};
	return (
		<NoteContext.Provider
			value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
