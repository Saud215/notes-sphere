import { Form } from "react-router-dom";
import { FaRegSave } from "react-icons/fa";

const NoteForm = ({}) => {
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
        ></textarea>
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
export default NoteForm;
