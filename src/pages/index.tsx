import type { NextPage } from "next";
import Head from "next/head";
import React, { useRef } from "react";
import styles from "../styles/Home.module.css";
import { IData } from "./api/data";
import router from "next/router";

const Home: NextPage = () => {
  const inputRef = useRef(null);

  const postData = (numberOfPorts: number) => {
    const data: IData = { numberOfPorts };

    return fetch("/api/data", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const handleClick = async () => {
    let response;

    if (Number(inputRef.current.value) > 10) response = await postData(10);
    else if (Number(inputRef.current.value) < 0) response = await postData(0);
    else response = await postData(Number(inputRef?.current.value));

    if (response.ok) router.push("/start_game");
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (Number(inputRef.current.value) > 10) inputRef.current.value = 10;
    else if (Number(inputRef.current.value) < 0) inputRef.current.value = 0;
    else inputRef.current.value = e.target.value;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Game: Monty Hall Problem</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.question}>
          <h3>Choose the number of ports (Max 10):</h3>
          <input
            type="number"
            className={styles.inputNumber}
            defaultValue={0}
            max={10}
            min={0}
            ref={inputRef}
            onBlur={handleOnBlur}
          />
          <button onClick={handleClick}>Start Game</button>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
