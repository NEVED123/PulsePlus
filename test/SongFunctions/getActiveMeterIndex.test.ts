import { Song, Subdivisions } from '../../logic/structure'
import { getActiveMeterIndex } from '../../logic/SongFunctions'

describe('getActiveMeterIndex',()=>{
    test('returns index of active meter',()=>{
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
          },
          {
            initBpm: 100,
            denominator: 4,
            repeat : 1,
            active: false,
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
  
      expect(getActiveMeterIndex(received)).toBe(0)
    })
  
    test('throws error when song contains no active meter',()=>{
      const received : Song = {
        song:[{
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
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
        getActiveMeterIndex(received)
      }).toThrow()
    })
  })
  
 