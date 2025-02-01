"use client"

import { Button, Text, Slider, Box, Switch, Separator, IconButton } from "@radix-ui/themes";
import { useState } from "react";
import { generatePassword, CharOptions } from "./logic";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaArrowCircleLeft, FaArrowCircleRight, FaRegCheckCircle } from "react-icons/fa";

type CharsUnion = "lowercase" | "uppercase" | "numbers" | "special";

export default function Home() {
  return (
    <div className="flex justify-center z-50">
      <Panel/>
    </div>
  );
}

function Panel() {
  const [passwordLength, setPasswordLength] = useState(5);
  const [password, setPassword] = useState("");
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

  return (
    <Box className="w-7/12 shadow-xl border border-[#5b5bd6] rounded-xl mt-24 bg-[#F8F8FF]" px="9" pt="9" pb="4">
      <div className="flex justify-center">
        <PasswordField value={password}/>
      </div>
      <div className="flex justify-center my-3">
        <Button size="3" className="hover:cursor-pointer active:cursor-default"
          onClick={() => setPassword(generatePassword(charOptions, passwordLength))}>GENERATE</Button>
      </div>
      <Separator size="4"/>
      <Box className="w-full rounded-lg backdrop-blur-md" px="5" py="2">
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
      </Box>
    </Box>
  )
}

function PasswordField(props: {value: string}) {
  const [clipboardChecked, setClipBoardChecked] = useState(false);

  return (
    <Box className="w-1/2 border rounded-lg" p="3">
      <IconButton onClick={() => setClipBoardChecked(!clipboardChecked)} className="hover:cursor-pointer" mr="3" variant="ghost" size="3">
        {
          clipboardChecked ? <FaRegCheckCircle className="text-2xl text-green-500"/>
           : <HiOutlineClipboardDocumentList className="text-2xl"/>
        }
      </IconButton>
      <Text className="font-italic w-fit" style={{letterSpacing: "0.01em"}} size="4">{props.value}</Text>
    </Box>
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
    <div className="flex flex-wrap my-8 justify-center gap-7">
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