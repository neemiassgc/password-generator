"use client"

import { Button, Text, Slider, Box, Switch, Separator, IconButton } from "@radix-ui/themes";
import { useState } from "react";
import { generatePassword, CharOptions } from "./logic";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaRegCheckCircle, FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

type CharsUnion = "lowercase" | "uppercase" | "numbers" | "special";

export default function Home() {
  const [passwordLength, setPasswordLength] = useState(5);
  const [password, setPassword] = useState("");
  const [charOptions, setCharOptions] = useState<CharOptions>({
    lowercase: true,
    uppercase: false,
    numbers: false,
    special: false,
  })

  const charOptionsSetter = (value: CharsUnion) => () => {
    setCharOptions({...charOptions, [value]: !charOptions[value]})
  }

  return (
    <div className="flex justify-center">
      <Box className="w-1/2 border border-gray-300 rounded-xl shadow-lg mt-24" p="9">
        <div className="flex justify-center">
          <PasswordField value={password}/>
        </div>
        <div className="flex justify-center my-3">
          <Button size="3" className="hover:cursor-pointer active:cursor-default"
            onClick={() => setPassword(generatePassword(charOptions, passwordLength))}>GENERATE</Button>
        </div>
        <Separator mt="3" size="4" />
        <Box className="w-full" p="3">
          <LengthAdjuster/>
          <Slider size="3" min={3} max={25} value={[passwordLength]} defaultValue={[1]} onValueChange={value => setPasswordLength(value[0])}/>
          <CharSettings charOptions={charOptions} charOptionsSetter={charOptionsSetter}/>
        </Box>
      </Box>
    </div>
  );
}

function PasswordField(props: {value: string}) {
  const [clipboardChecked, setClipBoardChecked] = useState(false);

  return (
    <Box className="w-1/2 border border-gray-300 rounded-lg" p="3">
      <IconButton onClick={() => setClipBoardChecked(!clipboardChecked)} className="hover:cursor-pointer" mr="3" variant="ghost" size="3">
        {
          clipboardChecked ? <FaRegCheckCircle className="text-2xl text-green-500"/>
           : <HiOutlineClipboardDocumentList className="text-2xl"/>
        }
      </IconButton>
      <Text className="font-italic" style={{letterSpacing: "0.1em"}} size="4">{props.value}</Text>
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

function LengthAdjuster() {
  const [value, setValue] = useState(5);
  const [disabled, setDisabled] = useState({left: false, right: false});

  const validateLength = (length: number) => {
    if (length == 4) setDisabled({...disabled, left: true});
    if (length == 25) setDisabled({...disabled, right: true});
    if (length > 4 && length < 25) setDisabled({left: false, right: false});
    return length;
  }

  const minus = () => () => setValue(validateLength(value - 1));
  const plus = () => () => setValue(validateLength(value + 1));

  return (
    <Box className="w-fit mx-auto" my="3">
      <IconButton radius="full" disabled={disabled.left}
        mr="4" variant="ghost" size="1"
        className={disabled.left ? "" : "hover:cursor-pointer active:cursor-default"}
        onClick={minus()}
      >
        <FaArrowCircleLeft className="text-3xl"/>
      </IconButton>
      <Text className="text-xl">{value < 10 ? "0"+value : value}</Text>
      <IconButton radius="full" disabled={disabled.right}
        ml="4" variant="ghost" size="1"
        className={disabled.right ? "" : "hover:cursor-pointer active:cursor-default"}
        onClick={plus()}
      >
        <FaArrowCircleRight className="text-3xl"/>
      </IconButton>
    </Box>
  )
}