import React, { useState } from 'react';
import { Button } from "@chakra-ui/react";
import { SiGooglemaps } from "react-icons/si";
import  MyMap1  from './MyMap1';

export default function Home() {
  const [showMap, setShowMap] = useState(true);

  const toggleMap = () => setShowMap(!showMap);

  return (
    <>
      <div style={{ 
        position: 'fixed', 
        bottom: '40px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 10 
      }}>
        <Button leftIcon={<SiGooglemaps style={{ color: '#3EB489' }}/>} 
            colorScheme='gray' 
            onClick={toggleMap} 
            size='lg'>
            {showMap ? "지도 숨기기" : "지도 보기"}
        </Button>
      </div>

      {showMap && <MyMap1  />}
    </>
  );
}