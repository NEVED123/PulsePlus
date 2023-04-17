import { Song, Subdivisions } from '../../logic/structure'
import { getAccel } from '../../logic/SongFunctions'

describe('getAccel',()=>{
    test('gets Accel coefficient',()=>{
      const received: Song = {
        song:[{
          initBpm: 100,
          finalBpm: 200,
          accel: 5,
          denominator: 4,
          repeat : 10,
          active: true,
          beats:[{
                beatSound : 0,
                subDiv : Subdivisions.none,
                  
                active : false
              },
            ]
          },
        ],
        repeat: true,
        
        
        
      }  
  
      expect(getAccel(received)).toEqual(5)
    })
  
  })