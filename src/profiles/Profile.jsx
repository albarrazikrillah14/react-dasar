import PropTypes from "prop-types";
import { useState } from "react";
import { ProfileContext } from "./ProfileContext";

export default function Profile({children}) {
  let [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }
  return (
    <div>
      <input type="text" value={name} onChange={handleChange}/>
      <ProfileContext.Provider value={name}>
        {children}
      </ProfileContext.Provider>
    </div>
  );
}

Profile.propTypes = {
  children: PropTypes.element.isRequired,  
}