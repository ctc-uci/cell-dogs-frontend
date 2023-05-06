import React from 'react';

const ShowTags = ({ serviceTag, therapyTag, staffAdoptionTag, specialTag, disabledTag }) => {
  return (
    <React.Fragment>
      {therapyTag && (
        <div className="tag" style={{ backgroundColor: '#4299E1' }}>
          <h5>Therapy</h5>
        </div>
      )}
      {staffAdoptionTag && (
        <div className="tag" style={{ backgroundColor: '#ECC94B' }}>
          <h5>Stf Adpt</h5>
        </div>
      )}
      {disabledTag && (
        <div className="tag" style={{ backgroundColor: '#C53030' }}>
          <h5>Decsd</h5>
        </div>
      )}
      {specialTag && (
        <div className="tag" style={{ backgroundColor: '#ED8936' }}>
          <h5>Special</h5>
        </div>
      )}
      {serviceTag && (
        <div className="tag" style={{ backgroundColor: '#48BB78' }}>
          <h5>Service</h5>
        </div>
      )}
    </React.Fragment>
  );
};

export default ShowTags;
