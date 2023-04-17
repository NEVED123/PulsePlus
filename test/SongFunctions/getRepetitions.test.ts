import { Song, Subdivisions} from '../../logic/structure'
import { getRepetitions } from '../../logic/SongFunctions'

describe('getRepetitions',()=>{
    test('gets Repetitions of activeMeter',()=>{
  
      const received: Song = {
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
      
      expect(getRepetitions(received)).toEqual(10)
    })
  })