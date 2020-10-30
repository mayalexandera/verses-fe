import React from "react";

const BrandCard = (props) => {
  return (
    <div className='brand-card-wrapper'>
      <p key={props.brand.id} >{props.brand.name}</p>
    </div>
  );
};

export default BrandCard;
