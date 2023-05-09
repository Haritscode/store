import React from 'react';
import SlideCard from './SlideCard';
import '../../scss/Promotion.scss'
const Promotion = () => {
  return (
    <div className="Promotion">
      <SlideCard>
      {/* {images.map((image, index) => {
          return <img key={index} src={image} alt='none'/>;
        })} */}
      <img src="./hp_m_bcd_paneer_460px-020122.webp" alt='none'/>
      <img src="./hp_m_FMCG-PL_iDFreshoStore_460px-250123.webp" alt='none'/>
      <img src="./hp_m_FMCG-PL_iDFreshoStore_460px-250123.webp" alt='none'/>
      <img src="./hp_m_FMCG-PL_iDFreshoStore_460px-250123.webp" alt='none'/>
      <img src="./hp_m_FMCG-PL_iDFreshoStore_460px-250123.webp" alt='none'/>
      <img src="./hp_m_FMCG-PL_iDFreshoStore_460px-250123.webp" alt='none'/>
      </SlideCard>
    </div>
  );
}

export default Promotion;
