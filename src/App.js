import './App.css'
import { api } from './API/api.js';
import { useState, useEffect } from 'react';


function App() {
  const [number, setNumber] = useState([]);
  const [task, setTask] = useState([]);
  const [Num, setNum] = useState([]);
  const [Str, setStr] = useState([]);
  const [List, setList] = useState([]);
  const [Arr, setArr] = useState([]);
  const [Arr2, setArr2] = useState([]);
  const [Arr3, setArr3] = useState([]);



  useEffect(() => {
    api.get('/task/1').then((res)=> {
      console.log(res.data);
      setNumber(res.data.number);
      setTask(res.data.task);
    })
  }, []);

  function task2(Num){
    api.post('/task/2',{number: Num}).then((res)=>{console.log(res.data)});
  }

  function task3(str){
    api.post(`/task/3/${str}`,{string: Str}).then((res)=>{console.log(res.data)});
  }

  function task4(str, num){
    api.post(`/task/4/${Str}`,{
      string: Str,
      number: Num
    }).then((res)=>{console.log(res.data)});
  }

  useEffect(() => {
    api.get('/task/5/list').then((res)=> {
      console.log(res.data);
      setList(res.data.list);
    })
  }, []);

  function task5_2(Num){
    api.get('/task/5',{
      params: {id: Num}
    }).then((res)=>{
      console.log(res.data);
      setArr(res.data.list)
    });
  }

  useEffect(() => {
    api.get('/task/6').then((res)=> {
      console.log(res.data.list);
      setArr2(res.data.list);
    })
  }, []);

  useEffect(() => {
    api.get('/task/7').then((res)=> {
      console.log(res.data.list);
      setArr3(res.data.list);
    })
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        Tasks
      </header>

      <p>{number} , {task}</p>

      <div className='inputForm'>
        <input placeholder="Number" onChange={(e)=> setNum(e.target.value)}/>
        <button type="button" onClick={()=> {
          task2(Num);
        }}>Отправить</button>
      </div>
      <br/>

      <div className='inputForm'>
        <input placeholder="String" onChange={(e)=> setStr(e.target.value)}/>
        <button type="button" onClick={()=> {
          task3(Str);
        }}>Отправить</button>
      </div>
      <br/>

      <div className='inputForm'>
        <button type="button" onClick={()=> {
          task4(Str,Num);
        }}>Отправить 4-ый постзапрос</button>
      </div>

      <p>{Object.entries(List).map(([key, value]) => <li key={key} >{value}</li> )}</p>

      <div className='inputForm'>
        <input placeholder="id" onChange={(e)=> setNum(e.target.value)}/>

        <button type="button" onClick={()=> {
          task5_2(Num);
        }}>Отправить</button>{' '}<output className='output'>{Arr[Num]}</output>
      </div>

      <p>{Arr2.map((value)=> value+' ')}</p>

      <p>{Arr3.map((value)=> value+' ')}</p>
    </div>
  );
}

export default App;
