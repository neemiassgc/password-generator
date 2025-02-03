"use client"

import { Button, Text, Slider, Box, Switch, Separator, IconButton } from "@radix-ui/themes";
import { useState } from "react";
import { generatePassword, CharOptions, classifyPasswordStrength, StrenghLevels } from "./logic";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaArrowCircleLeft, FaArrowCircleRight, FaRegCheckCircle } from "react-icons/fa";
import { BsShieldFillCheck, BsShieldFillMinus, BsShieldFillExclamation } from "react-icons/bs";
import { useClipboardChecking } from "./hooks";

type CharsUnion = "lowercase" | "uppercase" | "numbers" | "special";

export default function Home() {
  return (
    <div className="flex justify-center z-50">
      <Panel/>
    </div>
  );
}

function Panel() {
  const [passwordLength, setPasswordLength] = useState(5); // The password needs the length to be generated
  const [passwordStrength, setPasswordStrength] = useState<StrenghLevels>("weak"); // If derived it would cause an unwanted behavior 
  const [password, setPassword] = useState("");
  const [clipboardChecked, setClipboardChecked] = useState(false);
  const [disabledButton, setDisabledButton] = useState({left: false, right: false});
  const [charOptions, setCharOptions] = useState<CharOptions>({
    lowercase: true,
    uppercase: false,
    numbers: false,
    special: false,
  })

  const charOptionsSetter = (value: CharsUnion) => () => {
    const numberOfSelectedOptions = Object.keys(charOptions).filter(option => charOptions[option]).length;
    if (numberOfSelectedOptions === 1 && charOptions[value]) return;

    setCharOptions({...charOptions, [value]: !charOptions[value]})
  }

  const validateLength = (length: number) => {
    if (length == 4) setDisabledButton({...disabledButton, left: true});
    if (length == 25) setDisabledButton({...disabledButton, right: true});
    if (length > 4 && length < 25) setDisabledButton({left: false, right: false});
    return length;
  }

  const strengthLevels = {
    "strong": <BsShieldFillCheck className="text-3xl text-green-500"/>,
    "moderate": <BsShieldFillMinus className="text-3xl text-yellow-500"/>,
    "weak": <BsShieldFillExclamation className="text-3xl text-red-500"/>
  }

  return (
    <div className="w-11/12 md:w-9/12 lg:w-7/12 shadow-xl border-2 border-[#5b5bd6] rounded-xl mt-4 sm:mt-24 bg-[#F8F8FF] px-2 md:px-12 pt-12 pb-4">
      <Text className="flex justify-center gap-3 mb-3 text-xl">{strengthLevels[passwordStrength]}{passwordStrength}</Text>
      <div className="flex justify-center w-full">
        <PasswordField clipboardChecked={clipboardChecked} setClipboardChecked={setClipboardChecked.bind(null, true)} value={password}/>
      </div>
      <div className="flex justify-center my-3">
        <Button size="3" className="hover:cursor-pointer active:cursor-default"
          onClick={() => {
            setPassword(generatePassword(charOptions, passwordLength));
            setClipboardChecked(false);
            setPasswordStrength(classifyPasswordStrength(passwordLength, charOptions));
          }}>GENERATE</Button>
      </div>
      <Separator size="4"/>
      <div className="w-full rounded-lg backdrop-blur-md px-0 sm:px-5 py-4">
        <LengthAdjuster
          value={passwordLength}
          setValue={value => {
            validateLength(value);
            setPasswordLength(value)
          }}
          disabled={disabledButton}/>
        <Slider
          size="3" min={4} max={25}
          value={[passwordLength]} defaultValue={[1]}
          onValueChange={([value]) => {
            validateLength(value);
            setPasswordLength(value)
          }}/>
        <CharSettings charOptions={charOptions} charOptionsSetter={charOptionsSetter}/>
      </div>
    </div>
  )
}

function PasswordField(props: {value: string, clipboardChecked: boolean, setClipboardChecked: () => void}) {
  const isClipboardAvailable = useClipboardChecking();

  return (
    <div className="w-full flex flex-col items-center px-1 py-3 sm:p-3 sm:block sm:w-4/6 md:w-5/6 lg:w-9/12 xl:w-1/2 border rounded-lg text-wrap overflow-clip">
      {
        isClipboardAvailable &&
        <IconButton onClick={() => {
            props.setClipboardChecked();
            navigator.clipboard.writeText(props.value);
          }}
          className="hover:cursor-pointer" variant="ghost" size="3"
        >
          {
            props.clipboardChecked ? <FaRegCheckCircle className="text-2xl text-green-500"/>
            : <HiOutlineClipboardDocumentList className="text-2xl"/>
          }
        </IconButton>
      }
      <Text className="font-italic w-fit ml-2" style={{letterSpacing: "0.1em"}} size="4">{props.value}</Text>
    </div>
  )
}

function CharSettings(props: {charOptions: CharOptions, charOptionsSetter: (value: CharsUnion) => () => void}) {
  const optionsMap: {[prop: string]: string} = {
    "numbers": "Include Numbers",
    "lowercase": "Include Lowercase Letters",
    "uppercase": "Include Uppercase Letters",
    "special": "Include Special Chars"
  }

  return (
    <div className="flex flex-col ml-10 sm:ml-0 sm:flex-row sm:flex-wrap my-8 justify-center gap-7">
      {
        Object.keys(optionsMap).map((option, index) => 
          <Text key={index} className="hover:cursor-pointer active:cursor-default" as="label" size="3">
            <Switch className="hover:cursor-pointer active:cursor-default"
              mr="2"
              size="2"
              checked={props.charOptions[option]}
              onCheckedChange={props.charOptionsSetter(option as CharsUnion)}
            />
            {optionsMap[option]}
          </Text>
        )
      }
    </div>
  )
}

function LengthAdjuster(props: {
  value: number,
  setValue: (value: number) => void,
  disabled: { left: boolean, right: boolean }
}) {
  const minus = () => () => props.setValue(props.value - 1);
  const plus = () => () => props.setValue(props.value + 1);

  return (
    <Box className="w-fit mx-auto" my="3">
      <IconButton radius="full" disabled={props.disabled.left}
        mr="4" variant="ghost" size="1"
        className={props.disabled.left ? "" : "hover:cursor-pointer active:cursor-default"}
        onClick={minus()}
      >
        <FaArrowCircleLeft className="text-3xl"/>
      </IconButton>
      <Text className="text-xl">{props.value < 10 ? "0"+props.value : props.value}</Text>
      <IconButton radius="full" disabled={props.disabled.right}
        ml="4" variant="ghost" size="1"
        className={props.disabled.right ? "" : "hover:cursor-pointer active:cursor-default"}
        onClick={plus()}
      >
        <FaArrowCircleRight className="text-3xl"/>
      </IconButton>
    </Box>
  )
}