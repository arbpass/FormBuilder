import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Edit = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  const { id } = useParams();
  const [form, setForm] = useState([{ title: 'Title', description: 'Description' }]);
  const [questions, setQuestions] = useState([]);
  const [img, setImg] = useState('https://picsum.photos/1280/720');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: '',
    coverImg: '',
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
    console.log(data)
    if (!data.required) {
      setQuestions((prevState) =>
        prevState.map((item) => (item.name === data.name ? { ...item, required: true } : item))
      );
    }
    else {
      setQuestions((prevState) =>
        prevState.map((item) => (item.name === data.name ? { ...item, required: false } : item))
      );
    }
  };
  const handleNameChange = (e, name) => {
    setQuestions((prevState) =>
      prevState.map((item) => (item.name === name ? { ...item, name: e.target.value } : item))
    );
  };
  const handleDescChange = (e, label) => {    
    setQuestions((prevState) =>
      prevState.map((item) => (item.label === label ? { ...item, label: e.target.value } : item))
    );
  };
  const handleOptionsChange = (e, index, name) => {
    setQuestions((prevState) =>
      prevState.map((item) => (item.name === name ? { ...item, options: item.options.map((option, i) => (i === index ? e.target.value : option)) } : item))
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
    formData.coverImg = img;

    // Data validation
    if (!formData.title && questions.length <= 0) {
      alert('Please fill in all the fields');
      return;
    }

    fetch(`${process.env.REACT_APP_BASE_URL}/dashboard/update/${id}`, {
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
          title: 'Form updated successfully',
          text: 'You can do more changes, just click Okay',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Okay!',
        })
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    getForm();
  }, []);

  const getForm = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/dashboard/form/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json());

    if (componentMounted) {
      // console.log(response)
      setFormData(await response);
      setImg(await response.coverImg);
      setForm([{ title: response.title, description: response.description }]);
      setQuestions(response.fields);
      setLoading(false);
    }

    return () => {
      componentMounted = false;
    };
  };
  // console.log(formData)

  const handleImg= (e)=> {
    setImg(e.target.value);
  }

  return (
    <>
      <div className='mx-5 sm:mx-16 lg:mx-32'>
        <div className='p-4 mt-4 rounded-xl' style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

          <button className="float-right rounded-md backdrop-blur-lg bg-opacity-50 bg-zinc-900 text-lg text-white py-1 px-2 inline flex items-center font-bold mb-2" onClick={handleSubmit}>Save<img className='h-8 w-8 mx-2 float-right transform hover:scale-110 transition-all cursor-pointer' src="https://www.svgrepo.com/show/262793/diskette-save.svg" alt="" />
          </button>

          <input className='rounded-lg mb-2 backdrop-blur-lg bg-opacity-50 bg-zinc-900 w-full bg-transparent p-2 border-b border-gray-500 focus:border-blue-500 outline-none text-white text-3xl' placeholder='Question' value={form[0].title} onChange={handleTitleChange} />
          <input className='rounded-lg mb-2 backdrop-blur-lg bg-opacity-50 bg-zinc-900 w-full bg-transparent p-2 border-b border-gray-500 focus:border-blue-500 outline-none text-white text-lg' placeholder='Question' value={form[0].description} onChange={handleDescriptionChange} />

          <div class="group relative">
            <button class="px-4 py-2 backdrop-blur-lg bg-opacity-50 bg-zinc-900 text-white rounded hover:bg-lime-600 transition-all">Cover Image</button>
            <input class="hidden absolute top-10 left-0 px-4 py-2 backdrop-blur-lg bg-opacity-50 bg-zinc-900 text-white rounded bg-white shadow-md w-1/2 transition-all group-hover:block" placeholder="Image Link" value={img} onChange={handleImg} />
          </div>
        </div>

        <div className='mt-4 rounded-xl border-2 border-white'>

          <div className='p-4 flex flex-wrap justify-center'>
            <button onClick={() => addQuestions("text")} className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-2 px-4 inline mx-2 my-2">Text</button>
            <button onClick={() => addQuestions("checkbox")} className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-2 px-4 inline mx-2 my-2">Checkbox</button>
            <button onClick={() => addQuestions("radio")} className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-2 px-4 inline mx-2 my-2">Radio</button>
          </div>

          {questions.map((item, index) => (
            <div className='min-h-32 mx-4 my-4 p-4 rounded-xl border-4 border-white'>
              <button className="bg-transparent text-white rounded-full float-right" onClick={() => handleRemove(item.name)}><img className='h-12 w-12' src='https://www.svgrepo.com/show/530501/delete.svg' /></button>
              <input type="checkbox" className='' onChange={() => handleReqChange(item)} checked={item.required} />
              <label className='text-red-500'> Required</label>
              <input className='w-full bg-transparent p-2 border-b border-gray-500 focus:border-blue-500 outline-none text-white text-lg' placeholder='Question' value={item.name} onChange={(e) => handleNameChange(e, item.name)} />
              <input className='w-full bg-transparent p-2 border-b border-gray-500 focus:border-blue-500 outline-none text-white text-sm' placeholder='Description' value={item.label} onChange={(e) => handleDescChange(e, item.label)} />

              {item.options.map((item2, index2) => (
                <div className='flex'>
                <span className='text-red-500 text-md mt-2'>{index2+1}.</span>
                <input className='w-full bg-transparent p-2 border-b border-gray-500 focus:border-blue-500 outline-none text-white text-sm' placeholder='Description' value={item2} onChange={(e) => handleOptionsChange(e, index2, item.name)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
