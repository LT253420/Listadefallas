import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";


export default function Watermark() {

  const { user } = useAuth();


  const [amount, setAmount] = useState(12);



  useEffect(() => {

    const calculateAmount = () => {

      const width = window.innerWidth;
      const height = window.innerHeight;


      // Calcula cantidad según tamaño de pantalla
      const columns = Math.ceil(width / 350);
      const rows = Math.ceil(height / 140);


      setAmount(columns * rows + 5);

    };


    calculateAmount();


    window.addEventListener(
      "resize",
      calculateAmount
    );


    return () => {
      window.removeEventListener(
        "resize",
        calculateAmount
      );
    };


  }, []);




  const watermarkText = `
    ${user?.displayName ?? "Usuario"}
    -
    ${user?.email ?? ""}
  `;



  const marks = Array.from({
    length: amount
  });

  const isMobile = window.innerWidth < 600;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,

        zIndex: 999998,

        pointerEvents: "none",
        userSelect: "none",

        overflow: "hidden",
      }}
    >


      {marks.map((_, index) => {


        const column = index % 4;
        const row = Math.floor(index / 4);

        const leftPosition = isMobile
          ? column * 280 + 20
          : column * 520 - 180;

        return (

          <div
            key={index}

            style={{
              position: "absolute",


              top: `${row * 150 - 100}px`,

              left: `${leftPosition}px`,



              transform: "rotate(-25deg)",


              display: "flex",

              alignItems: "center",

              gap: 15,


              opacity: 0.03,


              color: "#ffffff",


              fontFamily: "Consolas",


              fontSize: isMobile ? 10 : 14,


              letterSpacing: 1,


              whiteSpace: "nowrap",

            }}
          >



            <img
              src="/footer-logo-dark.png"

              alt=""

              draggable={false}

              style={{

                width: isMobile ? 55 : 80,


                opacity: 0.10,

              }}

            />



            <span>
              {watermarkText}
            </span>



          </div>


        );


      })}



    </div>
  );

}