"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import { generatePassword, FlagMap } from "./logic"
import type { CustomizationButtonsType, SliderBlockType } from "./components";
import { StrengthIndicator, ActionBox, CustomizationButtons, SliderBlock } from "./components";

export default function Home() {
  const [flagKeys, setFlagKeys] = useState([true, false, false, false]);
  const [sliderBlockValue, setSliderBlockValue] = useState(10)
  const [password, setPassword] = useState({value: "password", copiedToClipboard: false});

  const setCopiedToClipboard: (input: boolean) => void = input => {
    const newPassword = {...password};
    newPassword.copiedToClipboard = input;
    setPassword(newPassword);
  }

  const buildNewPassword: () => void = () => {
    const charSetMapping: FlagMap = {
      lowercase: flagKeys[0],
      uppercase: flagKeys[1],
      numbers: flagKeys[2],
      symbols: flagKeys[3]
    }

    const generatedPassword: string = generatePassword(charSetMapping, sliderBlockValue);
    setPassword({value: generatedPassword, copiedToClipboard: false});
  }

  return (
    <div style={{backgroundImage: `url("./cool-background.png")`}} className="w-screen h-screen flex justify-center items-center">
      <main className="w-11/12 sm:w-8/12 md:w-7/12 lg:w-1/2 h-5/6 sm:h-2/3 flex flex-col justify-start">
        <StrengthIndicator flagKeys={flagKeys} passwordLength={password.value.length}/>
        <HeaderBlock password={password.value}/>
        <ActionBox setCopiedToClipboard={setCopiedToClipboard} buildNewPassword={buildNewPassword} password={password}/>
        <FooterBlock
          customizationButtons={{flagKeys: flagKeys, setFlagKeys: setFlagKeys, buildNewPassword: buildNewPassword}}
          sliderBlock={{value: sliderBlockValue, setValue: setSliderBlockValue, buildNewPassword: buildNewPassword}}
        />
      </main>
    </div>
  )
}

function HeaderBlock({password}: {password: string}) {
  return (
    <div className="border-2 border-black border-b-4 border-t-4 rounded-lg w-full overflow-x-hidden shadow-2xl shadow-gray-500 bg-white">
      <Box className="my-1">
        <span className="text-center w-fit mx-auto p-1 rounded-lg block text-2xl">{password}</span>
      </Box>
    </div>
  )
}

function FooterBlock(props: {customizationButtons: CustomizationButtonsType, sliderBlock: SliderBlockType}) {
  return (
    <div className="border-2 border-black border-b-4 border-t-4 rounded-lg w-full shadow-2xl shadow-gray-500 bg-white">
      <Box className="p-2 text-center bg-black">
        <span className="text-white text-2xl w-fit">Customize your password</span>
      </Box>
      <SliderBlock value={props.sliderBlock.value} setValue={props.sliderBlock.setValue} buildNewPassword={props.sliderBlock.buildNewPassword}/>
      <CustomizationButtons
        flagKeys={props.customizationButtons.flagKeys}
        setFlagKeys={props.customizationButtons.setFlagKeys}
        buildNewPassword={props.customizationButtons.buildNewPassword}
      />
    </div>
  )
}

export const runtime = "edge";