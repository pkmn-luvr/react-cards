
import { useState, useEffect } from "react"; 
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; 

// Step Two - useFlip: holds business logic for flipping any type of card
export function useFlip() {
    const [isFlipped, setIsFlipped] = useState(true); // Cards are facing up by default
    const toggleFlip = () => setIsFlipped(!isFlipped);

    return [isFlipped, toggleFlip];
};

// Step Three - useAxios: takes in a URL and returns an array with two elements. The first element is an array of data obtained from previous AJAX requests, the second element is a function that will add a new object of data to our array
// export const useAxios = (url) => {
//     const [data, setData] = useState([]);
    
//     const addDataFromURL = async () => {
//         const response = await axios.get(url);
//         setData(currentData => [...currentData, {...response.data, id: uuidv4() }]);
//     };

//     return [data, addDataFromURL];
// };

// Further Study #2 - syncs to local storage after every state change
function useLocalStorage(key, initialValue) {
    const storedValue = JSON.parse(localStorage.getItem(key));
    const [value, setValue] = useState(storedValue || initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue]; 
}

// Step Four - useAxios in PokeDex and PlayingCardList...Init with baseUrl, returns [data, fn] to append data from `${baseUrl}${endpoint}` w/ unique ID
// Further Study #1 - Added format function that extracts only the information we need to render our components
export const useAxios = (baseURL, formatFunc) => {
    const [data, setData] = useLocalStorage(`axios-data-${baseURL}`, []);
    
    const addDataFromURL = async (endpoint = '') => {
        const response = await axios.get(`${baseURL}${endpoint}`);
        // Apply the formatting function to the response data
        const formattedData = formatFunc ? formatFunc(response.data) : response.data;
        setData(currentData => [...currentData, { ...formattedData, id: uuidv4() }]);
    };

    return [data, addDataFromURL];
};