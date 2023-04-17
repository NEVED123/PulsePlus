import { Song, Subdivisions} from '../../logic/structure'
import { setSectionName } from '../../logic/SongFunctions'

describe('setSectionName',()=>{
    test('sets name of active meter',()=>{
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
      
      const expected: Song = {
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
  
      expect(setSectionName('sectionName', received)).toEqual(expected)
    })
  })