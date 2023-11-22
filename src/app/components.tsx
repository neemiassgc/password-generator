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
import { FaRegCircleCheck, FaCircleCheck } from "react-icons/fa6";
import {  isThereOnlyOneFlagSelected, Indicator, toSnakeCase, detectStrengthIndicator } from "./logic"
import { useClipboardChecking } from "./hooks"
import { Checkbox } from "@mui/material"

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

type ActionBoxPropsType = {
  buildNewPassword: () => void,
  password: { value: string, copiedToClipboard: boolean},
  setCopiedToClipboard: (value: boolean) => void
}
export function ActionBox(props: ActionBoxPropsType) {
  const isAvailable: boolean = useClipboardChecking();

  const iconButtonClasses: string = "transition ease-in-out duration-400 hover:scale-105";

  const copyToClipboard: () => void = () => {
    navigator.clipboard.writeText(props.password.value);
    props.setCopiedToClipboard(true);
  }

  return ( 
    <Box className="my-3 text-center">
      <IconButton
        className={iconButtonClasses}
        sx={{
          marginRight: "20px", backgroundColor: "#801336",
          "&:hover": {
            backgroundColor: "#801336"
          },
          "&:active": {
            backgroundColor: "#EE4540"
          }
        }}
        size="large"
        onClick={props.buildNewPassword}
      >
        <IoReload className="text-white"/>
      </IconButton>
      { isAvailable &&
        <IconButton
          className={iconButtonClasses}
          style={{backgroundColor: props.password.copiedToClipboard ? "#EE4540" : "#801336"}}
          size="large" onClick={copyToClipboard}
          disabled={props.password.copiedToClipboard}>
          {
          !props.password.copiedToClipboard
            ? <HiOutlineClipboardDocumentList className="text-white"/>
            : <HiOutlineClipboardDocumentCheck className="text-white"/>
          }
        </IconButton>
      }
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
          <FaCircleMinus className="text-2xl hover:cursor-pointer transition ease-in-out duration-300 hover:scale-110 text-primary"
            onClick={handleSliderChangeButtons.bind(null, -1)}
          />
          <Slider
            style={{color: "#EE4540"}}
            className="block w-full mx-auto"
            aria-label="Always visible"
            value={value}
            onChange={handleSliderChange}
            min={4}
            max={25}
          />
          <FaCirclePlus className="text-2xl hover:cursor-pointer transition ease-in-out duration-300 hover:scale-125 text-primary"
            onClick={handleSliderChangeButtons.bind(null, 1)}
          />
        </Stack>
      </div>
    </Box>
  );
}

export type CustomizationButtonsType = {flagKeys: boolean[], setFlagKeys: (value: boolean[]) => void, buildNewPassword: () => void}
export function CustomizationButtons({flagKeys, setFlagKeys, buildNewPassword}: CustomizationButtonsType) {
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
          onClick={(): void => toggleFlagKey(0)}/>
        <CustomChip
         flag={flagKeys[1]}
         label="Uppercase Letters"
          onClick={(): void => toggleFlagKey(1)}/>
        <CustomChip
          flag={flagKeys[2]}
          label="numbers"
          onClick={(): void => toggleFlagKey(2)}/>
        <CustomChip
          flag={flagKeys[3]}
          label="symbols"
          onClick={(): void => toggleFlagKey(3)}/>
      </Box> 
    </div>
  )
}

function CustomChip(props: {label: string, flag: boolean, onClick: () => void}) {
  const defaultClasses: string = "border-2 border-black hover:cursor-pointer rounded-xl flex gap-1 p-2 items-center transition hover:scale-105 hover:shadow-xl ease-in-out";

  return (
    <div className={`${defaultClasses} ${props.flag ? "border-primary text-primary" : "text-black"}`} onClick={props.onClick}>
      {
        props.flag ? <FaCircleCheck className="text-primary text-2xl"/> :
        <FaRegCircleCheck className="text-black text-2xl"/>
      }
      <span className="block font-semibold text-md">{props.label}</span>
    </div>
  );
}