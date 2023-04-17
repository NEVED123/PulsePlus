import { Song, Subdivisions, Beat } from '../../logic/structure'
import { getActiveBeat } from '../../logic/SongFunctions'

describe('getActiveBeat', ()=>{
    test('returns the active beat',()=>{
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
  
      const result : Beat = {
        beatSound : 0,
        subDiv : Subdivisions.none,
          
        active : true
        }
  
      expect(getActiveBeat(received)).toEqual(result)
    })
  
    test('throws error when song contains no active beat', ()=>{
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
  
      expect(()=>{
        getActiveBeat(received)
      }).toThrow()
    })
  })