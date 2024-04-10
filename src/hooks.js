
import { useState } from "react"; 
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


// Step Four - useAxios in PokeDex and PlayingCardList...Init with baseUrl, returns [data, fn] to append data from `${baseUrl}${endpoint}` w/ unique ID
export const useAxios = (baseURL) => {
    const [data, setData] = useState([]);
    
    const addDataFromURL = async (endpoint = '') => {
        const response = await axios.get(`${baseURL}${endpoint}`);
        setData(currentData => [...currentData, {...response.data, id: uuidv4() }]);
    };

    return [data, addDataFromURL];
};