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
    <div style={{backgroundImage: `url("https://source.unsplash.com/E8Ufcyxz514/2400x1823")`, backgroundSize: "1920px 1080px"}} className="w-screen h-screen flex justify-center items-center">
      <main id="card" className="w-11/12 sm:w-8/12 md:w-9/12 lg:w-2/3 xl:w-1/2 h-9/12 sm:h-9/12 flex flex-col justify-start box-border p-5 sm:p-8 rounded-2xl border-4 border-black">
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
    <div className="border-2 border-black border-b-4 border-t-4 rounded-lg w-full overflow-x-scroll sm:overflow-x-hidden box-border whitespace-nowrap">
      <Box className="my-1 w-full">
        <span key={password} className="block text-center w-fit mx-auto p-1 rounded-lg text-2xl">{password}</span>
      </Box>
    </div>
  )
}

function FooterBlock(props: {customizationButtons: CustomizationButtonsType, sliderBlock: SliderBlockType}) {
  return (
    <div className="border-2 border-black border-b-4 border-t-4 rounded-lg w-full">
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