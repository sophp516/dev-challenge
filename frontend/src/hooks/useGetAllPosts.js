import { useEffect, useState } from 'react';

const useGetAllPosts = () => {
    const [allPosts, setAllPosts] = useState([]);
    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const res = await fetch('/api/recipe/getallposts');
                const data = await res.json();
                
                if (data.error) {
                    throw new Error(data.error)
                }
                setAllPosts(data);
            } catch (err) {
                console.log(err);
            }
        }
        getAllPosts();
    }, [])
    return { allPosts };
}

export default useGetAllPosts;
