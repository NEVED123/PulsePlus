import { Song, Subdivisions} from '../../logic/structure'
import { getNumerator } from '../../logic/SongFunctions'

describe('getNumerator',()=>{

    test('gets numerator = 1 from active meter', ()=>{
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
                  
                active : false
                }
              ]
            }
        ],
        repeat: true,
        
        
        
      }
    
      expect(getNumerator(received)).toBe(1)
    })
  
    test('throws error when numerator = 0', ()=>{
      const received : Song = {
        song:[{
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: true,
          beats:[]
          }
        ],
        repeat: true,
        
        
        
      }
  
      expect(()=>{
        getNumerator(received)
      }).toThrow()
    })
  
  })