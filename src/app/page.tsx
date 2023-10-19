"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import { BsShieldFillCheck } from "react-icons/bs"
import { FaCirclePlus } from "react-icons/fa6"
import { FaCircleMinus } from "react-icons/fa6"
import { MdEmojiSymbols } from "react-icons/md"
import { TbNumbers } from "react-icons/tb"
import { RxLetterCaseLowercase, RxLetterCaseUppercase } from "react-icons/rx"

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <main className="w-1/2 h-2/3 flex flex-col justify-between gap-16">
        <div className="border-4 w-full border-black rounded-xl overflow-x-hidden">
          <Box className="bg-black p-2">
            <span className="text-white text-xl font-semibold w-fit mx-auto block p-1">Generate a strong password</span>
          </Box>
          <span className="text-center w-fit mx-auto p-2 rounded-lg block text-2xl my-2">asodjfalkçsdfmçaklsdf</span>
          <div className="text-center w-full my-3 mt-5">
            <div className="w-fit mx-auto">
              <BsShieldFillCheck className="text-3xl inline mr-1 text-green-600"/>
              <span className="text-xl font-semibold">Very strong</span>
            </div>
          </div>
        </div>
        <div className="border-4 rounded-xl border-black w-full flex-grow">
          <Box className="bg-black p-2">
            <span className="text-white font-semibold text-xl block mx-auto w-fit p-1">Customize your password</span>
          </Box>
          <Box className="mt-3">
            <span className="block my-2 font-semibold text-md w-fit mx-auto">Choose the length of the password</span>
            <div className="w-4/6 mx-auto">
              <Stack spacing={1} direction="row" alignItems="center">
                <FaCircleMinus className="text-2xl"/>
                <Slider
                  className="text-black block w-full mx-auto"
                  aria-label="Always visible"
                  defaultValue={10}
                />
                <FaCirclePlus className="text-2xl"/>
              </Stack>
            </div>
            <CustomizationButtons/>
          </Box>
        </div>
      </main>
    </div>
  )
}

function CustomizationButtons() {
  const [numbersActive, setNumbersActive] = useState(false)
  const [lowerCaseLettersActive, setLowerCaseLettersActive] = useState(false);
  const [upperCaseLettersActive, setUpperCaseLettersActive] = useState(false);
  const [symbolsActive, setSymbolsActive] = useState(false);

  const computeIconClasses: (flag: boolean) => string = flag => {
    return `text-4xl ${flag ? "text-green-600" : "text-black"}`
  }

  const computeIconButtonClasses: (flag: boolean) => string = flag => {
    return `hover:bg-default p-3 ${flag ? "bg-black" : "bg-none"}`
  }

  return (
    <div className="w-full mt-7">
      <Box className="w-full flex justify-evenly">
        <IconButton className={computeIconButtonClasses(lowerCaseLettersActive)}
          onClick={(): void => setLowerCaseLettersActive(!lowerCaseLettersActive)}>
          <RxLetterCaseLowercase className={computeIconClasses(lowerCaseLettersActive)}/>
        </IconButton>
        <IconButton className={computeIconButtonClasses(upperCaseLettersActive)}
          onClick={(): void => setUpperCaseLettersActive(!upperCaseLettersActive)}>
          <RxLetterCaseUppercase className={computeIconClasses(upperCaseLettersActive)}/>
        </IconButton>
        <IconButton className={computeIconButtonClasses(numbersActive)}
          onClick={(): void => setNumbersActive(!numbersActive)}>
          <TbNumbers className={computeIconClasses(numbersActive)}/>
        </IconButton>
        <IconButton className={computeIconButtonClasses(symbolsActive)}
          onClick={(): void => setSymbolsActive(!symbolsActive)}>
          <MdEmojiSymbols className={computeIconClasses(symbolsActive)}/>
        </IconButton>
      </Box> 
    </div>
  )
}

export const runtime = "edge";