import React from 'react';
import StatusCard from './StatusCard';

const StatusCarousel = ({ statuses, onDelete }) => {
  return (
    <div className="status-carousel">
      {statuses.map((status) => (
        <StatusCard key={status.id} status={status} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default StatusCarousel;
