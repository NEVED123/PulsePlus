import { Song, Subdivisions} from '../../logic/structure'
import { setDenominator } from '../../logic/SongFunctions'

describe('setDenominator', ()=>{
    test('sets denominator of active meter', ()=>{
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
            denominator: 2,
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
          initBpm: 100,
          denominator: 8,
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
            denominator: 2,
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
  
      expect(setDenominator(received, 8)).toEqual(result)
    })
  })
  
  