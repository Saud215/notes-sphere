import { Form, Link } from "react-router-dom";
import { FaRegSave } from "react-icons/fa";
import { useState } from "react";

const EditNoteForm = ({ title, text, completed }) => {
  return (
    <Form method="POST" className="form-control mx-auto w-[90%] gap-y-4">
      <div className="note-title">
        <label htmlFor="title" className="label">
          <span className="label-text">Note Title</span>
        </label>
        <input
          type="text"
          placeholder="Title"
          name="title"
          id="title"
          className="input input-bordered w-full "
          defaultValue={title}
        />
      </div>

      <div className="note-description form-control gap-y-1">
        <label htmlFor="text" className="label">
          <span className="label-text"> Note Description</span>
        </label>
        <textarea
          className="textarea textarea-bordered min-h-32 md:min-h-48 w-full "
          placeholder="Note Description"
          name="text"
          id="text"
          defaultValue={text}
        ></textarea>
      </div>
      <div className="note-completion flex justify-start">
        <label htmlFor="completed" className="label cursor-pointer">
          <span className="label-text">Completed</span>
          <input
            type="checkbox"
            defaultChecked={completed}
            name="completed"
            id="completed"
            className="checkbox checkbox-primary ml-6"
          />
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary text-gray-800  lg:text-lg font-bold max-w-24 lg:max-w-32"
      >
        Save
        <span>
          <FaRegSave size={16} />
        </span>
      </button>
    </Form>
  );
};
export default EditNoteForm;
