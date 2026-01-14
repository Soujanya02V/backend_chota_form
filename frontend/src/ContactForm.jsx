import { useState } from "react";

function ContactForm(){
  const[name,setName] = useState("");
  const [message,setMessage] = useState();
  const[success,setSuccess] = useState();
  const[error,setError] = useState();
  

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setSuccess("");
    setError("")
    const data = {
      name,
      message,
    };

     try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/contact`,{
      method : "POST",
      headers:
      {
        "Content-Type" :"application/json",
      },
      body: JSON.stringify(data)


    });

    if(!response.ok){
      throw new Error("something went wrong");
    }

    const result = await response.json();
    console.log(result);

    setSuccess("data submitted succeessfully");
    setName("");
    setMessage("");

  }catch(err){
    setError("failed to submit !! try again")
  }
  };

  return(
        <div style={{ padding: "20px" }}>
      <h1>React Contact Form</h1>
        {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
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

export default ContactForm;