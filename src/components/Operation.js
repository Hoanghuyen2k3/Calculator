function Operation({op,oper, state, setState}){
    const handleClickOperation=(e)=>{
        e.preventDefault();
        if(oper.includes(state.equation[state.equation.length-1])){
            return state;
        }
        else if(state.equation.length ===0){
            return state;
        }
        else{
        setState((state)=>{
          return({
            ...state,
            numberArray:[...state.numberArray, state.number],
            number: "",
            currentValue: op,
            equation: [...state.equation, op], 
            operationArray: [...state.operationArray, op]
          })
        })}
      }
    return <button onClick={handleClickOperation}>{op}</button>

}
export default Operation;