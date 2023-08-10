import React from 'react';

const ShowTags = ({ serviceTag, therapyTag, staffAdoptionTag, specialTag, disabledTag }) => {
  return (
    <>
      {therapyTag && (
        <div className="tag" style={{ backgroundColor: '#4299E1' }}>
          <h6>Pets</h6>
        </div>
      )}
      {staffAdoptionTag && (
        <div className="tag" style={{ backgroundColor: '#ECC94B' }}>
          <h6>Stf Adpt</h6>
        </div>
      )}
      {disabledTag && (
        <div className="tag" style={{ backgroundColor: '#C53030' }}>
          <h6>Decsd</h6>
        </div>
      )}
      {specialTag && (
        <div className="tag" style={{ backgroundColor: '#ED8936' }}>
          <h6>Other</h6>
        </div>
      )}
      {serviceTag && (
        <div className="tag" style={{ backgroundColor: '#48BB78' }}>
          <h6>Service</h6>
        </div>
      )}
    </>
  );
};

export default ShowTags;
