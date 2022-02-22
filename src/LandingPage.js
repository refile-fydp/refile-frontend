import './LandingPage.css';
import * as FaIcons from "react-icons/fa"
import React, {useEffect, useState} from "react";
import FolderList from './components/FolderList';
import ThreadList from './components/ThreadList';

import AddNewFolder from './AddNewFolder';
import QuickFilterList from './components/QuickFilterList';
import AttachmentsTable from './components/AttachmentsTable';
import axios from 'axios';
import GetAttachmentsData from './GetAttachmentsData.json'
import { Attachment } from './models/Attachment';
import AttachmentModel from './models/AttachmentModel';

function LandingPage({setUserId}) {
  React.useEffect(() => pushingP2(), [])


  const [folderSelected, setFolderSelected] = useState();
  const [threadSelected, setThreadSelected] = useState();

  var baseUrl = "";
  switch(process.env.NODE_ENV) {
    case 'production':
      baseUrl = "https://api.refile.email"
    default:
      baseUrl = 'https://refile-dev.herokuapp.com'
  }

  const api = axios.create({
    withCredentials: true,
    baseURL: baseUrl
 })

  const folderPresetList = [
    {name: 'All attachments'},
    {name: 'Bookmark'},
    {name: 'Receipt'},
    {name: 'Design'},
    {name: 'Invoice'},
    {name: 'Contract'}
  ];

  const threadPresetList = [
    {name: 'Thread1', sender: 'tosh@gmail.com', date: '07/14/2021'},
    {name: 'Thread2', sender: 'tosh@gmail.com', date: '07/14/2021'},
    {name: 'Thread3', sender: 'tosh@gmail.com', date: '07/14/2021'},
  ];

  const quickFiltersList = [
    {name: 'sent by me'},
    {name: 'from past year'},
    {name: 'pdf files'},
  ];

  const [folders, setFolders] = useState(folderPresetList);
  const [threads, setThreads] = useState(threadPresetList);

  const [quickFilters, setQuickFilters] = useState(quickFiltersList);

  function addFolder(folder) {
      setFolders([folder, ...folders]);
  }

  function addQuickFilters(quickFilters) {
    setFolders([quickFilters, ...quickFilters]);
  }

  async function pushingP3() {
    var result = await api.get('/attachments/1');

    console.log("The Heroku Api Response is: " + result.data);
  }
  const [attachments, setAttachments] = useState([]);
  const [workspace, setWorkspace] = useState('files');

  const arraylist = [];

  function pushingP2() {
    GetAttachmentsData.map((object) => {
      console.log(object);
      arraylist.push(object)
    })
    setAttachments(arraylist);
  }

  return (
    <div className="app">
      <button onClick={pushingP3}>PUSHING Attachmennts</button>
      <button onClick={pushingP2}>PUSHING PPP</button>

      <div className="app__header" onChange={pushingP2}>
        <p className="header__title">Attachment Manager</p>
        <p className="header__subtitle">sydefydp2022@gmail.com</p>

        <form className="header__searchform" >
          <input 
            type="text"
            className='header__searchform__input'
            placeholder="Search file names, users, or subjects">
          </input>
          <FaIcons.FaSearch
            className='header__searchform__submit'
            type="submit"
            value="Search">
          </FaIcons.FaSearch> 
        </form>
      </div>

      <div className="app__main">
        <div className="app__folder">
          <AddNewFolder addFolder={addFolder}/>
          <p className='app__folder__title'>Threads</p>
          <ThreadList setThreadSelected={setThreadSelected} threads={threads}></ThreadList>
        </div>

        <div className="app__attachments">
            <p className='app__toolbar__option_title' onClick={() => setWorkspace("files")}>Files</p>
            <p className='app__toolbar__option_title' onClick={() => setWorkspace("folder")}>Folder</p>
            {workspace == "files" && 
              <AttachmentsTable attachments={attachments}></AttachmentsTable> 
            }
            {workspace == "folder" &&
              <div>
                <p>{folderSelected}</p>
                <AttachmentsTable filter={folderSelected} attachments={attachments}></AttachmentsTable> 

                <FolderList setFolderSelected={setFolderSelected} folders={folders} />
              </div>

            }

            

        </div>
      </div>

    </div>
  );
}

export default LandingPage;
