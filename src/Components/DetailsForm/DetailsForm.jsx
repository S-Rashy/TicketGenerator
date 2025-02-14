import { useState, useEffect } from "react";
import "./DetailsForm.css";
import uploadIcon from "../../assets/uploadIcon.svg";
import ProgressBar from "../../Reuseables/ProgressBar/ProgressBar";

const DetailsForm = ({ goBack, goNext }) => {

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  
  const [yourname, setYourname] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [info, setInfo] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("userDetails");
    if (savedData) {
      setInfo(JSON.parse(savedData));
    }
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setErrors((prev) => ({ ...prev, imageUrl: "" }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    setImageUrl(data.secure_url);
  };

  const postData = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!imageUrl) newErrors.imageUrl = "Profile photo is required";
    if (!yourname) newErrors.yourname = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Enter a valid email address";
    }
        
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newEntry = { yourname, email, request, imageUrl };

    setInfo((prevInfo) => {
      const updatedInfo = [...prevInfo, newEntry];
      localStorage.setItem("userDetails", JSON.stringify(updatedInfo));
      return updatedInfo;
    });
    setTimeout(() => {
      goNext();
    }, 200);

    setYourname("");
    setEmail("");
    setRequest("");
    setImageUrl("");
    setErrors({});
  };

  return (
    <div className="detailsContainer">
      <div className="topText">
        <h2>Attendee Details</h2>
        <p>Step 2/3</p>
      </div>

      <ProgressBar step="66" />

      <form onSubmit={postData}>
        <div className="photoUpDiv">
          <p id="uploadText"> Upload Profile Photo</p>
          <div className="photoDiv">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              
              // required
            />
            <br />

            <label htmlFor="fileInput" id="imgInput">
              {imageUrl ? (
                <img src={imageUrl} alt="Uploaded" width="240px" />
              ) : (
                <div className="newUpload">
                  <img src={uploadIcon} alt="" />
                  <p>Drag & drop or click to upload</p>
                </div>
              )}
            </label>
            {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
          </div>
        </div>

        <hr />

        <label htmlFor="yourname">Enter your name</label> <br />
        <input
          name="yourname"
          id="yourname"
          value={yourname}
          onChange={(e) => {
            setYourname(e.target.value);
            setErrors((prev) => ({ ...prev, yourname: "" })); 
          }}          // required
        />
        <br />

        {errors.yourname && <p className="error">{errors.yourname}</p>}

        <label htmlFor="email">Enter your email*</label> <br />
        <input
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);  
            setErrors((prev) => ({ ...prev, email: "" }))
        }}
          // required
        />
        <br />
        {errors.email && <p className="error">{errors.email}</p>}


        <label htmlFor="request">Special request ?</label> <br />
        <textarea
          name="request"
          id="request"
          value={request}
          maxLength={150}
          onChange={(e) => setRequest(e.target.value)}
          // required
        />
        <br />


        <div className="buttons">
          <button type="button" onClick={goBack} className="backBtn">
            Back
          </button>
          <button type="submit" className="ticketBtn">
            Get My Free Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailsForm;
