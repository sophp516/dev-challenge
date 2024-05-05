import { useEffect, useState } from 'react';

const useGetFavorites = () => {
    const [ favorites, setFavorites ] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getFavorites = async () => {
            try {
                setLoading(true);
                const res = await fetch("api/user/getfavorites")
                const data = await res.json();

                if (data.error) throw new Error(data.error);
                setFavorites(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getFavorites();
    }, [])
    return { favorites, loading }

}

export default useGetFavorites;
