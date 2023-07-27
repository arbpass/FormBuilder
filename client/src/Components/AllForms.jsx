import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export const AllForms = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        getForms();
    }, []);

    const getForms = async () => {
        setLoading(true);
        const response = await fetch("dashboard/forms", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => response.json());

        if (componentMounted) {
            // console.log(response)
            setData(await response);
            setLoading(false);
        }

        return () => {
            componentMounted = false;
        };
    };

    return (
        <>
            <div className='p-4'>
                <div className="mt-4 flex flex-wrap">
                    {data.map((item, index) => (
                        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl p-4 text-center w-64 mx-2 my-2">
                            <div className="backdrop-blur-lg bg-opacity-50 bg-zinc-900 text-white py-4 px-5 text-center rounded-2xl shadow-lg max-w-xs mx-auto">
                                <h2 className="font-semibold text-2xl mb-3">{item.title}</h2>
                                <img className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg" src="https://picsum.photos/200/300" alt="User avatar" />
                                <p className="capitalize text-sm mt-1">{item.description}</p>
                                <p className="capitalize text-sm mt-1">{item.lastModified}</p>
                                <span className="flex items-center border rounded-full w-24 pr-2 justify-center mx-auto mt-2 mb-6"><div className="bg-green-400 rounded-full w-2.5 h-2.5 block mr-2"></div>Active</span>
                                <Link to={'/form/' + item._id} className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-sm text-white py-2 px-4 inline">Checkout</Link>
                            </div>
                        </div>
                    ))}



                </div>
            </div>
        </>
    )
}
