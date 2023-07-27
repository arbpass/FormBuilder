import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState([{ title: 'Title', description: 'Description' }]);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: '',
    fields: {
      name: "",
      label: "",
      type: "",
      required: false,
      options: []
    }
  });

  // Function to add a new object to the state
  const addQuestions = (type) => {
    let newObj = { key: questions.length + 1, name: 'Question Name' + (questions.length + 1), label: 'Description' + (questions.length + 1), type: type, required: false, options: [] };
    if (type === 'checkbox' || type === 'radio') {
      newObj = { key: questions.length + 1, name: 'Question Name' + (questions.length + 1), label: 'Description' + (questions.length + 1), type: type, required: false, options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] };
    }
    setQuestions([...questions, newObj]);
  };

  const handleRemove = (name) => {
    // console.log(name)
    const updatedItems = questions.filter(item => item.name !== name);
    setQuestions(updatedItems);
  };

  //Onchange for questions
  const handleReqChange = (data) => {
    if (!data.required) {
      setQuestions((prevState) =>
        prevState.map((item) => (item.key === data.key ? { ...item, required: true } : item))
      );
    }
    else {
      setQuestions((prevState) =>
        prevState.map((item) => (item.key === data.key ? { ...item, required: false } : item))
      );
    }
  };
  const handleNameChange = (e, key) => {
    setQuestions((prevState) =>
      prevState.map((item) => (item.key === key ? { ...item, name: e.target.value } : item))
    );
  };
  const handleDescChange = (e, key) => {
    setQuestions((prevState) =>
      prevState.map((item) => (item.key === key ? { ...item, label: e.target.value } : item))
    );
  };
  const handleOptionsChange = (e, index, key) => {
    setQuestions((prevState) =>
      prevState.map((item) => (item.key === key ? { ...item, options: item.options.map((option, i) => (i === index ? e.target.value : option)) } : item))
    );
  };

  //Onchange for title and desc of form
  const handleTitleChange = (e) => {
    setForm([{ ...form[0], title: e.target.value }]);
  };
  const handleDescriptionChange = (e) => {
    setForm([{ ...form[0], description: e.target.value }]);
  };

  //Handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    formData.title = form[0].title;
    formData.description = form[0].description;
    formData.owner = 'ayush';
    formData.fields = questions;

    // Data validation
    if (!formData.title) {
      alert('Please fill in all the fields');
      return;
    }

    fetch('dashboard/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        Swal.fire({
          title: 'Form saved successfully',
          text: 'You are redirected to the dashboard',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Okay!',
        })
        navigate('/');
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  };
  // console.log(questions)


  return (
    <>
      <div className='mx-5 sm:mx-16 lg:mx-32'>
        <div className='p-4 mt-4 rounded-xl' style={{ backgroundImage: "url('https://picsum.photos/1280/720')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

          <button className="float-right rounded-md backdrop-blur-lg bg-opacity-50 bg-zinc-900 text-lg text-white py-1 px-2 inline flex items-center font-bold mb-2" onClick={handleSubmit}>Save<img className='h-8 w-8 mx-2 float-right transform hover:scale-110 transition-all cursor-pointer' src="https://www.svgrepo.com/show/262793/diskette-save.svg" alt="" />
          </button>

          <input className='rounded-lg mb-2 backdrop-blur-lg bg-opacity-50 bg-zinc-900 w-full bg-transparent p-2 border-b border-gray-500 focus:border-blue-500 outline-none text-white text-3xl' placeholder='Question' value={form[0].title} onChange={handleTitleChange} />
          <input className='rounded-lg mb-2 backdrop-blur-lg bg-opacity-50 bg-zinc-900 w-full bg-transparent p-2 border-b border-gray-500 focus:border-blue-500 outline-none text-white text-lg' placeholder='Question' value={form[0].description} onChange={handleDescriptionChange} />
        </div>

        <div className='mt-4 rounded-xl border-2 border-white'>

          <div className='p-4 flex flex-wrap justify-center'>
            <button onClick={() => addQuestions("text")} className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-2 px-4 inline mx-2 my-2">Text</button>
            <button onClick={() => addQuestions("checkbox")} className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-2 px-4 inline mx-2 my-2">Checkbox</button>
            <button onClick={() => addQuestions("radio")} className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-2 px-4 inline mx-2 my-2">Radio</button>
          </div>

          {questions.map((item, index) => (
            <div className='min-h-32 mx-4 my-4 p-4 rounded-xl border-4 border-white'>
              <button className="bg-transparent text-white rounded-full float-right" onClick={() => handleRemove(item.name)}><img className='h-12 w-12' src='https://www.svgrepo.com/show/530501/delete.svg'/></button>
              <input type="checkbox" className='' onChange={() => handleReqChange(item)} />
              <label className='text-red-500'> Required</label>
              <input className='w-full bg-transparent p-2 border-b border-gray-500 focus:border-blue-500 outline-none text-white text-lg' placeholder='Question' value={item.name} onChange={(e) => handleNameChange(e, item.key)} />
              <input className='w-full bg-transparent p-2 border-b border-gray-500 focus:border-blue-500 outline-none text-white text-sm' placeholder='Description' value={item.label} onChange={(e) => handleDescChange(e, item.key)} />

              {item.options.map((item2, index) => (
                <input className='w-full bg-transparent p-2 border-b border-gray-500 focus:border-blue-500 outline-none text-white text-sm' placeholder='Description' value={item2} onChange={(e) => handleOptionsChange(e, index, item.key)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
