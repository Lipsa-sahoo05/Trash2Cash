import { useState } from "react";
import "./Control.css";

function Control() {
  const [formData, setFormData] = useState({
    collector_id: "",
    weight: "",
    volume: "",
    grade: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/submit-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("Flask response:", data);

      if (data.status === "success") {
        setStatus(`Data submitted Successfully!!!`);
        setTimeout(() => {
          setStatus("");
          setFormData({ collector_id: "", weight: "", volume: "", grade: "" });
        }, 3000);
      } else {
        setStatus("Error submitting data ❌");
      }
    } catch (err) {
      setStatus("Error submitting data ❌");
    }
  };

  return (
    <div className="control-page">
      {/* Page Header */}
      <div className="collector-info">
        <h1>Collector Dashboard</h1>
        <p>Enter today's collected waste data</p>
      </div>

      {/* Flex Container: Form + Reference Table */}
      <div className="control-flex">
        {/* Form Card */}
        <div className="control-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>ID</label>
              <input
                type="text"
                name="collector_id"
                value={formData.collector_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>VOLUME (kg)</label>
              <input
                type="number"
                name="volume"
                value={formData.volume}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
  <label>Grade</label>
  <select
    name="grade"
    value={formData.grade}
    onChange={handleChange}
    required
  >
    <option value=""disabled>Select Grade</option>
    <option value="A+">A+</option>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
    <option value="D">D</option>
    <option value="E">E</option>
    <option value="F">F</option>
    
  </select>
</div>


            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>

          {status && <p style={{ textAlign: "center", marginTop: "1rem" }}>{status}</p>}
        </div>

        {/* Reference Box as Table */}
        <div className="reference-box">
          <h2>Plastic Grades</h2>
          <table className="grades-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PET</td>
                <td>A+</td>
              </tr>
              <tr>
                <td>HDPE</td>
                <td>A</td>
              </tr>
              <tr>
                <td>PVC</td>
                <td>B</td>
              </tr>
              <tr>
                <td>LDPE</td>
                <td>C</td>
              </tr>
              <tr>
                <td>PP</td>
                <td>D</td>
              </tr>
              <tr>
                <td>PS</td>
                <td>E</td>
              </tr>
              <tr>
                <td>Others</td>
                <td>F</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Control;
