import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [curr, setCurr] = useState(1)

  useEffect(()=>{
    if(curr <= 1){
      document.querySelector(".prev").style.display  = "none"; 
    }
    else{
      document.querySelector(".prev").style.display  = "block"; 
    }
  }, [curr])


  async function fetchData(limit, offset){
    let url  = "https://dummyjson.com/products?limit=" + limit + "&skip=" + offset
    console.log(url)
    var res = await fetch(url);

    if(!res.ok){
      throw Error("error in fetching data +++++");
    }
    res = await res.json();

    // console.log(res)
    setData(res.products);
  }

  useEffect(()=>{
    fetchData(limit, offset);

    // document.querySelector(".btn").addEventListener("click", (e)=>{
    //   console.log(e.target.value)
    //   handleClick(e);
    // })

  }, [offset])

  function handleClick(e){

    console.log(e.target.value)
    // console.log(curr)

    if(e.target.value === "next"){
      setCurr(parseInt(curr + 1));
      console.log("next ++++++++++");
      // console.log(curr);
      // offsetVal = curr*limit + 1;
    }
    else if(e.target.value === "prev"){
      setCurr(curr - 1);
      console.log("prev ++++++++++");
      // console.log(parseInt(curr));
      // offsetVal = curr*limit + 1;
    }
    else{
      console.log("num +++++++++")
      setCurr(parseInt(e.target.value));
    }
    let offsetVal = parseInt(curr)*limit + 1
    console.log(offsetVal)
    setOffset(offsetVal)

  }



  return (
    <div className="App">
      
      {/* {console.log(data)} */}
      {data.map((prod)=>{
        // console.log(prod)
        return <div>{prod.title}</div>
      })}

      <div className='pagination_div'>
        <button className='prev btn' value="prev" onClick={handleClick}>Prev</button>
        {
        Array.from({ length: 10 }).map((_, index) => {
          return <button key={index} className= {(index + 1 === curr) ? "selected num btn" : "num btn"} value={index + 1} onClick={handleClick}>{index + 1}</button>
        })
        }
        
        <button className='next btn' onClick={handleClick} value="next" >Next</button>
      </div>
    </div>
  );
}

export default App;
