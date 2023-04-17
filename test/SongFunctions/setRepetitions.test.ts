import { Song, Subdivisions} from '../../logic/structure'
import { setRepetitions } from '../../logic/SongFunctions'

describe('setRepetitions',()=>{
    test('sets reptition for active meter',()=>{
      const received: Song = {
        song:[{
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: true,
          beats:[{
                beatSound : 0,
                subDiv : Subdivisions.none,
                  
                active : false
              },
              {
                beatSound : 0,
                subDiv : Subdivisions.none,
                  
                active : false
              }
            ]
          },
        ],
        repeat: true,
        
        
        
      }
  
      const expected: Song = {
        song:[{
          initBpm: 100,
          denominator: 4,
          repeat : 10,
          active: true,
          beats:[{
                beatSound : 0,
                subDiv : Subdivisions.none,
                  
                active : false
              },
              {
                beatSound : 0,
                subDiv : Subdivisions.none,
                  
                active : false
              }
            ]
          },
        ],
        repeat: true,
        
        
        
      }
  
      expect(setRepetitions(10, received)).toEqual(expected)
    })
  })