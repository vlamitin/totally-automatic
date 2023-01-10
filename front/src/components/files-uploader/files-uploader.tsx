import React from 'react'
import { get } from 'lodash'

export interface FilesUploaderState {
    files: File[]
}

type StateGetter = () => FilesUploaderState

export interface FilesUploaderProps {
    onFilesUploaded: (files: File[]) => void
    getStateGetter?: (stateGetter: StateGetter) => void
}

export const FilesUploader: React.FC<FilesUploaderProps> = ({ onFilesUploaded, getStateGetter }) => {
    const [files, setFiles] = React.useState([])

    getStateGetter(() => ({ files }))

    return (
        <div>
            { files.map((file: File) => (
                <p key={file.name}>{file.name}</p>
            )) }
            <input
                type="file"
                multiple
                onChange={event => {
                    const newFiles = getFilesFromEvent(event)
                    setFiles(newFiles)
                    onFilesUploaded(newFiles)
                }}
            />
        </div>
    )
}

function getFilesFromEvent(event: any): File[] {
    return Array.from(
        get(event, 'dataTransfer.files')
        || get(event, 'dataTransfer.items')
        || get(event, 'target.files')
        || []
    )
}
