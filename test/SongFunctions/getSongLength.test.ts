import { Song, Subdivisions} from '../../logic/structure'
import { getSongLength } from '../../logic/SongFunctions'

describe('getSongLength',()=>{
    test('song is 1 meter long',()=>{
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
            ]
          },
        ],
        repeat: true,
        
        
        
      }  
    
      expect(getSongLength(received)).toEqual(1)
     })
  
     test('song is more than 1 meter long',()=>{
      const received: Song = {
        song:[{
          sectionName: 'sectionName',
          initBpm: 100,
          finalBpm:200,
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
          },
          {
            initBpm: 200,
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
  
      expect(getSongLength(received)).toEqual(3)
     })
  })