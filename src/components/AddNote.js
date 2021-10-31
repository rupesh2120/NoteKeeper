import React, { useContext, useState } from "react";
import Select from "react-select";
import noteContext from "../context/notes/noteContext";

export const AddNote = () => {
	const context = useContext(noteContext);
	const { addNote } = context;

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [selectedTag, setSelectedTag] = useState("");

	const tagList = [
		{
			value: "Personal",
			label: "Personal",
		},
		{
			value: "Work",
			label: "Work",
		},
	];

	const handleClick = (e) => {
		e.preventDefault();
		addNote(title, description, selectedTag);
		setTitle("");
		setDescription("");
		setSelectedTag("");
		//setNote({ title: "", description: "", tag: "" });
		console.log(selectedTag[0]);
	};

	const onChangeTag = (e) => {
		setSelectedTag(e.label);
	};

	// const onChange = (e) => {
	// 	setNote({ ...note, [e.target.name]: e.target.value });
	// };
	return (
		<div>
			<h2>Add a note</h2>
			<form>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						type="text"
						className="form-control"
						id="title"
						name="title"
						aria-describedby="emailHelp"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						minLength={5}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input
						type="text"
						className="form-control"
						id="description"
						name="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						minLength={5}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Tag
					</label>
					<Select name="selectedTag" options={tagList} onChange={onChangeTag} />
				</div>
				{/* <div className="mb-3">
					<label htmlFor="tag" className="form-label">
						Tag
					</label>
					<input
						type="text"
						className="form-control"
						id="tag"
						name="tag"
						value={note.tag}
						onChange={onChange}
						minLength={5}
						required
					/>
				</div> */}
				<div class="mb-3">
					{/* <div class="input-group-prepend">
						<label class="input-group-text" for="inputGroupSelect01">
							Tag
						</label>
					</div>
					<select
						value={selectedTag}
						onChange={(e) => setSelectedTag({ selectedTag: e.target.value })}
						// onChange={onChange}
					>
						{tags.map((tag) => (
							<option key={tag} value={tag}>
								{tag}
							</option>
						))}
					</select> */}
				</div>
				<button
					disabled={title.length < 5 || description.length < 5}
					onClick={handleClick}
					type="submit"
					className="btn btn-primary"
				>
					Add Note
				</button>
			</form>
		</div>
	);
};
