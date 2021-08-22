import PortModel from "../../model/PortModel";
import styles from "../../styles/Port.module.css";
import Gift from "../Gift";

interface IProps {
  port: PortModel;
  handleSelect: (newDoor: PortModel) => void;
  handleOpen: (newDoor: PortModel) => void;
}

const Port = ({ port, handleSelect, handleOpen }: IProps) => {
  const handleOpenClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    handleOpen(port.changeDoorStatus());
  };

  const ClosedDoor = () => (
    <div className={styles.door}>
      <div className={styles.doorNumber}>{port.port}</div>
      <div className={styles.doorHandle} onClick={handleOpenClick}></div>
    </div>
  );

  const renderDoor = () => {
    if (port.opened) return port.hasGift && <Gift />;

    return <ClosedDoor />;
  };

  return (
    <div
      className={styles.area}
      onClick={() => handleSelect(port.changeSelect())}
    >
      <div
        className={`${styles.structure} ${port.selected && styles.selected}`}
      >
        {renderDoor()}
      </div>

      <div className={styles.floor}></div>
    </div>
  );
};
export default Port;
