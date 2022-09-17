import {useState, useEffect} from 'react';
export const useFetch = (url:string | null, options?: RequestInit) => {
    const [address, setUrl] = useState<string | null>(url);
    const [defaultOption, setOptions] = useState<RequestInit>(options ? {...options, credentials: 'include'} : {credentials: 'include'});
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<null | boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const setRequest = (url:string, options?: RequestInit) => {
        setOptions(options ? {...options, credentials: 'include'} : {credentials: 'include'})
        setUrl(url);
    }

    useEffect(() => {
        setData(null);
        setError(false);
        setLoading(false);
        (async()=> {
            try {
                setLoading(true);
                if (address) {
                    const response = await fetch(address, defaultOption);
                    const data = await response.json();
                    setData(data);
                    if (!response.ok) throw new Error();
                }
            } catch (err) {
                setError(true);
            }
            setLoading(false);
            setUrl(null);
        })();
        }, [address])
    return [data, loading, error, setRequest];
}