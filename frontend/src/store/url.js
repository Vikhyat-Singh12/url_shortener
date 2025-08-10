import {create} from 'zustand';
import axios from '../lib/axios';
import {toast} from 'react-hot-toast'


const useUrlStore = create((set) => ({
    urls: [],
    shortenUrl:"",
    getUrls: async () => {
        try {
            const res = await axios.get('/urls');
            set({ urls: res.data });
        } catch (err) {
            console.log(err);
        }
    },
    getshortenUrl: async (url) => {
        try {
            const res = await axios.post('/shorten', { originalUrl: url });
            set({ shortenUrl: res.data.shortUrl });
            toast.success('URL Shortened Successfully')
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong')
        }
    },
}));

export default useUrlStore