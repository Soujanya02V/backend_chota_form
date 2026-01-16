import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");


    if (!token) {
      navigate("/admin");
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_URI}/admin/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/admin");
      });
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/admin/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");


      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert("Failed to delete contact");
    }
  };

  const filteredContacts = contacts.filter((contact) =>
  contact.name.toLowerCase().includes(search.toLowerCase()) ||
  contact.message.toLowerCase().includes(search.toLowerCase())
);


  if (loading) return <h2>Loading contacts...</h2>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <input
  type="text"
  placeholder="Search by name or message..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    marginBottom: "15px",
    padding: "8px",
    width: "300px",
  }}
/>

      {contacts.length === 0 ? (
        <p>No contact submissions found</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Message</th>
              <th>Submitted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.message}</td>
                <td>
                  {new Date(contact.createdAt).toLocaleString()}
                </td>
                <td>
                  <button
                    style={{ color: "red" }}
                    onClick={() => handleDelete(contact._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
