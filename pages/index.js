import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import Dropdown from "../components/dropdown";
export default function Home() {
  const [token1Amount, setToken1Amount] = useState(0);
  const [token2Amount, setToken2Amount] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [showToken, setShowToken] = useState(false);

  const getTokens = async () => {
    try {
      console.log("Getting tokens from CoinGecko API");
      const response = await fetch(
        "https://tokens.coingecko.com/uniswap/all.json"
      );
      const tokenListJson = await response.json();
      console.log("listing available tokens :", tokenListJson);
      const tokens = tokenListJson.tokens;
      console.log("Tokens: ", tokens);
      setTokens(tokens);
    } catch (error) {
      console.log("error in fetching", error);
    }
  };

  const getPrice = async ({ sellToken, buyToken, amount }) => {
    try {
      console.log(
        `Checking the price for ${sellToken} -- ${buyToken} of amount: ${amount} `
      );
      const amountfinal = amount * 10 ** 18;
      const response = await fetch(
        `https://api.0x.org/swap/v1/price?sellToken=${sellToken}&buyToken=${buyToken}&sellAmount=${amountfinal}`
      );
      const priceJson = response.json();
      console.log("Price fetched ", priceJson);
    } catch (error) {
      console.log("Error in fetching the price ", error);
    }
  };

  // to get the qoute price which is real price the user will get
  const getQuote = async () => {};

  // to execute the actual swap on the network according to the preference
  const trySwap = async () => {};

  /// Source : https://docs.alchemy.com/alchemy/road-to-web3/weekly-learning-challenges/9.-how-to-build-a-token-swap-dapp-with-0x-api
  /// Website : https://docs.0x.org/0x-api-swap/api-references#introduction
  /// Repo : https://github.com/0xProject/swap-demo-tutorial/tree/main/swap-demo-tutorial-part-9
  /// Remaining
  // - To show the dropdown menue
  // - set the token to the chosen one and other details
  // - Manage the connected wallet and get the required details
  // - To make the check Price function
  // - To set the token allowance
  // - To prepare the above remaining functions , Quote and Try Swap

  const Dropdown = ({ tokens }) => {
    return (
      <div className={styles.dropdown}>
        <div className={styles.dropdownContent}>
          <div className={styles.dropdownItem}>
            ///mapping for the content
            {!tokens.length && getTokens()}
            {tokens.length &&
              tokens.map((token) => {
                return (
                  <div className={styles.tokenBox}>
                    <img className={styles.logo} src={token.logoURI} />
                    <a className={styles.name}>{token.symbol}</a>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  };

  // useEffect({

  // },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Swap Dex</title>
        <meta name="description" content="Swap a token of your choice" />
        <link rel="icon" href="/swap.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Token Swap</a>
        </h1>

        <p className={styles.description}>
          Get started by choosing the token pair you want to swap
        </p>

        <div className={styles.wallet}>
          <ConnectButton />
        </div>

        <div className={styles.swapContainer}>
          <div className={styles.text}>Swap </div>
          <div className={styles.tokenContainer}>
            <div className={styles.tokenBox}>
              <img />
              <a>Token1</a>
              {showToken && <Dropdown />}
              <button
                onClick={() => {
                  setShowToken(true);
                }}
                className={styles.button2}
              ></button>
            </div>
            <div className={styles.selectBox}>
              <input
                className={styles.input2}
                type="number"
                value={token1Amount}
                placeholder="Amount"
                onChange={(e) => {
                  setToken1Amount(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className={styles.tokenContainer}>
            <div className={styles.tokenBox}>
              <img />
              <a>Token2</a>
              {showToken && <Dropdown tokens={tokens} />}
              <button
                onClick={() => {
                  setShowToken(true);
                }}
                className={styles.button2}
              ></button>
            </div>
            <div className={styles.selectBox}>
              <input
                className={styles.input2}
                type="number"
                value={token2Amount}
                placeholder="Amount"
                onChange={(e) => {
                  setToken2Amount(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className={styles.firstRow}>
            <a>Estimated Gas:</a>
          </div>
          <div className={styles.buttonRow}>
            <button className={styles.button}>Swap</button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://twitter.com/0xdhruva">Buitlt by @0xdhruva </a>
      </footer>
    </div>
  );
}
