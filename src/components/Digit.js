function Digit({state, setState, d}){
    const handleClickDigit=(e)=>{
        e.preventDefault();
        if(d==="." && state.number.includes(".")){
            return state;

        }
        else {
        setState((state)=>{
          return({
            ...state, 
            number: `${state.number}${d}`,
            currentValue: d,
            equation: [...state.equation, d]
          })
        })}
      }
    return <button onClick={handleClickDigit}>{d}</button>

}
export default Digit;