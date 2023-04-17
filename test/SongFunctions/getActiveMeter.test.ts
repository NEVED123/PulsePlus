import { Song, Subdivisions, Meter } from '../../logic/structure'
import { getActiveMeter } from '../../logic/SongFunctions'

describe('getActiveMeter',()=>{

    test('returns active meter', ()=>{
  
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
                  
                active : true
              }
            ]
          }
        ],
        repeat: true,
        
        
      }
  
      const result : Meter = {
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
        }
  
      expect(getActiveMeter(received)).toEqual(result)
    })
  
   
    test('throws error when song contains no active meter', ()=>{
  
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
              }
            ]
          }
        ],
        repeat: true,
        
        
      }
  
      expect(()=>{
        getActiveMeter(received)
      }).toThrow
    })
  })