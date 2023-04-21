import { Song, Subdivisions} from '../../logic/structure'
import { resetSong } from '../../logic/SongFunctions'

describe('resetSong',()=>{
    test('resets active meter and active beat',()=>{
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
          },
          {
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
  
      const result : Song = {
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
  
      expect(resetSong(received)).toEqual(result)
    })
  
  })
  