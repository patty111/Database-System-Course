import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/genres">Genre</Link></li>
        <li><Link to="/artists">Artist</Link></li>
        <li><Link to="/albums">Album</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;