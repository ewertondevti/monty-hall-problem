import PortModel from "../../model/PortModel";

export const createPorts = (quantities: number, selectedDoorToGift: number) =>
  Array.from({ length: quantities }, (_, index) => {
    const position = index + 1;
    const hasGift = position === selectedDoorToGift;
    return new PortModel(position, hasGift);
  });

export const updatePorts = (selectedPort: PortModel, ports: PortModel[]) =>
  ports.map((port) => {
    if (port.port === selectedPort.port) return selectedPort;
    return selectedPort.opened ? port : port.deselect();
  });

export const generateRandomNumber = (max: number) =>
  Math.floor(Math.random() * (max - 1) + 1);

export const openDoors = (ports: PortModel[]) => {
  const selectedPort = ports.find((port) => port.selected === true);
  const giftedPort = ports.find((port) => port.hasGift === true);
  let randomNumber = generateRandomNumber(ports.length);

  while (randomNumber === selectedPort.port)
    randomNumber = generateRandomNumber(ports.length);

  const newPorts = ports.map((port) => {
    if (port.port === giftedPort.port || port.port === selectedPort.port)
      return port;

    return port.changeDoorStatus();
  });

  const filteredNewPorts = newPorts.filter(
    (port) => port.opened === false
  ).length;

  if (filteredNewPorts === 2) return newPorts;

  return newPorts.map((port) => {
    if (port.port === randomNumber) return port.changeDoorStatus();
    return port;
  });
};

export const doChangeSelectedDoor = (ports: PortModel[]) => {
  const updatedPorts = ports.map((port) => {
    if (port.opened === false) return port.changeSelect();
    return port;
  });

  return openAllDoors(updatedPorts);
};

export const openAllDoors = (ports: PortModel[]) =>
  ports.map((port) => port.openDoor());
