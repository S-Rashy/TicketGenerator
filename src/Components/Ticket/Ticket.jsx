import { useEffect, useState } from "react";
import "./Ticket.css";
import BarCode from "../../assets/BarCode.svg";
import ProgressBar from "../../Reuseables/ProgressBar/ProgressBar";

const Ticket = ({  restart }) => {
  const [savedInfo, setSavedInfo] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("userDetails");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSavedInfo(parsedData[parsedData.length - 1]);
    }
  }, []);

  return (
    <div className="ticketContainer">
      <div className="topText">
        <h2>Ready</h2>
        <p>Step 3/3</p>
      </div>

      <ProgressBar step="99" />

      <div className="booked">
        <h3> Your Ticket is Booked!</h3>
        <p>You can download or check your email for a copy </p>
      </div>
      <div className="ticketbg">
        <div className="ticketDiv">
          <div className="deets">
            <h3>Techember Fest "25</h3>
            <p> 📍 04 Rumens road, Ikoyi, Lagos</p>
            <p>📅 March 15, 2025 | 7:00 PM</p>
          </div>

          {savedInfo ? (
          <div>
            {savedInfo.imageUrl ? ( <img src={savedInfo.imageUrl} alt="Profile" id="imageUrl" />) : ( <p>No image available</p>  )}
            <div className="ticketInfo">
              <div>
                <p>Name</p>
                <h4>{savedInfo.yourname}</h4>
              </div>

              <div>
                <p>Email</p>
                <h4>{savedInfo.email}</h4>
              </div>

              <div>
                <p>Ticket Type:</p>
                <h4>VIP</h4>
              </div>

              <div>
                <p>Ticket for:</p>
                <h4>1</h4>
              </div>

              <div>
                <p>Special request</p>
                <p>{savedInfo.request}</p>
              </div>
              
            </div>
          </div>
          ) : ( <p>Please enter your details</p>
          )}
        </div>

        <div className="barCode">
          <img src={BarCode} alt="Bar Code" />
        </div>
      </div>

      <div className="buttons">
        <button onClick={restart} id="bookBtn" className="transparentBtn">
          Book Another Ticket
        </button>
        <button id="downloadBtn" className="blueBtn">Download Ticket</button>
      </div>
    </div>
  );
};

export default Ticket;
