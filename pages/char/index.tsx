import Head from "next/head";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Clipboard from "clipboard";
import styles from "../../styles/Home.module.css";
import charStyles from "../../styles/char.module.css";
import { CharType, convertCharCode } from "../../src/utils/charcode";

export default function Home() {
  const [textInput, setTextInput] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpenClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConvertClick = useCallback(() => {
    const convertValue = convertCharCode(textInput, CharType.HalfToFull);
    setTextInput(convertValue);
  }, [textInput]);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };
  const handleCopyClick = useCallback(() => {
    const copy = new Clipboard(".copy-btn");
    copy.on("success", (e) => {
      console.info(e);
      handleOpenClick();
      setTimeout(() => {
        handleClose();
      }, 1500);
    });
    copy.on("error", function (e) {
      console.error("Action:", e.action);
      console.error("Trigger:", e.trigger);
    });
  }, []);

  return (
    <div className={charStyles.container}>
      <Head>
        <title>全角半角转换器</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={charStyles.title}>全角半角转换器</h1>
        <div>
          <TextField
            // inputRef={valRef}
            id="outlined-multiline-static"
            label="待转换内容"
            className={charStyles.text}
            multiline
            rows={15}
            min-rows={15}
            value={textInput}
            onChange={handleTextInputChange}
          />
        </div>
        <div className={charStyles.buttons}>
          <Button
            variant="contained"
            color="success"
            onClick={handleConvertClick}
            className={charStyles.button}
          >
            半角转全角
          </Button>
          <Button
            data-clipboard-text={textInput}
            variant="contained"
            color="info"
            onClick={handleCopyClick}
            className={`${charStyles.copybutton} copy-btn`}
            style={{
              marginLeft: '20px'
            }}
          >
            复制
          </Button>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          className={charStyles.message}
          onClose={handleClose}
          message="复制成功"
        />
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="./vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
        <a href='https://www.skylinebin.com' target="_blank" className={charStyles.power}>
         @SkylineBin for GSM
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
