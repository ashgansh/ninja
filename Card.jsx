import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  padding: 1rem;
  width: 300px;
  height: auto;
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
// export const CardContainer = styled.div`
//   position: relative;
//   width: 300px;
//   height: 400px;
//   cursor: pointer;
//   perspective: 1000px;
//   transition: all 0.2s ease;
//   background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//   border-radius: 15px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
//   overflow: hidden;

//   &.active {
//     transform: scale(1.03);
//     box-shadow: 0 10px 60px rgba(0, 0, 0, 0.3);
//   }

//   &:before {
//     content: "";
//     position: absolute;
//     top: -50%;
//     left: -50%;
//     width: 200%;
//     height: 200%;
//     background: url(glare.png);
//     transform: rotate(30deg);
//     pointer-events: none;
//   }
// `;

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
  transform: translate(${(props) => props.x}%, ${(props) => props.y}%);
  opacity: ${(props) => props.o};
`;

// 1. Import springs
import { useSpring } from "react-spring";

// 2. Clamp utility
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


const Card = ({ children }) => {
  // 1. Create springs
  const [rotate, rotateApi] = useSpring(() => ({ x: 0, y: 0 }));
  const [glare, glareApi] = useSpring(() => ({ x: 50, y: 50, o: 0 }));

  // 4. Manage active state
  const [active, setActive] = useState(false);

  // 5. Clear timeout on unmount
  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseMove = (e) => {
    // Constrain values
    const x = clamp((e.clientX / window.innerWidth) * 100, 0, 100);
    const y = clamp((e.clientY / window.innerHeight) * 100, 0, 100);

    // Center coordinates
    const cx = x - 50;
    const cy = y - 50;

    // Scale for effects
    const rx = -cx / 2;
    const ry = cy / 5;

    // Update springs
    rotateApi.start({ x: rx, y: ry });
    glareApi.start({ x, y, o: 0.5 });
  };

  return (
    <CardContainer
      className={active ? "active" : ""}
      onMouseMove={handleMouseMove}
      onMouseOut={() => setActive(false)} // 4. Stop interacting
      aria-label="Pokemon Card" // 6. Accessibility
      tabIndex="0" // 6. Make focusable
    >
      

      <Glare o={glare.o} x={glare.x} y={glare.y} />
      {children}
    </CardContainer>
  );
};

export default Card;
