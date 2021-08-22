import React, { useEffect, useState } from "react";
import PortModel from "../model/PortModel";
import Port from "../components/Port";
import {
  createPorts,
  doChangeSelectedDoor,
  generateRandomNumber,
  openAllDoors,
  openDoors,
  updatePorts,
} from "../components/utils";
import styles from "../styles/StartGame.module.css";
import { IData } from "./api/data";
import router from "next/router";

export const StartGame = () => {
  const [ports, setPorts] = useState<PortModel[]>([]);
  const [numberOfDoors, setNumberOfDoors] = useState<number>(0);

  useEffect(() => {
    if (!!numberOfDoors) {
      // GENERATE SORTED PORT
      const sortedDoor = generateRandomNumber(numberOfDoors);
      setPorts(createPorts(numberOfDoors, sortedDoor));
    }
  }, [numberOfDoors]);

  useEffect(() => {
    fetch("/api/data", { method: "GET" })
      .then((response) => response.json())
      .then((data: IData) => setNumberOfDoors(data.numberOfPorts));
  }, []);

  useEffect(() => {
    const hasSelectedPort = ports.some((port) => port.selected === true);
    const filteredPorts = ports.filter((port) => port.opened === false).length;
    const selectedPort = ports.find((port) => port.selected === true);

    if (!!filteredPorts && hasSelectedPort && filteredPorts !== 2) {
      if (confirm("Are you sure?")) setPorts(openDoors(ports));
    } else if (filteredPorts === 2) {
      if (confirm("Do you want to change the selected port?")) {
        setPorts(doChangeSelectedDoor(ports));
      } else setPorts(openAllDoors(ports));
    } else if (!!ports.length && !filteredPorts) {
      if (!!selectedPort?.selected && !!selectedPort?.hasGift) {
        alert("CONGRATULATIONS!!!!");
        setPorts([]);
        setNumberOfDoors(0);
        router.push("/");
      } else {
        alert("SORRY! YOU LOSE!");
        setPorts([]);
        setNumberOfDoors(0);
        router.push("/");
      }
    }
  }, [ports]);

  const handleSelect = (newPort: PortModel) =>
    setPorts(updatePorts(newPort, ports));
  const handleOpen = (newPort: PortModel) =>
    setPorts(updatePorts(newPort, ports));

  const renderContent = () => {
    if (!!ports.length)
      return ports.map((port) => (
        <Port
          port={port}
          handleSelect={handleSelect}
          handleOpen={handleOpen}
          key={port.port}
        />
      ));
  };

  return (
    <div className={styles.home}>
      <h1>Game: Monty Hall Problem</h1>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default StartGame;
