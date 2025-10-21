// src/pages/Application.jsx
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();
  const fileRef = useRef();

  // Redirect safely in effect
  useEffect(() => {
    if (!isAuthorized || (user && user.role === "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PDF, JPG, or PNG files are allowed!");
        e.target.value = ""; // reset invalid file selection
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size must be under 5MB!");
        e.target.value = "";
        return;
      }

      setResume(file);
    }
  };

  // Submit form
  const handleApplication = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload your resume!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume); // MUST match multer field name
    formData.append("jobId", id);

    // Debug: inspect formData in console
    console.log("Submitting application. resume state:", resume);
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true, // keep if you use cookies; otherwise remove
          // axios will set Content-Type header with boundary automatically
        }
      );

      // Clear inputs + file input DOM
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      if (fileRef.current) fileRef.current.value = "";

      toast.success(data.message || "Application submitted successfully!");
      navigateTo("/job/getall");
    } catch (error) {
      console.error("Upload error full:", error);
      console.error("Upload error response data:", error?.response?.data);
      const msg = error?.response?.data?.message || "Failed to upload file!";
      toast.error(msg);
    }
  };

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <textarea
            placeholder="Cover Letter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "18px" }}
            >
              Select Resume (PDF, JPG, PNG)
            </label>
            <input
              ref={fileRef}
              type="file"
              name="resume"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;
