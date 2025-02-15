import { useState } from "react";
import DetailsForm from "../DetailsForm/DetailsForm";
import Ticket from "../Ticket/Ticket";
import TypeProp from "../../Reuseables/TypeProps/Typeprop";
import "./Selection.css";
import ProgressBar from "../../Reuseables/ProgressBar/ProgressBar";

const Selection = () => {
const [page, setPage] = useState("Selection");
const [selectedTicket, setSelectedTicket] = useState(null); 
const [error, setError] = useState(""); 

const handleSelectTicket = (ticketType) => {
  setSelectedTicket(ticketType);
  setError(""); 
};

const handleNext = () => {
  if (!selectedTicket) {
    setError(" Please select a ticket type !!!");
    return;
  }
  setPage("DetailsForm");
};

  return (<div>
    {page === "Selection" && (
    <div className="selectionContainer">
      <div className="topText">
        <h2>Ticket Selection</h2>
        <p>Step 1/3</p>
      </div>

      <ProgressBar step="33" />

      <div className="innerContainer">
        <div className="detailsDiv">
          <div className="festDiv">
            <h1>Techember Fest "25</h1>
            <p> Join us for an unforgettable experience at Landmark Centre! Secure your spot now. </p>
          </div>

          <div className="location">
            <p>📍 Landmark Centre</p>
            <p id="slash">| |</p>
            <p>March 15, 2025 | 7:00 PM</p>
          </div>
        </div>

        <hr />

        <div className="type">
          <p id="select">Select Ticket Type</p>
          <div className="ticketType">
                <div className={` ${selectedTicket === "REGULAR" ? "selected" : ""}`}
                    onClick={() => handleSelectTicket("REGULAR")} >
                  <TypeProp access="REGULAR ACCESS" unit="20/52" price="Free" />
                </div>

                <div className={` ${selectedTicket === "VIP" ? "selected" : ""}`}
                    onClick={() => handleSelectTicket("VIP")} >
                  <TypeProp access="VIP ACCESS" unit="20/52" price="$50" />
                </div>

                <div className={` ${selectedTicket === "VVIP" ? "selected" : ""}`}
                    onClick={() => handleSelectTicket("VVIP")} >
                  <TypeProp access="VVIP ACCESS" unit="20/52" price="$100" />
                </div>
              </div>
          
            {error && <p className="error">{error}</p>}
        </div>

        <div className="number">
          <p>Number of Tickets</p>
          <select name="" id="ticketNum">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3 </option>
            <option value="">4 </option>
            <option value="">5 </option>
          </select>
        </div>

        <div className="buttons">
          <button className="cancelBtn transparentBtn">Cancel</button>
          <button className="nextBtn blueBtn"  onClick={handleNext} > Next </button>
        </div>
      </div>
    </div>
  )}
    {page === "DetailsForm" && (
        <DetailsForm
          goBack={() => setPage("Selection")}
          goNext={() => setPage("Ticket")}
        />
      )}
      {page === "Ticket" && (
        <Ticket
          goBack={() => setPage("DetailsForm")}
          restart={() => setPage("Selection")}
        />
      )}
    </div>
  );
};

export default Selection;
