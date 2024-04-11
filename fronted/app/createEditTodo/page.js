import React from "react";

const page = (props) => {
  return (
    <div>
      <form className={`bg-orange-200 shadow-md rounded px-8 pt-6 p-8 mt-10 flex flex-col justify-center `} style={props.edit ? { width: "60%", marginLeft: "18%" } : {}}>

        <div className="mb-4 mt-10r">
          {props.edit ? <h1 className="text-center text-2xl font-bold">
            Enter the details to Edit Todo
          </h1> : <h1 className="text-center text-2xl font-bold">
            Enter the details to create Todo
          </h1>}
        </div>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value = {props.formData ? props.formData.name : ""}
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                props.errors.name && "border-red-500"
            }`}
            onChange={props.handleChange}
            required
          />
          {props.errors.name && (
            <p className="text-red-500 text-xs italic">{props.errors.name}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            value = {props.formData ? props.formData.description : ""}
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                props.errors.description && "border-red-500"
            }`}
            onChange={props.handleChange}
            required
          />
          {props.errors.description && (
            <p className="text-red-500 text-xs italic">{props.errors.description}</p>
          )}
        </div>
        {props.edit && <div className="mb-5">
          <label
            htmlFor="status"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Status
          </label>
          <select
            id="status"
            value = {props.formData ? props.formData.status : ""}
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                props.errors.status && "border-red-500"
            }`}
            onChange={props.handleChange}
          >
            <option value="Complete">Complete</option>
            <option value="pending">pending</option>
          </select>
          {props.errors.status && (
            <p className="text-red-500 text-xs italic">{props.errors.status}</p>
          )}
        </div>}
        <div className="mb-6">
          <label
            htmlFor="time"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Time (estimated)
          </label>
          <input
            id="time"
            type="text"
            value = {props.formData ? props.formData.time : ""}
            className={`shadow appearance-none border border-red-500 bg-orange-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                props.errors.time && "border-red-500"
            }`}
            onChange={props.handleChange}
            required
          />
          {props.errors.time && (
            <p className="text-red-500 text-xs italic">{props.errors.time}</p>
          )}
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            onClick={props.handleSubmit}
          >
            {props.edit ? <p>Edit Todo</p> : <p>Create Todo</p>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
