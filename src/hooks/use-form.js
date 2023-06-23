import { useCallback, useState } from "react";

export function useForm(inputValues={}) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (event) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };

    const resetForm = useCallback(() => {
        setValues({});
    }, [setValues]);

    return {values, handleChange, setValues, resetForm};
  }
  