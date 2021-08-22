import styles from "../../styles/Gift.module.css";

const Gift = () => {
  return (
    <div className={styles.gift}>
      <div className={styles.cover}></div>
      <div className={styles.body}></div>
      <div className={styles.ribbon1}></div>
      <div className={styles.ribbon2}></div>
    </div>
  );
};

export default Gift;
