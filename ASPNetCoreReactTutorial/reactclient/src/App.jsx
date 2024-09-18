import { useState } from "react";
import "./App.css";
import CustomTable from "./components/CustomTable";
import Constants from "./utilities/Constants";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";

function App() {
  const [posts, setPosts] = useState([]);
  const [showingCreateNewPost, setShowingCreateNewPost] = useState(false);
  const [postUpdated, setPostUpdated] = useState(null);

  function deletePost(postId) {
    const url = `${Constants.API_URL_DELETE_POST_BY_ID}/${postId}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        onPostDeleted(postId);
      })
      .catch((error) => {
        alert(error);
      });
  }

  const getPostsFromServer = () => {
    const url = Constants.API_URL_GET_ALL_POSTS;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((postsFromServer) => {
        setPosts(postsFromServer);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onPostCreated = (createdPost) => {
    setShowingCreateNewPost(false);
    if (createdPost === null) {
      return;
    }

    alert(`Post successfully created!. Title is "${createdPost.title}"`);

    getPostsFromServer();
  };

  const onPostUpdated = (updatedPost) => {
    setPostUpdated(null);

    if (updatedPost === null) {
      return;
    }

    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.postId === updatedPost.postId) {
        return true;
      }
    });
    if (index !== -1) {
      postsCopy[index] = updatedPost;
    }

    setPosts(postsCopy);

    alert(`Post updated! Info is title: ${updatedPost.title}`);
  };

  const onPostDeleted = (deletedPostId) => {
    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.postId === deletedPostId) {
        return true;
      }
    });
    if (index !== -1) {
      postsCopy.splice(index, 1);
    }

    setPosts(postsCopy);

    alert(`Post deleted!`);
  };

  return (
    <>
      {showingCreateNewPost === false && postUpdated === null && (
        <>
          <h1>ASP .NET and React</h1>
          <div className="flex">
            <button
              onClick={getPostsFromServer}
              style={{
                marginBottom: "20px",
              }}
            >
              Get Posts
            </button>
            <button
              onClick={() => setShowingCreateNewPost(true)}
              style={{
                marginBottom: "20px",
              }}
            >
              Create New Post
            </button>
          </div>
        </>
      )}

      {posts.length > 0 &&
        showingCreateNewPost === false &&
        postUpdated === null && (
          <CustomTable
            posts={posts}
            setPostUpdated={setPostUpdated}
            deletePost={deletePost}
          />
        )}

      {showingCreateNewPost && <CreateForm onPostCreated={onPostCreated} />}
      {postUpdated !== null && (
        <UpdateForm post={postUpdated} onPostUpdated={onPostUpdated} />
      )}
    </>
  );
}

export default App;
