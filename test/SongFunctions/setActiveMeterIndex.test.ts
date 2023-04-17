import { Song, Subdivisions} from '../../logic/structure'
import { setActiveMeterIndex } from '../../logic/SongFunctions'

describe('setActiveMeterIndex',()=>{
    test('sets active meter', ()=>{
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
          active: false,
          beats:[{
                beatSound : 0,
                subDiv : Subdivisions.none,
                  
                active : false
              },
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
              ]
            },
            {
              initBpm: 100,
              denominator: 4,
              repeat : 10,
              active: true,
              beats:[{
                    beatSound : 0,
                    subDiv : Subdivisions.none,          
                    active : false
                  },
                ]
              }
        ],
        repeat: true,
        
        
        
      }  
  
      expect(setActiveMeterIndex(2, received)).toEqual(expected)
    })
  })