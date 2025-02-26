import { atom } from "jotai";

// Atom to hold the "mode" (Hosting or Travelling)
export const modeAtom = atom(true); // true represents Hosting, false represents Travelling
export const guestAtom = atom({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });


  export const isModalOpenAtom = atom(false);