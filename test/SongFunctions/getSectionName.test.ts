import { Song, Subdivisions} from '../../logic/structure'
import { getSectionName } from '../../logic/SongFunctions'

describe('getSectionName',()=>{
    test('gets section name from active meter',()=>{
      const received: Song = {
        song:[{
          sectionName:'sectionName',
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
          {
            initBpm: 100,
            denominator: 4,
            repeat : 10,
            active: false,
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
            }
        ],
        repeat: true,
        
        
        
      }  
  
      expect(getSectionName(received)).toEqual('sectionName')
    })
  })