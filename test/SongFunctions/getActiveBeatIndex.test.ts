import { Song, Subdivisions } from '../../logic/structure'
import { getActiveBeatIndex } from '../../logic/SongFunctions'

describe('getActiveBeatIndex',()=>{
    test('returns active beat Index of active meter',()=>{
      const received : Song = {
        song:[{
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: true,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
                
              active : true
              }
            ]
          }
        ],
        repeat: true,
        
        
        
      }
  
      expect(getActiveBeatIndex(received)).toBe(0)
    })
  
    test('returns -1 if there is no active beat',()=>{
      const received : Song = {
        song:[{
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: true,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              active : false
              }
            ]
          }
        ],
        repeat: true,
        
        
        
      }
  
      expect(getActiveBeatIndex(received)).toBe(-1)
    })
  
  })