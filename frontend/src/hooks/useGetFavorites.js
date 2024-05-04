import { useEffect, useState } from 'react';

const useGetFavorites = () => {
    const [ favorites, setFavorites ] = useState([]);

    useEffect(() => {
        const getFavorites = async () => {
            try {
                const res = await fetch("api/user/getfavorites")
                const data = await res.json();

                if (data.error) throw new Error(data.error);
                setFavorites(data);
            } catch (err) {
                console.log(err);
            }
        }
        getFavorites();
    }, [])
    return { favorites}

}

export default useGetFavorites;
