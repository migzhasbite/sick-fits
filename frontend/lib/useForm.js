import { useEffect, useState } from "react"

export default function useForm(initial = {}) {
    //create a state object for our inputs
    const [inputs, setInputs] = useState(initial)
    const initialValues = Object.values(initial).join('')

useEffect(()=> {
    //This function runs when the things we are wathcing change
setInputs(initial);
},[initialValues]);
    
    function handleChange(e) {
        let {value, name, type, files} = e.target;
        if(type==='number'){
            value = parseInt(value)

        }
        if (type ==='file'){
            [value] = e.target.files
        }
        setInputs({
            //copy existing state
            ...inputs,
            [name]: value,
        })
    }

    function resetForm(){
        setInputs(initial);
    }

    function clearForm(){
        const blankState = Object.fromEntries(
            Object.entries(inputs)
            .map(([key,value]) => [key,''])
            );
        setInputs(blankState)
        }
    //return things we want from custom hook
    return {
        inputs,
        handleChange,
        resetForm,
        clearForm
    }
};
