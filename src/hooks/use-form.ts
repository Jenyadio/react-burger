import { useCallback, useState, ChangeEvent } from "react";

type InputValues = {
  name?: string;
  email?: string;
  password?: number;
}

export function useForm(inputValues={}) {
    const [values, setValues] = useState<InputValues>(inputValues);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };

    const resetForm = useCallback(() => {
        setValues({});
    }, [setValues]);

    return {values, handleChange, setValues, resetForm};
  }
  