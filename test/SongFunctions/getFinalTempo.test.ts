import { Song, Subdivisions} from '../../logic/structure'
import { getFinalTempo } from '../../logic/SongFunctions'

describe('getFinalTempo',()=>{
    test('Final tempo defined', ()=>{
      const received : Song = {
        song:[{
          initBpm: 100,
          finalBpm: 200,
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
      
      expect(getFinalTempo(received)).toBe(200)
    })
      
      test('Final tempo undefined', ()=>{
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
    
        expect(getFinalTempo(received)).toEqual(undefined)
    })
  })