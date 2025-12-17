import "@/styles/App.css"
import WebGPUCanvas from "@/components/render/WebGPUCanvas"
import WebGLCanvas from "@/components/render/WebGLCanvas"

function App() {
  return (
    <>
      <WebGPUCanvas />
      {/* <WebGLCanvas /> */}
    </>
  )
}

export default App
