import { useState } from "react";

function App(){
  const[name,setName] = useState("");
  const [message,setMessage] = useState();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const data = {
      name,
      message,
    };

    const response = await fetch("http://localhost:3000/contact",{
      method : "POST",
      headers:
      {
        "Content-Type" :"application/json",
      },
      body: JSON.stringify(data)


    });

    const result = await response.json();
    console.log(result);

  };

  return(
        <div style={{ padding: "20px" }}>
      <h1>React Contact Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Message</label>
          <br />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App;