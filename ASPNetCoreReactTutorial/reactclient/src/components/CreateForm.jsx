import React from 'react'
import Constants from '../utilities/Constants';
import { useState } from 'react';

const CreateForm = ({onPostCreated}) => {
    
    const initialFormData = Object.freeze({
        title: "Post x",
        content: "This is post x"
    });

    const [formData, setFormData] = useState(initialFormData);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,

        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const postToCreate = {
            postId: 0,
            title: formData.title,
            content: formData.content
        };

        const url = Constants.API_URL_CREATE_POST;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(postToCreate)
          }).then(response => response.json()).then(responseFromServer => {
            console.log(responseFromServer);
          }).catch((error) => {
            alert(error);
          });

          onPostCreated(postToCreate)
    }

  return (
    <form>
        <h1>Create form</h1>

        <div className='flex'>
            <label>Post Title</label>
            <input type="text" value={formData.title} name='title' onChange={handleChange} />
        </div>
        <br />
        <div className='flex'>
            <label>Post Content</label>
            <input type="text" value={formData.content} name='content' onChange={handleChange} />
        </div>
        <div className='flex' style={{marginTop: '20px'}}>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => onPostCreated(null)}>Cancel</button>
        </div>
    </form>
  )
}

export default CreateForm