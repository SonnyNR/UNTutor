import React from 'react';
import { Component } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./TopicCarrousel.css"
import eq_dif from "./img/eq_dif.png";
import alg_lin from "./img/alg_lin.png";
import mat_bas from "./img/mat_bas.png";
import cal_int from "./img/cal_int.png";
import cal_dif from "./img/cal_dif.png";
import cal_mul from "./img/cal_mul.png";
import bio from "./img/bio.png";
import qui_org from "./img/qui_org.png";
import qui_ino from "./img/qui_ino.png";
import fis_1 from "./img/fis_1.png";
import fis_2 from "./img/fis_2.png";
const options = {
  margin: 30,
  responsiveClass: true,
  center: false,
  loop:true,
  nav: true,
  autoplay: false,
  navText: ["<div class='nav-button'>‹</div>", "<div class='nav-button'>›</div>"],
  smartSpeed: 1000,
  responsive: {
      0: {
          items: 1,
      },
      400: {
          items: 1,
      },
      600: {
          items: 3,
      },
      700: {
          items: 4,
      },
      1000: {
          items: 5,
      }
  },
};
class TopicCarrousel extends Component {
  render() {
    return (
<div className='carousel-container'>
  <h1>Lista de asignaturas</h1>
        <OwlCarousel className="slider-items owl-carousel" {...options}>
                      <div class="item"><img src= {eq_dif}/> <h4>Ecuaciones diferenciales</h4></div>
                      <div class="item"><img src={alg_lin}/> <h4>Algebra Lineal</h4></div>
                      <div class="item"><img src={mat_bas}/> <h4>Matemáticas básicas</h4></div>
                      <div class="item"><img src={cal_int}/> <h4>Cálculo integral</h4></div>
                      <div class="item"><img src={cal_dif}/> <h4>Cálculo diferencial</h4> </div>
                      <div class="item"><img src={cal_mul}/> <h4>Cálculo multivariado</h4></div>
                      <div class="item"><img src={bio}/> <h4>Biología</h4></div>
                      <div class="item"><img src={qui_org}/> <h4>Química orgánica</h4></div>
                      <div class="item"><img src={qui_ino}/> <h4>Química inorgánica</h4></div>
                      <div class="item"><img src={fis_1}/> <h4>Física I</h4></div>
                      <div class="item"><img src={fis_2}/> <h4>Física II</h4></div>
                  </OwlCarousel>
</div>
)
};
}
export default TopicCarrousel;