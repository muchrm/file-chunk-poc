export const chunkFile = (file: File, chunkSize: number): Blob[] => {
    const chunks: Blob[] = [];
    const chunkCount = Math.ceil(file.size / chunkSize);
    for (let i = 0; i < chunkCount; i++) {
        chunks.push(getChunkAtIndex(file, i, chunkSize));
    }
    return chunks;
}
export const getChunkAtIndex = (file: File,index: number, chunkSize: number): Blob => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    return file.slice(start, end);
}