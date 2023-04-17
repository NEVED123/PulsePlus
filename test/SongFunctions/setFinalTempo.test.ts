import { Song, Subdivisions} from '../../logic/structure'
import { setFinalTempo } from '../../logic/SongFunctions'

describe('setFinalTempo',()=>{
    test('new finalBpm + accel defined',()=>{
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
          ],
          repeat: true,
          
          
          
        }
  
        const expected : Song = {
          song:[{
            initBpm: 100,
            finalBpm:200,
            accel: 5,
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
          ],
          repeat: true,
          
          
          
        }
  
        expect(setFinalTempo(200, 5, received)).toEqual(expected)
    })
      
  
    test('new FinalBpm defined, accel undefined',()=>{
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
        ],
        repeat: true,
        
        
        
      }
  
      const expected : Song = {
        song:[{
          initBpm: 100,
          finalBpm:200,
          accel: 0,
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
        ],
        repeat: true,
        
        
        
      }
      expect(setFinalTempo(200, undefined, received)).toEqual(expected)
    })
  
    test('new finalBpm undefined, new accel defined',()=>{
  
      const received : Song = {
        song:[{
          initBpm: 100,
          finalBpm:200,
          accel: 5,
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
        ],
        repeat: true,
        
        
        
      }
      
      expect(setFinalTempo(undefined, 5, received)).toEqual(expected)
    })
  
    test('both FinalBpm and accel undefined',()=>{
      const received : Song = {
        song:[{
          initBpm: 100,
          finalBpm:200,
          accel: 5,
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
        ],
        repeat: true,
        
        
        
      }
      expect(setFinalTempo(undefined, undefined, received)).toEqual(expected)
    })
  })
  