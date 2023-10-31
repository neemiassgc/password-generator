"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import { BsShieldFillCheck, BsMagic } from "react-icons/bs"
import { FaCirclePlus } from "react-icons/fa6"
import { FaCircleMinus } from "react-icons/fa6"
import { MdEmojiSymbols } from "react-icons/md"
import { TbNumbers } from "react-icons/tb"
import { RxLetterCaseLowercase, RxLetterCaseUppercase } from "react-icons/rx"

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <main className="w-5/6 sm:w-8/12 md:w-7/12 lg:w-1/2 h-2/3 flex flex-col justify-start">
        <StrengthIndicator/>
        <HeaderBlock/>
        <GeneratorButton/>
        <FooterBlock/>
      </main>
    </div>
  )
}

function GeneratorButton() {
  return ( 
    <Box className="my-5 text-center transition ease-in-out duration-400 hover:scale-110 shadow-2xl">
      <Button className="active:bg-red-500" component="label" variant="contained" startIcon={<BsMagic/>}>
        Generate Password
      </Button>
    </Box>
  )
}

function StrengthIndicator() {
  return (
    <div className="w-fit mx-auto mb-3">
      <BsShieldFillCheck className="text-3xl inline mr-1 text-green-600"/>
      <span className="text-xl text-black font-semibold">Very strong</span>
    </div>
  )
}

function HeaderBlock() {
  return (
    <div className="border-2 border-black border-b-4 border-t-4 shadow-2xl rounded-lg w-full overflow-x-hidden">
      <Box className="my-1">
        <span className="text-center w-fit mx-auto p-1 rounded-lg block text-2xl">asodjfalkçsdfmçaklsdf</span>
      </Box>
    </div>
  )
}

function SliderBlock() {
  return (
    <Box className="mt-5">
      <div className="w-full text-center">
        <span className="text-black text-lg text-md">Password Length: 5</span>
      </div>
      <div className="w-5/6 mx-auto my-3">
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
    </Box>
  );
}

function FooterBlock() {
  return (
    <div className="border-2 border-black border-b-4 border-t-4 shadow-2xl rounded-lg w-full">
      <Box className="p-2 text-center bg-black">
        <span className="text-white text-2xl w-fit">Customize your password</span>
      </Box>
      <SliderBlock/>
      <CustomizationButtons/>
    </div>
  )
}

function CustomizationButtons() {
  const [flagKeys, setFlagKeys] = useState([false, false, false, false]);

  const computeIconClasses: (flag: boolean) => string = flag => {
    return `text-2xl ${flag ? "text-white" : "text-black"}`
  }

  const toggleFlagKey: (index: number) => void = index => {
    const flagKeysCopy: boolean[] = [...flagKeys];
    flagKeysCopy[index] = !flagKeysCopy[index]
    setFlagKeys(flagKeysCopy);
  }

  return (
    <div className="w-full p-3 mb-3">
      <Box className="w-full gap-2 lg:gap-0 flex flex-wrap justify-evenly">
        <CustomChip
         flag={flagKeys[0]}
         label="Lowercase Letters"
          icon={<RxLetterCaseLowercase className={computeIconClasses(flagKeys[0])}/>}
          onClick={(): void => toggleFlagKey(0)}/>
        <CustomChip
         flag={flagKeys[1]}
         label="Uppercase Letters"
          icon={<RxLetterCaseUppercase className={computeIconClasses(flagKeys[1])}/>}
          onClick={(): void => toggleFlagKey(1)}/>
        <CustomChip
         flag={flagKeys[2]}
         label="numbers"
          icon={<TbNumbers className={computeIconClasses(flagKeys[2])}/>}
          onClick={(): void => toggleFlagKey(2)}/>
        <CustomChip
         flag={flagKeys[3]}
         label="symbols"
          icon={<MdEmojiSymbols className={computeIconClasses(flagKeys[3])}/>}
          onClick={(): void => toggleFlagKey(3)}/>
      </Box> 
    </div>
  )
}

function CustomChip(props: {label: string, icon: JSX.Element, flag: boolean, onClick: () => void}) {
  return (
    <div className={`border-2 hover:cursor-pointer border-black rounded-xl flex gap-1 p-2 items-center transition hover:scale-105 hover:shadow-xl ease-in-out ${props.flag ? "bg-black text-white" : "bg-white text-black hover:bg-gray-200"}`} onClick={props.onClick}>
      {props.icon}
      <span className="block font-semibold text-md">{props.label}</span>
    </div>
  );
}

export const runtime = "edge";