import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Hiragino Kaku Gothic Pro;
  }

  body.fontLoaded {
    font-family: Hiragino Kaku Gothic Pro ;
  }

  #app {
    background-color: transparent;
    position: relative
    top: 0;
    left: 0;
    right: 0; 
    bottom: 0;
    z-index: 1;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Hiragino Kaku Gothic Pro;
    line-height: 1.5em;
  }

  ::-webkit-scrollbar {
    width: 0px;  
    background: transparent;  
  }
  /* optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
    display: none; 
  }
  li.active{
    padding-bottom:0px;
    border-bottom: 2px solid #cc3a2f;
    color: #cc3a2f;
  }

   button.button-active{
    color: white;
    background:#CA3C35;
  }

  div.div-active{
    color: white;
    background:#CA3C35;
  }

  button.button-request-active{
    color: white;
    background:#0098aa;
  }

  .postItem:nth-child(odd) {
    padding-left: 0px;
    padding-right: 5px;
  }

  .postItem:nth-child(even) {
    padding-left: 5px;
    padding-right: 0px;
  }

  button.button-active {
    outline: none;
  }

  /* Style The Checkbox */
  .round {
    position: relative;
  }
  
  .round label {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 28px;
    left: 0;
    position: absolute;
    top: 0;
    width: 28px;
  }
  
  .round label:after {
    border: 2px solid #cc3a2f;
    border-top: none;
    border-right: none;
    content: "";
    height: 6px;
    left: 7px;
    opacity: 0;
    position: absolute;
    top: 8px;
    transform: rotate(-45deg);
    width: 12px;
  }
  
  .round input[type="checkbox"] {
    visibility: hidden;
  }
  
  .round input[type="checkbox"]:checked + label {
    background-color: #fff;
    border-color: #ccc;
  }
  
  .round input[type="checkbox"]:checked + label:after {
    opacity: 1;
  }

  /* Style The Dropdown */

  .dropbtn {
    width: 100%;
    height:35px;
    background-color: white; 
    display: flex;
    flex-direction: row;
    color: #696969;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #a1a1a1;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    font-size:12px;
    padding: 3px;
  }

.dropbtn:hover, .dropbtn:focus {
}

.dropdown {
 }

.dropdown-content {
    display: block;
    position: absolute;
    background-color: white;
    width: 50%;
    overflow: auto;
    border: 1px solid #a1a1a1;
    border-top-style: none;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 2;
}

.dropdown-content a {
    color: black;
    padding: 8px 3px;
    text-decoration: none;
    border: 1px solid #f2f2f2;
    border-right-style: none;
    border-left-style: none;
    border-top-style: none;
    display: block;
    font-size: 12px;
}

.dropdown a:hover {background-color: #f1f1f1}

.show {display:block;}

/* Input*/
input::-webkit-input-placeholder {
  font-size: 11px;
}

/* WxImageViewer */
.wx-image-viewer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.wx-image-viewer .viewer-cover {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
}
.wx-image-viewer .viewer-list-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.wx-image-viewer .viewer-image-container {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.wx-image-viewer .viewer-image-container img {
  position: absolute;
}
.wx-image-viewer .viewer-image-pointer {
  position: fixed;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
}
.wx-image-viewer .viewer-image-pointer .pointer {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0 5px;
  border-radius: 100%;
  background-color: #333;
}
.wx-image-viewer .viewer-image-pointer .pointer.on {
  background-color: #fff;
}
.wx-image-viewer .viewer-image-loading {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  border-radius: 100%;
  border-width: 4px;
  border-style: solid;
  border-color: #333;
  border-bottom-color: #FFF;
  -webkit-animation: roll 1s linear infinite;
  animation: roll 1s linear infinite;
}
/* view more button*/
.button-view-more {
  width: 70%;
  height:50px;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  outline: none;
}

.button-view-more:hover {}

.button-view-more:active {
  background-color: #999999
}

/* search button*/
.button-search {
  width: 47%;
  height:50px;
  background-color: white;
  color: black;
  border: 1px solid #696969;
  border-radius: 7px;
  margin-right:5px;
  font-size: 14px;
  outline: none;
}

.button-search:hover {}

.button-search:active {
  background-color: #999999
}

.loader-wrapper {
  position: fixed;
  width:100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
}

.loader {
  border: 0.125em solid rgba(0,152,170,0.2);
  border-radius: 50%;
  border-top: 0.125em solid #0098aa;
  width: 1.5em;
  height: 1.5em;
  font-size:32px;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`;

