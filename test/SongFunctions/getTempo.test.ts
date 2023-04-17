import { Song, Subdivisions} from '../../logic/structure'
import { getTempo } from '../../logic/SongFunctions'

describe('getTempo',()=>{
    test('get tempo from active meter beat of active meter', ()=>{
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
            initBpm: 200,
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
  
      expect(getTempo(received)).toBe(100)
    })
  })