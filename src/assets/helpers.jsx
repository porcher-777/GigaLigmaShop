import React, { useState } from 'react';
import Rating from '@mui/material/Rating';

//Donné partiellement par Chat GPT 

const RatingComponent = ({rating}) => {
    return (
        <div>
            <Rating value={rating} precision={0.1} readOnly />
        </div>
    );
}

export default RatingComponent;
