import { useState } from "react";
import { nanoid } from "nanoid";
import moment from "moment";
import update from "../assets/iconsedit.svg";
import deleteSvg from "../assets/delete.svg";
import upArrow from "../assets/upArrow.svg";
import downArrow from "../assets/downArrow.svg";
// import { useEffect } from "react";

const Home = () => {
  const [inputInfo, setInputInfo] = useState([]);
  const [input, setInput] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [tab, setTab] = useState("All")

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!editTodoId){
      if (!input) {
        return;
      } else {
        setInputInfo((prevState) => {
          return [...prevState, modifyInput(input)];
        });
      }
      setInput("");
    } else{
      updateTodo(editTodoId, input)
    }
  };



  const updateTodo = (id, input) => {
    setInputInfo(prev => prev.map(task => {
      return task.id === id ? {...task, name: input} : task
  }))

  setInput('')
  setEditTodoId(null)
  }
  
  

  function modifyInput(input) {
    return {
      id: nanoid(),
      name: input,
      priority: 0,
      complete: false,
      time: moment().format("LT"),
    };
  }

  function handleEdit(id) {
    setEditTodoId(id)
    const findTodo = inputInfo.find((todo) => {
      return todo.id === id
    })
    setInput(findTodo.name)
  }

  const handleDelete = (id) => {
    const filtered = inputInfo.filter((todo) => {
      return todo.id !== id;
    });
    setInputInfo(filtered);
  };

  const handleIncrease = (id) => {
    
    setInputInfo(prev => prev.map(task => {
        return task.id === id ? {...task, priority: task.priority++} : task
    }))
    
    setInputInfo(prev => prev.sort((a, b) => {
      return b.priority - a.priority
    }))
  }

  const handleDecrease = (id) => {

    // for(let i = 0; i < inputInfo.length; i++){
    //   console.log(inputInfo[i].priority)
    //   if(inputInfo[i].priority < 0){
    //     console.log("do nothing")
    //   }
    // }
    setInputInfo(prev => prev.map(task => {
      return task.id === id ? {...task, priority: task.priority--} : task
  }))

    setInputInfo(prev => prev.sort((a, b) => {
      return b.priority - a.priority
    }))

  } 

  const handleCompleted = (id) => {
    setInputInfo(
      inputInfo.map((prev) => {
        if(prev.id === id){
          return {...prev, complete: !prev.complete}
        }
        return prev
      })
    )
  }

  const handleList = () => {
    if(tab === "active"){
      return inputInfo.filter((item) => {
        return item.complete === false
      })
    } else if (tab === "completed"){
      return inputInfo.filter((item) => {
        return item.complete === true
      })
    } else {
      return inputInfo
    }
  }
 
  return (
    <div>
      <form className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add task..."
        />
        <button className="dft-btn">Save</button>
      </form>

      {handleList().map((inputData) => (
        <div key={inputData.id} className="tab-Data">
          <div className="input-data">
            <input type="checkbox" checked={inputData.complete} onChange={() => handleCompleted(inputData.id)}/>
            <div className="check-Info">
              <h3 style={{textDecoration: inputData.complete ? "line-through" : "none"}}>{inputData.name}</h3>
              <p>Added {inputData.time}</p>
            </div>
          </div>
          <div className="images">
            <img src={update} alt="" onClick={() => handleEdit(inputData.id)}/>
            <img
              src={deleteSvg}
              alt=""
              onClick={() => handleDelete(inputData.id)}
            />
            <div className="enclosure">{inputData.priority}</div>
            <div className="arrows">
              <img src={upArrow} alt="" onClick={() => handleIncrease(inputData.id)}/>
              <img src={downArrow} alt="" onClick={() => handleDecrease(inputData.id)}/>
            </div>
          </div>
        </div>
      ))}

      <div className="footer">
        <h2 className={`footer-text ${tab === "All" ? "hover" : ""}`} onClick={() => setTab("All")}>All</h2>
        <h2 className={`footer-text ${tab === "active" ? "hover" : ""}`} onClick={() => setTab("active")}>Active</h2>
        <h2 className={`footer-text ${tab === "completed" ? "hover" : ""}`} onClick={() => setTab("completed")}>Completed</h2>
      </div>
    </div>
  );
};

export default Home;
