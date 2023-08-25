import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import top from "./top.svg";
import badge from "./badge.png";

const Card = ({ children }) => {
  const [rotations, setRotations] = useState({ x: 0, y: 0, z: 0 });
  const [isAnimating, setAnimating] = useState(false);
  const isAnimatingReference = useRef(isAnimating);
  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [glare, setGlare] = useState({ x: 0, y: 0, opacity: 0 });
  const handleAccelerometerData = (event) => {
    const { x, y, z } = event.accelerationIncludingGravity;
    setAccelerometerData({ x, y, z });
  };
  useEffect(() => {
    function requestMotionPermission() {
      if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === "granted") {
              window.addEventListener(
                "devicemotion",
                handleAccelerometer,
                true
              );
            } else {
              alert("Permission not granted for DeviceMotion");
            }
          })
          .catch(console.error);
      } else {
        // handle regular non iOS 13+ devices
        window.addEventListener("devicemotion", handleAccelerometerData, true);
      }
    }

    requestMotionPermission();

    return () => {
      window.removeEventListener("devicemotion", handleAccelerometerData);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("devicemotion", handleAccelerometerData);
    return () => {
      window.removeEventListener("devicemotion", handleAccelerometerData);
    };
  }, []);
  // Put these anywhere you wish, I personally put them into a dedicated `utils` file.
  function round(num, fix = 2) {
    return parseFloat(num.toFixed(fix));
  }

  function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  const handleMouseMove = (event) => {
    setAnimating(true); // We're animating the card.

    // We're getting the bounding box of the card.
    const rect = event.currentTarget.getBoundingClientRect();

    // We're getting the mouse position relative to the card.
    const absolute = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    // We're getting the mouse position relative to the center of the card,
    // in percentage, starting from x, y 0% 0% top-left, ending in 100% 100% bottom-right.
    const percent = {
      x: round((100 / rect.width) * absolute.x),
      y: round((100 / rect.height) * absolute.y),
    };

    // We're getting the tilt angle of the card, calculated on the
    // percentage of distance from the center, going from
    // -50% to 0% to 50% left to right, top to bottom.
    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    // We can now set the tilt angle(s) of the card. Note that the
    // divisions here (/ 12, / 16, / 20) are used to stabilize the
    // rotations using smaller values. Play with them and experiment
    // you perfect fine-tuning!
    setRotations({
      x: round(((center.x > 50 ? 1 : -1) * center.x) / 12),
      y: round(center.y / 16),
      z: round(distance(percent.x, percent.y, 50, 50) / 20),
    });
  };
  const animate = (event) => {
    setAnimating(true);

    const rect = event.currentTarget.getBoundingClientRect();

    const absolute = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const percent = {
      x: round((100 / rect.width) * absolute.x),
      y: round((100 / rect.height) * absolute.y),
    };

    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    setRotations({
      x: round(((center.x > 50 ? 1 : -1) * center.x) / 12),
      y: round(center.y / 16),
      z: round(distance(percent.x, percent.y, 50, 50) / 20),
    });

    setGlare({
      x: percent.x + accelerometerData.x,
      y: percent.y + accelerometerData.y,
      opacity: 0.25,
    });
  };

  // const animate = (event) => {
  //   setAnimating(true);

  //   const rect = event.currentTarget.getBoundingClientRect();

  //   const absolute = {
  //     x: event.clientX - rect.left,
  //     y: event.clientY - rect.top,
  //   };

  //   const percent = {
  //     x: round((100 / rect.width) * absolute.x),
  //     y: round((100 / rect.height) * absolute.y),
  //   };

  //   const center = {
  //     x: percent.x - 50,
  //     y: percent.y - 50,
  //   };

  //   setRotations({
  //     x: round(((center.x > 50 ? 1 : -1) * center.x) / 12),
  //     y: round(center.y / 16),
  //     z: round(distance(percent.x, percent.y, 50, 50) / 20),
  //   });

  //   setGlare({
  //     x: percent.x,
  //     y: percent.y,
  //     opacity: 0.25,
  //   });
  // };

  // const stopAnimating = () => {
  //   setAnimating(false);

  //   setTimeout(() => {
  //     if (isAnimatingReference.current) return;

  //     setRotations({ x: 0, y: 0, z: 2 });
  //     setGlare({ x: 50, y: 50, opacity: 0 });
  //   }, 100);
  // };
  const stopAnimating = () => {
    setAnimating(false);

    setTimeout(() => {
      if (isAnimatingReference.current) return;

      setRotations({ x: 0, y: 0, z: 2 });
      setGlare({
        x: 50 + accelerometerData.x,
        y: 50 + accelerometerData.y,
        opacity: 0,
      });

      // setGlare({ x: 50, y: 50, opacity: 0 });
    }, 100);
  };

  return (
    <motion.div
      onMouseMove={animate}
      onMouseLeave={stopAnimating}
      animate={{
        rotateY: rotations.x,
        rotateX: rotations.y,
        transformPerspective: rotations.z * 100,
      }}
      style={{
        // width: "240px",
        // height: "320px",
        borderRadius: "0.5rem",
        border: "1px solid rgba(255, 255, 255, 1)",
        background:
          "linear-gradient(136deg, rgba(234, 255, 254, 0.70) 0%, rgba(205, 201, 241, 0.70) 100%)",
        boxShadow: "40px 40px 100px 0px rgba(24, 48, 63, 0.20)",
        padding: "1rem",
        display: "flex",
        ustifyContent: "center",
        transformStyle: "preserve-3d",
        transformOrigin: "center",
        perspective: "320px",
        width: "570px",
        height: "475px",
        backgroundSize: "cover",
      }}
    >
      <motion.div
        style={{
          zIndex: 2,
          mixBlendMode: "overlay",
          position: "absolute",
          transform: "translateZ(1px)",
          width: "100%",
          height: "100%",
          borderRadius: "0.5rem",
          transformStyle: "preserve-3d",
        }}
        animate={{

          opacity: glare.opacity,
        }}
      />
      <div>{children}</div>
    </motion.div>
  );
};
export default Card;
