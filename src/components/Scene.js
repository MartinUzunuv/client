import React, { useRef, useEffect } from "react";
import * as BABYLON from "babylonjs";

const Scene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    var engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });


    var createScene = async function () {
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
        sphere.position.y = 1;
      
        const env = scene.createDefaultEnvironment();
      
        const xr = await scene.createDefaultXRExperienceAsync({
          floorMeshes: [env.ground],
        });
        engine.runRenderLoop(function () {
            scene.render();
          });
          window.addEventListener("resize", function () {
            engine.resize();
          });
          console.log(xr)
        return scene;
      };



    var scene = createScene();
    console.log(scene)
    // engine.runRenderLoop(function () {
    //   scene.render();
    // });
    // window.addEventListener("resize", function () {
    //   engine.resize();
    // });
  }, []);

  return <canvas width="600" height="400" ref={canvasRef} />;
};

export default Scene;
