import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Form = () => {
  const [data, setData] = useState([]);
  const [que, setQue] = useState([]);
  const [user, setUser] = useState('');
  const [ans, setAns] = useState([{ question: '', answer: '' }]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  const { id } = useParams();

  useEffect(() => {
    getForms();
  }, []);

  const getForms = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/form/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json());

    if (componentMounted) {
      // console.log(response)
      setData(await response);
      setQue(await response.fields);
      const newAns = response.fields.map((item) => ({ question: item.name, answer: '' }));
      setAns(newAns);
      setLoading(false);
    }

    return () => {
      componentMounted = false;
    };
  };

  const handleAns = (e, question) => {
    const updatedAnswers = ans.map((item) => {
      if (item.question === question) {
        return { ...item, answer: e.target.value };
      }
      return item;
    });
    setAns(updatedAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const send = { "user": user, "fields": ans };

    if (user === '') {
      alert('Please fill your name!');
      return;
    }

    fetch(`${process.env.REACT_APP_BASE_URL}/user/form/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        Swal.fire({
          title: 'Form submitted successfully',
          text: 'You can do more submissions, just click Okay',
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

  const handleUser = (e) => {
    setUser(e.target.value);
  }

  return (
    <>
      <div className='mx-5 sm:mx-16 lg:mx-32'>
        <div className='p-4 mt-4 rounded-xl' style={{ backgroundImage: "url('https://picsum.photos/1280/720')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

          <h1 className='rounded-lg mb-2 backdrop-blur-lg bg-opacity-50 bg-zinc-900 w-full bg-transparent p-2 text-white text-3xl'>Title: {data.title}</h1>
          <h2 className='rounded-lg mb-2 backdrop-blur-lg bg-opacity-50 bg-zinc-900 w-full bg-transparent p-2 text-white text-lg'>Description: {data.description}</h2>
          <input className='rounded-lg outline-none w-full backdrop-blur-lg bg-opacity-50 bg-zinc-900 p-2 text-white text-sm' placeholder='Your Name' value={user} onChange={handleUser} />
        </div>

        <div className='mt-4 rounded-xl border-2 border-white'>

          {que.map((item, index) => (
            <div className='min-h-32 mx-4 my-4 p-4 rounded-xl border-4 border-white'>
              <span className='w-full bg-transparent p-2 text-white text-lg' placeholder='Question'>{item.name}</span>
              {item.required ? <span className='text-red-500 text-2xl'>*</span> : null}
              <h4 className='w-full bg-transparent p-2 text-white text-sm' placeholder='Description'>{item.label}</h4>

              {item.options.map((item2, index2) => (
                <div className='flex'>
                  <span className='text-red-500 text-md mt-1'>{index2+1}.</span>
                  <input className='w-full bg-transparent p-2 text-white text-sm' placeholder='Description' value={item2} />
                </div>
              ))}
              <input className='rounded-lg mb-2 backdrop-blur-lg bg-opacity-50 bg-zinc-900 w-full bg-transparent p-2 border-b border-gray-500 focus:border-blue-500 outline-none text-white text-sm' placeholder='Answer' value={ans[item.name]} onChange={(e) => handleAns(e, item.name)} />
            </div>
          ))}
          <button className='mx-4 rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-lg text-white py-1 px-2 inline flex items-center font-bold mb-2' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  )
}
