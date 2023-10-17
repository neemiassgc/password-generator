import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

export default function Home() {
  return (
    <div className="w-screen h-screen bg-blue-500 flex justify-center items-center">
      <main className="w-1/2 h-2/3 bg-red-200 grid grid-rows-2 gap-10">
        <Box className="bg-green-500 border-2 w-full p-3 border-black basis-1/4">
          <span>asodjfalkçsdfmçaklsdf</span>
        </Box>
        <Box className="bg-orange-500 p-3 border-2 border-black w-full basis-1/4">
          <Button>One button</Button>
        </Box>
      </main>
    </div>
  )
}