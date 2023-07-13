
import Digit from './components/Digit';
import Operation from './components/Operation';
import React, {useState, useEffect} from 'react';
function App() {
  
  const oper=["+", "-", "x", "/"];
  const[state, setState] =useState({
    number:"",
    currentValue:"",
    numberArray:[],
    operationArray: [], 
    equation:[]
  });
  const [final, setFinal] = useState("");
  useEffect(()=>{
    console.log(state.number);
    console.log(state.currentValue);
    console.log(state.numberArray);
    console.log(state.operationArray);
    console.log(state.operation);
  }, [state.numberArray, state.currentValue, state.operationArray, state.operation, state.number])
  const handleDEL =(e)=>{
    e.preventDefault();
    if(state.equation.length===0){
      return;
    }
    if(state){
      if(oper.includes(state.currentValue)){
        setState((state)=>{return({
          operationArray: [...state.operationArray.slice(0, state.operationArray.length -1)],
          equation: [...state.equation.slice(0, state.equation.length -1)], 
          currentValue: state.equation[state.equation.length -2],
          number: oper.includes(state.equation[state.equation.length -2]) ? "":state.numberArray[state.numberArray.length -1],
          numberArray: [...state.numberArray.slice(0, state.numberArray.length-1)]

        })})
      }
      else {
        setState((state)=>{
          return({
            equation: [...state.equation.slice(0, state.equation.length -1)], 
            currentValue: state.equation[state.equation.length -2],
            numberArray: state.numberArray,
            number: state.number?.length >0 ? state.number.slice(0, state.number.length-1):"",
            operationArray: state.operationArray

          })
        })
      }
    }
    else{
      return state;
    }
  }
  const handleAC =(e)=>{
    e.preventDefault();
    setState({number:"",
    currentValue:"",
    numberArray:[],
    operationArray: [], 
    equation:[]});
    setFinal("");
  }
  
  const handleResult = (e) => {
    e.preventDefault();
    
    const { numberArray, operationArray, equation } = state;
    numberArray.push(state.number);

  
    if (oper.includes(equation[equation.length - 1])) {
      return alert("Invalid equation!!");
    }
    else if(state.operationArray.length ===0){
      return;
    }
  
    const numbers = numberArray.map((num) => parseFloat(num));
    const operators = [...operationArray]; // Create a copy of the operationArray
  
    const calculate = (a, b, operator) => {
      switch (operator) {
        case "x":
          return a * b;
        case "/":
          return a / b;
        case "+":
          return a + b;
        case "-":
          return a - b;
        default:
          return 0;
      }
    };
  
    while (operators.length > 0) {
      const operatorIndex = operators.findIndex((op) => op === "*" || op === "/");
      if (operatorIndex !== -1) {
        const result = calculate(numbers[operatorIndex], numbers[operatorIndex + 1], operators[operatorIndex]);
        numbers.splice(operatorIndex, 2, result);
        operators.splice(operatorIndex, 1);
      } else {
        const result = calculate(numbers[0], numbers[1], operators[0]);
        numbers.splice(0, 2, result);
        operators.splice(0, 1);
      }
    }
    
  
    setFinal(numbers[0].toString());
    setState({
      number:"",
      currentValue:"",
      numberArray:[],
      operationArray: [], 
      equation:[...state.equation,"=", numbers[0].toString()]
    })
  };
  
  


  
  return (
    <div className="App">
      <h1>CALCULATOR</h1>
      <div className="calculator">
        <div className="screen">
          <p>{state.equation.join("")}</p>
          <h3>{final ? final :(state.number? state.number:state.currentValue)}</h3>

        </div>
          <button onClick={handleAC} className="span-col-2">AC</button>

          <Operation oper={oper} op="/" state={state} setState={setState}/>
          <Operation oper={oper} op="x" state={state} setState={setState}/>
          <Digit d="7" state={state} setState={setState} />
          <Digit d="8" state={state} setState={setState}/>
          <Digit d="9" state={state} setState={setState}/>
          <Operation oper={oper} op="-" state={state} setState={setState}/>
          <Digit d="4" state={state} setState={setState}/>
          <Digit d="5" state={state} setState={setState}/>
          <Digit d="6" state={state} setState={setState}/>
          <Operation oper={oper} op="+" state={state} setState={setState}/>
          <Digit d="1" state={state} setState={setState}/>
          <Digit d="2" state={state} setState={setState}/>
          <Digit d="3" state={state} setState={setState}/>
          <button onClick={handleResult} className="span-row-2">=</button>
          <Digit d="." state={state} setState={setState}/>
          <Digit d="0" state={state} setState={setState}/>
          <button onClick={handleDEL} >DEL</button>
        </div>
      <footer>by Thi Huyen Hoang</footer>

      </div>

  );
}

export default App;
