import React from 'react';

const StatusCard = ({ status, onDelete }) => {
  return (
    <div className="story-card">
      <img src={status.imageUrl} alt="status" className="story-image" />
      <div className="story-info">
        <h4>{status.username}</h4>
        <p>{status.description}</p>
        <button onClick={() => onDelete(status.id)}>Delete</button>
      </div>
    </div>
  );
};

export default StatusCard;
