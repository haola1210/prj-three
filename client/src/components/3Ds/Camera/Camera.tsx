import { PerspectiveCamera } from "@react-three/drei";
import { CameraProps } from "./types";


function Camera({ position } : CameraProps) {
  return (
    <PerspectiveCamera position={position} makeDefault />
  );
}

export default Camera;