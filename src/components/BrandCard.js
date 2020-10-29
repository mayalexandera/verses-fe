import React from "react";

const BrandCard = (props) => {
  return (
    <div className='brand-card-wrapper'>
      <p>{props.brand.name}</p>
    </div>
  );
};

export default BrandCard;
