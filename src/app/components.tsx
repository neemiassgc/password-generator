import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import {BsFire } from "react-icons/bs"
import { HiOutlineClipboardDocumentList, HiOutlineClipboardDocumentCheck } from "react-icons/hi2"
import { FaCirclePlus } from "react-icons/fa6"
import { FaCircleMinus } from "react-icons/fa6"
import { MdEmojiSymbols } from "react-icons/md"
import { IoReload } from "react-icons/io5"
import { LuShieldAlert, LuShieldCheck, LuShieldClose, LuShieldQuestion, LuShield} from "react-icons/lu"
import { TbNumbers } from "react-icons/tb"
import { RxLetterCaseLowercase, RxLetterCaseUppercase } from "react-icons/rx"
import {  isThereOnlyOneFlagSelected, Indicator, toSnakeCase, detectStrengthIndicator } from "./logic"
import { useEffect, useState } from "react"

export function StrengthIndicator(props: {flagKeys: boolean[], passwordLength: number}) {
  type IndicatorToElementType = {
    [index: string]: JSX.Element,
    weak: JSX.Element,
    too_weak: JSX.Element,
    moderate: JSX.Element,
    strong: JSX.Element,
    very_strong: JSX.Element,
    impossible_to_crack: JSX.Element 
  }

  const currentIndicator: Indicator = detectStrengthIndicator(props.flagKeys, props.passwordLength);
  const indicatorToIconMapping: IndicatorToElementType = {
    too_weak: <LuShieldClose className="text-3xl inline mr-1 text-red-600"/>,
    weak: <LuShieldAlert className="text-3xl inline mr-1 text-orange-600"/>,
    moderate: <LuShieldQuestion className="text-3xl inline mr-1 text-yellow-600"/>,
    strong: <LuShield className="text-3xl inline mr-1 text-blue-600"/>,
    very_strong: <LuShieldCheck className="text-3xl inline mr-1 text-green-600"/>,
    impossible_to_crack: <BsFire className="text-3xl inline mr-1 text-orange-600"/>
  }

  return (
    <div className={"w-fit mx-auto mb-3 flex "+(currentIndicator === "IMPOSSIBLE TO CRACK" ? "items-end" : "items-center")}>
      {indicatorToIconMapping[toSnakeCase(currentIndicator)]}
      <span className="text-xl text-black font-semibold">{currentIndicator}</span>
    </div>
  )
}

export function ActionBox(props: {buildNewPassword: () => void, password: string}) {
  const [select, setSelect] = useState(false);

  const transitionAnimation: string = " transition ease-in-out duration-400 hover:scale-105";

  const copyToClipboard: () => void = () => {
    navigator.clipboard.writeText(props.password);
    setSelect(true);
  }

  return ( 
    <Box className="my-3 text-center">
      <IconButton className={transitionAnimation} style={{marginRight: "20px", backgroundColor: "green"}} size="large" onClick={props.buildNewPassword}>
        <IoReload className="text-white"/>
      </IconButton>
      <IconButton
        className={transitionAnimation}
        style={{backgroundColor: select ? "blue" : "green"}}
        size="large" onClick={copyToClipboard}
        disabled={select}>
        {
        !select
          ? <HiOutlineClipboardDocumentList className="text-white"/>
          : <HiOutlineClipboardDocumentCheck className="text-white"/>
        }
      </IconButton>
    </Box>
  )
}

export type SliderBlockType = {value: number, setValue: (value: number) => void, buildNewPassword: () => void}
export function SliderBlock({value, setValue, buildNewPassword}: SliderBlockType) {
  const handleSliderChange = (__: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    buildNewPassword();
  }

  const handleSliderChangeButtons: (input: number) => void = (input) => {
    setValue(value + input);
    buildNewPassword();
  }

  return (
    <Box className="mt-5">
      <div className="w-full text-center">
        <span className="block text-black text-lg text-md">Password Length: <span>{value}</span></span>
      </div>
      <div className="w-5/6 mx-auto my-3">
        <Stack spacing={1} direction="row" alignItems="center">
          <FaCircleMinus className="text-2xl hover:cursor-pointer transition ease-in-out duration-300 hover:scale-110"
            onClick={handleSliderChangeButtons.bind(null, -1)}
          />
          <Slider
            className="text-black block w-full mx-auto"
            aria-label="Always visible"
            value={value}
            onChange={handleSliderChange}
            min={0}
            max={25}
          />
          <FaCirclePlus className="text-2xl hover:cursor-pointer transition ease-in-out duration-300 hover:scale-125"
            onClick={handleSliderChangeButtons.bind(null, 1)}
          />
        </Stack>
      </div>
    </Box>
  );
}

export type CustomizationButtonsType = {flagKeys: boolean[], setFlagKeys: (value: boolean[]) => void, buildNewPassword: () => void}
export function CustomizationButtons({flagKeys, setFlagKeys, buildNewPassword}: CustomizationButtonsType) {
  const computeIconClasses: (flag: boolean) => string = flag => {
    return `text-2xl ${flag ? "text-white" : "text-black"}`
  }

  const toggleFlagKey: (index: number) => void = index => {
    const flagKeysCopy: boolean[] = [...flagKeys];
    const flagToBeSet = !flagKeysCopy[index]
    if (!flagToBeSet && isThereOnlyOneFlagSelected(flagKeys)) return;
    flagKeysCopy[index] = flagToBeSet;
    setFlagKeys(flagKeysCopy);
    buildNewPassword();
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