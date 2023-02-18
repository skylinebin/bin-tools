import Head from "next/head";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Clipboard from "clipboard";
import diffStyles from "../../styles/diff.module.css";
import { diffStrings } from "../../src/utils/diff";
import { Alert } from "@mui/material";

export default function Diff() {
  const [textInput, setTextInput] = useState("");
  const [afterTextInput, setAfterTextInput] = useState("");
  const [diffTexts, setDiffTexts] = useState("");
  const [highlights, setHighlights] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpenClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDiffClick = useCallback((val: string, val2: string) => {
    const res = diffStrings(val, val2);
    const hls = [];
    let resStr = '';
    let count = 0;
    Object.values(res).map((item: any) => {
      console.info('value:', item);
      if(item.added || item.removed) {
        hls.push({
          highlight: [count, count + item.count],
          className: item.added ? diffStyles.green: diffStyles.red
        });
      }
      resStr += item.value;
      count += item.count;
    });
    setDiffTexts(resStr);
    setHighlights([...hls])
  }, []);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleBtnClick = useCallback(() =>{
    handleDiffClick(textInput, afterTextInput);
  }, [textInput, afterTextInput]);


  const handleAfterChange = (value) => {
    setAfterTextInput(value.target.value);
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
    <div className={diffStyles.container}>
      <Head>
        <title>快来文本找不同~</title>
        <link rel="icon" href="/bingxiang.ico" />
      </Head>

      <main>
        <h1 className={diffStyles.title}>让我康康是谁动了我的稿子！！</h1>
        <div className={diffStyles.texts}>
          <TextField
            id="outlined-multiline-static"
            label="文本原稿"
            className={diffStyles.text}
            multiline
            rows={18}
            min-rows={18}
            value={textInput}
            onChange={handleTextInputChange}
            color="secondary"
          />
          <TextField
            id="outlined-multiline-static"
            label="修改稿"
            className={diffStyles.textRight}
            style={{
              marginLeft: '2vw'
            }}
            multiline
            rows={18}
            min-rows={18}
            value={afterTextInput}
            onChange={handleAfterChange}
            color="info"
          />
        </div>
        {
          diffTexts && (<>       
          <div className={diffStyles.diffRes}>
            <HighlightWithinTextarea
                value={diffTexts}
                highlight={highlights}
                placeholder=""
                readOnly={true}
            />
          </div>
          <div className={diffStyles.tips}>Tips：<span className={diffStyles.green}>绿色</span>内容为新增内容，<span className={diffStyles.red}>红色</span>内容为删除内容~</div>
          </>
          )
        }
        <div className={diffStyles.buttons}>
          <Button
            variant="contained"
            color="info"
            onClick={handleBtnClick}
            className={diffStyles.button}
          >
            来找不同吧(´・ω・`)
          </Button>
          <Button
            data-clipboard-text={afterTextInput}
            variant="contained"
            color="secondary"
            onClick={handleCopyClick}
            className={`${diffStyles.copybutton} copy-btn`}
            style={{
              marginLeft: '20px'
            }}
          >
            复制修改稿 ♡.∩▂∩.♡ 
          </Button>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          className={diffStyles.message}
          onClose={handleClose}
          // message="复制成功"
        >
            <Alert severity="success" sx={{ width: '100%' }}>
            复制成功
            </Alert>
        </Snackbar>
      </main>

      <footer>
        <a href='https://www.skylinebin.com' target="_blank" className={diffStyles.power}>
         @SkylineBin for GSM
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 2rem 0 1.5rem;
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          /* background: #c9d6ff;  /* fallback for old browsers */
          background: -webkit-linear-gradient(to right, rgb(201, 214, 255), rgb(226, 226, 226));  /* Chrome 10-25, Safari 5.1-6 */      
          background: linear-gradient(to right, rgb(201, 214, 255), rgb(226, 226, 226)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */       */
        }
        footer {
          width: 100%;
          height: 80px;
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
