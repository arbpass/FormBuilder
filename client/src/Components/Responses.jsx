import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


export const Responses = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;
    const { id } = useParams();

    useEffect(() => {
        getForms();
    }, []);

    const getForms = async () => {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/dashboard/form/responses/${id}`, {
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
    // console.log(data)

    return (
        <>
            <div class="max-w-2xl mx-auto my-4">

                <div class="flex flex-col">
                    <div class="overflow-x-auto shadow-md sm:rounded-lg">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden ">
                                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                    <thead class="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Sr.No.
                                            </th>
                                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                User
                                            </th>
                                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Question & Answer
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {data.map((item, index) => (
                                            <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td class="p-4 w-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {index+1}
                                                </td>
                                                <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.user}</td>
                                                {item.fields.map((i2, index2) => (
                                                    <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{index2+1}.  {i2.question}</td>
                                                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{i2.answer}</td>
                                                    </tr>
                                                ))}
                                            </tr>
                                            
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
