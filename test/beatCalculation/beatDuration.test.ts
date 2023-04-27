import { beatDuration } from "../../logic/beatDuration";

describe('beatDuration', ()=>{
    test('finalBpm is undefined',()=>{
        expect(beatDuration(100)).toBe(600)
    })

    test('accel = 0',()=>{
        expect(beatDuration(100)).toBe(600)
    })

    test('throws if no x values given when necessary',()=>{
        expect(()=>{beatDuration(100,200)}).toThrow()
    })

    test('Accel = -1',()=>{
        expect(beatDuration(60,160,2,8,-1)).toBeCloseTo(110)
    })

    test('Accel = 1',()=>{
        expect(beatDuration(60,160,6,8,1)).toBeCloseTo(110)
    })


})