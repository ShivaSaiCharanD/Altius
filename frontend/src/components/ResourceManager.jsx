import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ResourceManager() {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({ name: "", author: "", rate: "", description: "", rating: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/resources");
      setResources(res.data);
    } catch {
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/resources/${editingId}`,
          { ...form },
          { headers: { Authorization: token } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/resources/",
          { ...form },
          { headers: { Authorization: token } }
        );
      }
      setForm({ name: "", author: "", rate: "", description: "", rating: "" });
      setEditingId(null);
      await fetchResources();
    } catch (err) {
      console.error("Error saving resource:", err);
    }
    setLoading(false);
  };

  const handleEdit = (resource) => {
    setForm({
      name: resource.name || "",
      author: resource.author || "",
      rate: resource.rate || "",
      description: resource.description || "",
      rating: resource.rating || "",
    });
    setEditingId(resource._id);
  };

  const handleCancel = () => {
    setForm({ name: "", author: "", rate: "", description: "", rating: "" });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/resources/${id}`, {
        headers: { Authorization: token },
      });
      await fetchResources();
    } catch (err) {
      console.error("Error deleting resource:", err);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Resources</h2>
      {loading && <div className="alert alert-info">Loading...</div>}
      <ul className="list-group mb-4">
        {resources.map((r) => (
          <li key={r._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <b>{r.name}</b> by {r.author} (Rate: {r.rate}, Rating: {r.rating})
            </span>
            <div>
              <button
                onClick={() => handleEdit(r)}
                className="btn btn-sm btn-primary me-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r._id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3>{editingId ? "Edit Resource" : "Add Resource"}</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-4">
          <input
            name="name"
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            name="author"
            className="form-control"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            name="rate"
            className="form-control"
            placeholder="Rate"
            type="number"
            value={form.rate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            name="description"
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            name="rating"
            className="form-control"
            placeholder="Rating"
            type="number"
            value={form.rating}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success me-2" disabled={loading}>
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}