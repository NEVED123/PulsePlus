import { Song, Subdivisions } from '../../logic/structure'
import { setAccent } from '../../logic/SongFunctions'

describe('setAccent', ()=>{
  
    test('increments accent on active meter from 0 to 1',()=>{
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
    
      const result : Song = {
        song:[{
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: true,
          beats:[{
              beatSound : 1,
              subDiv : Subdivisions.none,
                
              active : true
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
    
      expect(setAccent(received, 0)).toEqual(result)
    })
  
    test('loops accent number back to 0',()=>{
      const received : Song = {
        song:[{
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: true,
          beats:[{
              beatSound : 2,
              subDiv : Subdivisions.none,
                
              active : true
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
    
      const result : Song = {
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
    
      expect(setAccent(received, 0)).toEqual(result)
    })
  
    test('throws error if given beat index does not exist in active meter',()=>{
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
        repeat: true
      }
    
      expect(()=>{
        setAccent(received, 1)
      }).toThrow()
    })
  
  })