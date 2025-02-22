import { useEffect, useState } from "react";
import axios from 'axios';

export default function useBookSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [books, setBooks] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    useEffect(() =>{
        setBooks([]);
    }, [query]);
    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;

        axios({
            method: "GET",
            url: "https://openlibrary.org/search.json",
            params: { q: query, page: pageNumber }, 
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setBooks(prevBooks => {
                console.log(res.data);
                if (Array.isArray(res.data.docs)) {
                    return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])];
                } else {
                    console.error('res.data.docs is not an array');
                    return prevBooks;
                }
                
            });
            setHasMore(res.data.docs.length > 0); 
            setLoading(false); 
        }).catch(e => {
            if (axios.isCancel(e)) {
                return;
            }
            setError(true); 
            setLoading(false); 
        });

        return () => cancel();
    }, [query, pageNumber]);

    return { loading, error, books, hasMore }; 
}