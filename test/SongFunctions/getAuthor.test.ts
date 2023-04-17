import { Song, Subdivisions} from '../../logic/structure'
import { getAuthor } from '../../logic/SongFunctions'

describe('getAuthor',()=>{
    test('retreives song author',()=>{
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
  
      expect(getAuthor(received)).toEqual('Deven')
      
    })
  })