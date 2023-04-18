import { Song, Subdivisions, Beat } from '../../logic/structure'
import { getNextBeat } from '../../logic/SongFunctions'

describe('getNextBeat',()=>{
    test('returns first beat if meter contains no active beat',()=>{
        const received : Song = {
            song:[{
              initBpm: 100,
              finalBpm: 200,
              denominator: 4,
              repeat : 1,
              active: true,
              beats:[{
                    beatSound : 0,
                    subDiv : Subdivisions.none,
                    active : false 
                  }
                ]
              },
            ],
            repeat: true, 
        }

        const expected : Beat = {
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : false
        }

        expect(getNextBeat(received)).toEqual(expected)  
    })

    test('song has active beat',()=>{
        const received : Song = {
            song:[{
              initBpm: 100,
              finalBpm: 200,
              denominator: 4,
              repeat : 1,
              active: true,
              beats:[{
                    beatSound : 0,
                    subDiv : Subdivisions.none,
                    active : true 
                  },
                  {
                    beatSound : 1,
                    subDiv : Subdivisions.none,
                    active : false 
                  }
                ]
              },
            ],
            repeat: true, 
        }

        const expected : Beat = {
            beatSound : 1,
            subDiv : Subdivisions.none,
            active : false 
          }

        expect(getNextBeat(received)).toEqual(expected)
    })
})