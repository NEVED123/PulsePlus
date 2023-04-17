import { Song, Subdivisions} from '../../logic/structure'
import { getDenominator } from '../../logic/SongFunctions'

describe('getDenominator',()=>{
  test('gets denominator from active meter', ()=>{
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

    expect(getDenominator(received)).toBe(4)
  })
})