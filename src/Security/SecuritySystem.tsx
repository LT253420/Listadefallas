import { useEffect, useState } from "react";
import { EyeOff } from "lucide-react";
import { securityShortcuts } from "./shortcuts";
import { useAuth } from "../contexts/AuthContext";


export default function SecuritySystem() {

  const [blackScreen, setBlackScreen] = useState(false);

  const { user } = useAuth();


  useEffect(() => {


      const handleBlur = () => {
        setBlackScreen(true);
      };


      const handleFocus = () => {
        setBlackScreen(false);
      };


    const getShortcut = (e: KeyboardEvent) => {
      const keys: string[] = [];

      if (e.ctrlKey) keys.push("ctrl");
      if (e.shiftKey) keys.push("shift");
      if (e.altKey) keys.push("alt");
      if (e.metaKey) keys.push("meta");

      keys.push(e.key.toLowerCase());

      return keys.join("+");
    };


    const matchesShortcut = (e: KeyboardEvent) => {

      const shortcut = getShortcut(e);

      return (
        securityShortcuts.BLACK_SCREEN.includes(shortcut) ||
        securityShortcuts.BLACK_SCREEN.includes(e.key.toLowerCase())
      );

    };


    const keyDown = (e: KeyboardEvent) => {

      if (matchesShortcut(e)) {
        console.log("ACTIVADO");
        setBlackScreen(true);
      }

    };


    const keyUp = (e: KeyboardEvent) => {

      if (matchesShortcut(e)) {
        setBlackScreen(false);
      }

    };


    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);


    return () => {

      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);

    };


  }, []);



  if (!blackScreen) return null;



  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >


      <EyeOff
        size={120}
        color="#ffffff"
        style={{
          opacity: .35,
          marginBottom: 25
        }}
      />



      <img
        src="/footer-logo-dark.png"
        alt=""
        draggable={false}
        style={{
          width: 240,
          opacity: .08,
          marginBottom: 20
        }}
      />



      <div
        style={{
          color: "#ffffff",
          opacity: .25,
          fontSize: 14,
          letterSpacing: 1,
          textAlign: "center",
          fontFamily: "Consolas",
          marginBottom: 30
        }}
      >

        {user?.displayName && (
          <div>
            {user.displayName}
          </div>
        )}


        {user?.email && (
          <div>
            {user.email}
          </div>
        )}

      </div>




      <p
        style={{
          color: "#ffffff",
          opacity: .55,
          fontSize: 18,
          letterSpacing: 1,
          textAlign: "center",
          fontFamily: "Consolas"
        }}
      >
        Se prohíbe compartir el contenido sin autorización.
      </p>


    </div>
  );

}