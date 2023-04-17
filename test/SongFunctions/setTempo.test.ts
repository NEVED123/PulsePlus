import { Song, Subdivisions} from '../../logic/structure'
import { setTempo } from '../../logic/SongFunctions'

describe('setTempo',()=>{
    test('set tempo for active meter',()=>{
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
          },
          {
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
    
      const result : Song = {
        song:[{
          initBpm: 200,
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
          {
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
  
      expect(setTempo(received, 200)).toEqual(result)
    })
  })