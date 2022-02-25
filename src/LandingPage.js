import './LandingPage.css';
import * as FaIcons from "react-icons/fa"
import React, {useEffect, useState} from "react";
import FolderList from './components/FolderList';
import ThreadList from './components/ThreadList';
import { getSyncAttachments, getFirstAttachments, getUserInformation } from './ApiContract';
import AddNewFolder from './AddNewCategory';
import AttachmentsTable from './components/AttachmentsTable';


function LandingPage() {

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

  const [workspace, setWorkspace] = useState("files");
  const [folderSelected, setFolderSelected] = useState();
  const [threadSelected, setThreadSelected] = useState();
  const [categories, setCategories] = useState();
  const [threads, setThreads] = useState(threadPresetList);
  const [quickFilters, setQuickFilters] = useState(quickFiltersList);

  useEffect(() => getAttachments(), [])
  useEffect(() => getUserInfo(), [])

  function addCategory(category) {
    setCategories([category, ...categories]);
  }

  function addQuickFilters(quickFilters) {
    setCategories([quickFilters, ...quickFilters]);
  }

  const [attachments, setAttachments] = useState([]);
  const [userInfo, setUserInfo]= useState([]);

  async function getUserInfo() {
    var userInfo = await getUserInformation();
    console.log(userInfo.categories);
    setUserInfo(userInfo)
  }

  async function getAttachments() {
    var attachments = await getFirstAttachments();
    setAttachments(attachments);
  }



  async function refreshAttachments() {
    setAttachments([]);
    var result = await getSyncAttachments();
    setAttachments(result);
  }

  
  return (
    <div className="app">
      <button onClick={refreshAttachments}>REFRESH ATTACHMENTS</button>

      <div className="app__header">
        <p className="header__title">Re:File</p>
        <p className="header__subtitle">{userInfo.email}</p>

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
          <AddNewFolder addCategory={addCategory}/>
          <p className='app__folder__title'>Threads</p>
          <ThreadList setThreadSelected={setThreadSelected} threads={threads}></ThreadList>
        </div>

        <div className="app__attachments">
            <p className='app__toolbar__option__title' onClick={() => setWorkspace("files")}>Files</p>
            <p className='app__toolbar__option__title' onClick={() => setWorkspace("folders")}>Folders</p>
            
            {workspace == "files" && 
              <AttachmentsTable from={'files'} attachments={attachments}></AttachmentsTable> 
            }

            {workspace == "folders" && 
              <div>
                <FolderList setFolderSelected={setFolderSelected} folders={userInfo.categories} />
                <p className='app__folder__selected__title'>{folderSelected}</p>
                <AttachmentsTable from={'folders'} filter={folderSelected} attachments={attachments}></AttachmentsTable>
          
              </div>
            }    

        </div>
      </div>

    </div>
  );
}

export default LandingPage;
