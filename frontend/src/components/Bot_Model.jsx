import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three'; // Ensure THREE is imported

const Bot_Model = () => {
    const actionRef = useRef();
    const { scene, animations } = useGLTF('../../Bot_Waving.glb');
    const { actions } = useAnimations(animations, scene);

    // To know animation name
    useEffect(() => {
        if (animations) {
            animations.forEach((animation, index) => {
                console.log(`Animation ${index}: ${animation.name}`);
            });
        }
    }, [animations]);

    useEffect(() => {
        if (actions && actions['Armature|mixamo.com|Layer0']) {
            actionRef.current = actions['Armature|mixamo.com|Layer0'];
            actionRef.current.setLoop(THREE.LoopRepeat, Infinity);
            actionRef.current.play();
        }
    }, [actions]);

    return (
        <primitive
            object={scene}
            scale={[3, 3, 3]}
            position={[1, -2.8, 0]}
            rotation={[0.3, -0.5, 0]}
        />
    );
}

export default Bot_Model;