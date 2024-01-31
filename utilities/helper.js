export const updateState = (key, value, setForm, setError =null) => {
    setForm((prev)=> {
        return {...prev, [key]: value};
    });
    if(setError){
        setError((prev) => {
            return {...prev, [key] : ''};
        });
    }
};