"use client";
import React, { FC, ReactNode, useState } from "react";
import InfoBox, { IInfoBoxProps } from "../info-box/listbox";
import Image from "next/image";
import swagPhotos from "../../photos";

export interface ICountUpProps {
    
}

const CountUp: FC<ICountUpProps> = () => {
  const photos = swagPhotos;
  const listInfoBox: IInfoBoxProps[] = [
    {
      title: "task",
      bgColor: "yellow",
      percent: 100,
      statis: "5/17",
      icon: <Image alt="" src={photos[0].imageSrc} width={100} height={100} />,
    },
    { title: "project", bgColor: "red", percent: 300, statis: "71/100", icon: <p>Icon</p> },
  ];

  const [infoBoxs, setInfoBoxs] = useState<IInfoBoxProps[]>(listInfoBox);
  return (
    <>

      {infoBoxs.map((info) => (
        <>
          <p>{info.title}</p>
          <p>{info.bgColor}</p>
          <p>{info.percent}</p>
          <p>{info.statis}</p>
          <p>{info.icon}</p>
        </>
      ))}
    </>
  );
};

export default CountUp;
