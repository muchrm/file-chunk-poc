import { chunkFile, getChunkAtIndex } from "./file-util";

describe('getChunkAtIndex', () => {
    it('should return a blob of the correct size', () => {
        const file = new File([new ArrayBuffer(1024*6)], 'test.txt', { type: 'text/plain' });
        const chunk = getChunkAtIndex(file, 0, 1024);
        expect(chunk.size).toBe(1024);
    })
    
    it('should return a remaining blob of when size is less then chunk', () => {
        const file = new File([new ArrayBuffer(500)], 'test.txt', { type: 'text/plain' });
        const chunk = getChunkAtIndex(file, 0, 1000);
        expect(chunk.size).toBe(500);
    })

    it('should return a empty blob of when size is exceed limit', () => {
        const file = new File([new ArrayBuffer(500)], 'test.txt', { type: 'text/plain' });
        const chunk = getChunkAtIndex(file, 5, 1000);
        expect(chunk.size).toBe(0);
    })
    
})

describe('chunkFile', () => {
    it('should split file to correct size', () => {
        const file = new File([new ArrayBuffer((1024*3) + 500)], 'test.txt', { type: 'text/plain' });
        const chunk = chunkFile(file, 1024);
        expect(chunk.length).toBe(4);
        expect(chunk[0].size).toBe(1024);
        expect(chunk[1].size).toBe(1024);
        expect(chunk[2].size).toBe(1024);
        expect(chunk[3].size).toBe(500);
    })
})