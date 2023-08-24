import React, { useState } from "react";
import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
  cursor: pointer;
  perspective: 1000px;
  transition: all 0.2s ease;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  &.active {
    transform: scale(1.03);
    box-shadow: 0 10px 60px rgba(0, 0, 0, 0.3);
  }

  &:before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: url(glare.png);
    transform: rotate(30deg);
    pointer-events: none;
  }
`;

export const Glare = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 50%
  );
  pointer-events: none;
`;

const Card = () => {
  const [active, setActive] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });
  const [background, setBackground] = useState({ x: 50, y: 50 });

  const handleMouseDown = (e) => {
    setActive(true);
    setInteracting(true);
  };

  const handleMouseUp = (e) => {
    setActive(false);
    setInteracting(false);
  };

  const handleMouseMove = (e) => {
    if (interacting) {
      if (e.buttons === 1) {
        // Check if the left mouse button is pressed
        setRotate({
          x: -1 * ((e.clientY / window.innerHeight) * 100 - 50),
          y: (e.clientX / window.innerWidth) * 100 - 50,
        });
        setGlare({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
          o: 0.5, // Increase the opacity for a more reflective glare
        });
        setBackground({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      } else {
        setInteracting(false); // Stop interacting if the mouse button is released
      }
    }
  };
  return (
    <CardContainer
      className={`card ${active ? "active" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleMouseDown} // Add onClick event handler
      style={{
        // background: `yellow`,
        transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        backgroundPosition: `${background.x}% ${background.y}%`,
        boxShadow: `0 0 8px rgba(0,0,0,${glare.o}), 0 0 16px rgba(0,0,0,${glare.o})`,
      }}
    >
      <Glare
        className="glare"
        style={{
          backgroundPosition: `${glare.x}% ${glare.y}%`,
        }}
      />
    </CardContainer>
  );
};

export default Card;
