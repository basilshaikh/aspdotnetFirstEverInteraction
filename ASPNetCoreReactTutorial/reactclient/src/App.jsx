import { useState } from 'react';
import './App.css';
import CustomTable from './components/CustomTable';

function App() {
  const [posts, setPosts] = useState([]);

  const getPostsFromServer = () => {
    const url = "https://localhost:7076/get-all-posts";

    fetch(url, {
      method: 'GET',
    }).then(response => response.json()).then(postsFromServer => {
      console.log(postsFromServer);
      setPosts(postsFromServer);
    }).catch((error) => {
      alert(error);
    })
  }

  return (
   <>

    <button onClick={getPostsFromServer} style={{
      marginBottom: '20px'
    }}>Get Posts</button>
    <CustomTable posts={posts}/>
   </>
  )
}

export default App
