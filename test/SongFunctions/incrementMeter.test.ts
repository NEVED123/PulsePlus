import { Song, Subdivisions} from '../../logic/structure'
import { incrementMeter } from '../../logic/SongFunctions'

describe('incrementMeter',()=>{
    test('loop to beginning',()=>{
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
          repeat : 1,
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
          }
        ],
        repeat: true,
        
        
        
      }
  
      const expected : Song = {
        song:[{
          initBpm: 100,
          denominator: 4,
          repeat : 1,
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
          repeat : 1,
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
  
      expect(incrementMeter(received, true)).toEqual(expected)
    })
  
    test('activeMeter is last meter, but not looping',()=>{
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
          repeat : 1,
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
          }
        ],
        repeat: true,
        
        
        
      }
  
      expect(incrementMeter(received)).toEqual(received);
    })
  
    test('activeMeter is not last meter',()=>{
      const received : Song = {
        song:[{
          initBpm: 100,
          denominator: 4,
          repeat : 1,
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
          repeat : 1,
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
  
      const expected : Song = {
        song:[{
          initBpm: 100,
          denominator: 4,
          repeat : 1,
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
          initBpm: 100,
          denominator: 4,
          repeat : 1,
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
          }
        ],
        repeat: true,
        
        
        
      }
  
      expect(incrementMeter(received)).toEqual(expected)
    })
  })