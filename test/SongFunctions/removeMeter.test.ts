import { Song, Subdivisions} from '../../logic/structure'
import { removeMeter } from '../../logic/SongFunctions'

describe('removeMeter',()=>{
    test('song only has one meter, returns',()=>{
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
    
      expect(removeMeter(received)).toEqual(received)
     })
  
     test('song is longer than one meter',()=>{
  
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
  
      const expected: Song = {
        song:[{
          sectionName:'sectionName',
          initBpm: 100,
          finalBpm:200,
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
    
      expect(removeMeter(received)).toEqual(expected)
     })
  })