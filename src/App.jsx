import { useState, useEffect } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("agenda-contacte");
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("agenda-contacte", JSON.stringify(contacts));
    }
  }, [contacts]);

  function handleAdd() {
    if (!name.trim() || !phone.trim()) {
      setError("Completati ambele campuri.");
      return;
    }

    const newContact = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
    };

    setContacts([...contacts, newContact]);
    setName("");
    setPhone("");
    setError("");
  }

  function handleDelete(id) {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    localStorage.setItem("agenda-contacte", JSON.stringify(updated));
  }

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "0 16px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: "24px" }}>Agendă Telefonică</h1>

      <div style={{ marginBottom: "32px", border: "1px solid #ccc", padding: "16px", borderRadius: "4px" }}>
        <h2 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px" }}>Adaugă contact</h2>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>Nume:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Ion Popescu"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>Număr de telefon:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ex: 0722 123 456"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: "12px", fontSize: "14px" }}>{error}</p>
        )}

        <button
          onClick={handleAdd}
          style={{
            padding: "8px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Salvează
        </button>
      </div>

      <div>
        <h2 style={{ marginBottom: "12px", fontSize: "18px" }}>
          Contacte ({contacts.length})
        </h2>

        {contacts.length === 0 ? (
          <p style={{ color: "#666" }}>Nu există contacte salvate.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {contacts.map((contact) => (
              <li
                key={contact.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  marginBottom: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <div>
                  <strong>{contact.name}</strong>
                  <span style={{ marginLeft: "12px", color: "#555" }}>{contact.phone}</span>
                </div>
                <button
                  onClick={() => handleDelete(contact.id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Șterge
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;