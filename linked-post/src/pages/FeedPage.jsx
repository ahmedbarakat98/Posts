import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { getAllPostsApi } from "../services/postServices";
import Loading from "../components/Loading";
import CreatePost from "../components/CreatePost";

export default function FeedPage() {

  const [posts, setPosts] = useState([]);
  


  async function getPosts() {
    const response = await getAllPostsApi();
    setPosts(response.posts);

  }

  useEffect(() => {
    getPosts();
  }, []);


  return (
    <>
      <div className="w-8/12 md:w-4/12  mx-auto">
        <CreatePost callback={getPosts} />
        {posts?.length == 0 ? (
          <Loading />
        ) : (
          posts?.map((post) => (
            <Card key={post.id} post={post} commetLimit={1} />
          ))
        )}
      </div>
    </>
  );
}
