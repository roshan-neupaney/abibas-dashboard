'use client'
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { IMAGE_URL } from '../../../config/constants';

const ReactPhotoSphereViewer = dynamic(
  () =>
    import('react-photo-sphere-viewer').then(
      (mod) => mod.ReactPhotoSphereViewer
    ),
  {
    ssr: false,
  }
);

const VehicleInterior360View =({IntImages360}: any) => { 
  return (
    <div className="">
      <ReactPhotoSphereViewer src={IMAGE_URL+ '/' + IntImages360[0]?.image_name} height={'73vh'} width={"100%"}/>
    </div>
  );
}

export default VehicleInterior360View;