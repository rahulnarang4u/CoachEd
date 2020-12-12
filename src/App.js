import './App.css';
import React,{useState,useEffect} from 'react';
import Axios from 'axios';




function App() {
  const [value,setValue] = useState("")
  const [page,setPage] = useState(1)
  const [results,setResults] = useState([])
  var [counter, setCounter] = React.useState(5);
  const handleSubmit= ()=>{
    const url = "https://api.unsplash.com/search/photos?client_id=7D7u3CPCjjKKqHEGxQEtP3EtMCut41wiPsMsG7BSJqI&query="+value+"&page="+page;
    Axios.get(url)
    .then((Response)=>{
    console.log(Response);
    setResults(Response.data.results);
  })
  }
  function handleChange(event){
    setValue(event.target.value);
  }

  const [didClickButton, setDidClickButton] = useState(false)

  useEffect(() => {
  if (didClickButton) {
    if(counter== 0){
      setPage(page+1);
      handleSubmit();
      setResults([]);
      setDidClickButton(false);
      return setCounter(5);
    }else{
      console.log("YEs");
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
    }
  }
}, [didClickButton,handleSubmit]);

const buttonClickHandler = () => {
  setDidClickButton(true)
}
  return (

    <div className="App">
      <div className="mydiv"><span>Photo Picker</span></div>
      <div className= "mydiv">
        <span>Search</span>
        <input className= "css-input"
        style = {{width: "60%"}}
        type= "text" name="value" onChange= {handleChange}/>
        <button className= "BUTTON_JQG" onClick= {handleSubmit}>Go!</button>
      </div>
      <div className= "mydiv">
        <input className= "css-input"
        style = {{width: "10%"}}
        type= "text" value= {counter} onChange= {handleChange}/>
        <button className= "BUTTON_JQG" onClick= {buttonClickHandler}>COUNTDOWN</button>
      </div>
      <div className= "gallery">
      {
        results.map((item)=>{
          return <img className="item" key={item.id} src= {item.urls.regular}/>
        })
      }
    </div>
    </div>
  );
}


export default App;
//https://api.unsplash.com/photos/?client_id=7D7u3CPCjjKKqHEGxQEtP3EtMCut41wiPsMsG7BSJqI