import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { getUserPostsApi } from "../services/postServices";
import Loading from "../components/Loading";
import { AuthContext } from "../contexts/AuthContext";

export default function ProfilePage() {

  
  const [posts, setPosts] = useState([]);
  const {userData}  = useContext(AuthContext);
  
  


  async function getPosts() {
    const response = await getUserPostsApi();
    setPosts(response.posts);}

  useEffect(() => {
    getPosts(userData?._id);
  }, []);


  return <>
      <div className="w-8/12 md:w-4/12  mx-auto">
        {posts?.length == 0 ? (
          <Loading />
        ) : (
          posts?.map((post) => (
            <Card key={post.id} post={post} commetLimit={post.comments.length} />
          ))
        )}
      </div>
    </>
}
