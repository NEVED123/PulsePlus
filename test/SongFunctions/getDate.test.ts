import { Song, Subdivisions} from '../../logic/structure'
import { getDate } from '../../logic/SongFunctions'

describe('getDate',()=>{
    test('retreives song date',()=>{
      const received: Song = {
        song:[{
          initBpm: 100,
          finalBpm: 200,
          accel: 5,
          denominator: 4,
          repeat : 10,
          active: true,
          beats:[{
                beatSound : 0,
                subDiv : Subdivisions.none,                
                active : false
              },
            ]
          },
        ],
        repeat: true,
        metadata: {
          name: "Default",
          date: "3/27/2023",
          author: "Deven"
        }
      }  
  
      expect(getDate(received)).toEqual("3/27/2023")
      
    })
  })