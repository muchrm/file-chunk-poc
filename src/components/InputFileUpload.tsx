import { ChangeEventHandler, DragEventHandler, useCallback, useRef, useState } from 'react';
import './InputFileUpload.css';

export type InputFileUploadProps = {
    isDisabled: boolean,
    uploadFileHandler: (file: File) => void
}
export default function InputFileUpload({ isDisabled, uploadFileHandler }: InputFileUploadProps) {

    const inputRef = useRef<HTMLInputElement>(null);
    const [isDrageOver, setIsDrageOver] = useState(false);
    const [validateError, setValidateError] = useState<string | null>(null);

    const memoizedOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            if(isDisabled) {
                return;
            }
            if (event.target.files != null && event.target.files.length > 0) {
                const file = event.target.files[0] as File;
                if(file.name.split('.').pop() !== 'csv'){
                    setValidateError("Only csv files are allowed");
                    return;
                }
                uploadFileHandler(event.target.files[0]);
                if (inputRef.current) {
                    inputRef.current.value = "";
                }
            }
        },
        [isDisabled, uploadFileHandler]
    );

    const memoizedOnFileDrop: DragEventHandler<HTMLDivElement> = useCallback(
        (ev) => {
            ev.preventDefault();
            if(isDisabled) {
                return;
            }
            if (ev.dataTransfer.items && ev.dataTransfer.items.length > 0 && ev.dataTransfer.items[0].kind === 'file') {
                const file = ev.dataTransfer.items[0].getAsFile() as File;
                if(file.name.split('.').pop() !== 'csv'){
                    setValidateError("Only csv files are allowed");
                    return;
                }
                uploadFileHandler(file);
            } else if (ev.dataTransfer.files.length > 0) {
                const file = ev.dataTransfer.files[0] as File;
                if(file.name.split('.').pop() !== 'csv'){
                    setValidateError("Only csv files are allowed");
                    return;
                }
                uploadFileHandler(file);
            }
            setIsDrageOver(false);
        },
        [isDisabled, uploadFileHandler]
    );

    const onDragOver: DragEventHandler<HTMLDivElement> = (ev) => {
        ev.preventDefault();
        setIsDrageOver(true);
    }
    const onDragLeave: DragEventHandler<HTMLDivElement> = (ev) => {
        ev.preventDefault();
        setIsDrageOver(false);
    }


    return (
        <div className={`input-file-continer ${isDrageOver ? 'dragOver':''} ${isDisabled ? 'no-drop':''} `} onDrop={memoizedOnFileDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}>
            <img className="csv-icon" src={"./assets/csv-icon.png"} alt="csv-icon" />
            <div className='drag-drop-label'>Drag your .csv file here to start uploading.</div>
            <span className="file-select-or">OR</span>
            <div className="selectFile">
                <label htmlFor="file" >Browse File</label>
                <input ref={inputRef} type="file" accept=".csv" name="file" onChange={memoizedOnChange} disabled={isDisabled} />
            </div>
            { validateError && <span className='validate-error'> * {validateError}</span> }
        </div>
    );
}