import React from 'react'
import Constants from '../utilities/Constants';
import { useState } from 'react';

const UpdateForm = ({post, onPostUpdated}) => {
    
    const initialFormData = Object.freeze({
        title: post.title,
        content: post.content
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

        const postToUpdate = {
            postId: post.postId,
            title: formData.title,
            content: formData.content
        };

        const url = Constants.API_URL_UPDATE_POST;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(postToUpdate)
          }).then(response => response.json()).then(responseFromServer => {
            console.log(responseFromServer);
          }).catch((error) => {
            alert(error);
          });

          onPostUpdated(postToUpdate)
    }

  return (
    <form>
        <h1>Updating {post.title}</h1>

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
            <button onClick={() => onPostUpdated(null)}>Cancel</button>
        </div>
    </form>
  )
}

export default UpdateForm