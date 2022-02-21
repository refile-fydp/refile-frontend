import React from 'react'

function AttachmentModel({ attachments }) {
    return (
        <div>
            {attachments.map(attachment => (
                <p>{attachment.subject}</p>
            ))}
        </div>
    );
}

  export default AttachmentModel