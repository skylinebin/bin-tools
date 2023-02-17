import Head from "next/head";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Clipboard from "clipboard";
import styles from "../../styles/Home.module.css";
import halfStyles from "../../styles/half.module.css";
import { CharType, convertLabelCharCode } from "../../src/utils/charcode";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [afterTextInput, setAfterTextInput] = useState("");
  const [highlights, setHighlights] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpenClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConvertClick = useCallback((val: string) => {
    const { str, list } = convertLabelCharCode(val, CharType.HalfToFull);
    const hs = [];
    list.map((item) => hs.push([item,item+1]));
    setHighlights([...hs]);
    setAfterTextInput(str);
  }, []);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
    setTimeout(()=>{
        handleConvertClick(event.target.value);
    }, 100);
  };

  const handleBtnClick = useCallback(() =>{
    handleConvertClick(textInput);
  }, [textInput]);


  const handleAfterTextInputChange = (event) => {
    setAfterTextInput(event);
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
    <div className={halfStyles.container}>
      <Head>
        <title>快来帮小朋友揪出所有半角符号吧~</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={halfStyles.title}>揪出所有半角符号</h1>
        <div className={halfStyles.texts}>
          <TextField
            // inputRef={valRef}
            id="outlined-multiline-static"
            label="Before"
            className={halfStyles.text}
            multiline
            rows={25}
            min-rows={25}
            value={textInput}
            onChange={handleTextInputChange}
            color="secondary"
          />
          <div className={halfStyles.textRight}>
            <HighlightWithinTextarea
                value={afterTextInput}
                highlight={highlights}
                placeholder=""
                readOnly={true}
                // onChange={handleAfterTextInputChange}
            />
          </div>
        </div>
        <div className={halfStyles.buttons}>
          <Button
            variant="contained"
            color="info"
            onClick={handleBtnClick}
            className={halfStyles.button}
          >
            快揪出它(´・ω・`)
          </Button>
          <Button
            data-clipboard-text={afterTextInput}
            variant="contained"
            color="secondary"
            onClick={handleCopyClick}
            className={`${halfStyles.copybutton} copy-btn`}
            style={{
              marginLeft: '20px'
            }}
          >
            复制成稿 ♡.∩▂∩.♡ 
          </Button>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          className={halfStyles.message}
          onClose={handleClose}
          message="复制成功"
        />
      </main>

      <footer>
        <a href='https://www.skylinebin.com' target="_blank" className={halfStyles.power}>
         @SkylineBin for GSM
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 2rem 0;
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          background: #c9d6ff;  /* fallback for old browsers */
          background: -webkit-linear-gradient(to right, rgb(201, 214, 255), rgb(226, 226, 226));  /* Chrome 10-25, Safari 5.1-6 */      
          background: linear-gradient(to right, rgb(201, 214, 255), rgb(226, 226, 226)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */      
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #c9d6ff;  /* fallback for old browsers */
          background: -webkit-linear-gradient(to right, rgb(201, 214, 255), rgb(226, 226, 226));  /* Chrome 10-25, Safari 5.1-6 */      
          background: linear-gradient(to right, rgb(201, 214, 255), rgb(226, 226, 226)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */    
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
