import React from 'react'

export default function FolderTile({folder}) {
    function openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
      }
    return (
        <p>{folder.name}</p>

        )
}
