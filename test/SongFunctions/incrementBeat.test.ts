import { Song, Subdivisions} from '../../logic/structure'
import { incrementBeat } from '../../logic/SongFunctions'

describe('incrementBeat',()=>{

    //increment within meter
    test('increment within single meter', ()=>{
  
      const received : Song = {
        song:[{
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: true,
          beats:[{
                beatSound : 0,
                subDiv : Subdivisions.none,
                  
                active : true //CHANGED
              },
              {
                beatSound : 0,
                subDiv : Subdivisions.none,
                  
                active : false //CHANGED
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
                  
                active : false //CHANGED
              },
              {
                beatSound : 0,
                subDiv : Subdivisions.none,
                  
                active : true //CHANGED
              }
            ]
          },
        ],
        repeat: true,
        
        
        
      }
  
      expect(incrementBeat(received)).toEqual(result)
  
    })
  
    //loop back to beginning of meter if repeat
  
    //increment from one meter to the next if no repeat
    test('increment to next meter', ()=>{
  
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
                  
                active : false //CHANGED
              },
              {
                beatSound : 0,
                subDiv : Subdivisions.none,
                  
                active : false //CHANGED
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
                  
                active : true
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
  
      expect(incrementBeat(received)).toEqual(result)
      
    })
  
    //loop from end of last meter to beginning
    test('loop to beginning', ()=>{
  
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
                  
                active : true
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
  
      expect(incrementBeat(received)).toEqual(result)
    }) 

    test('song has no active beat', ()=>{
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
                active : true
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

      expect(incrementBeat(received)).toEqual(expected)
    })
  })