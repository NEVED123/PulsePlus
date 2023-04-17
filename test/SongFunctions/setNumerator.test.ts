import { Song, Subdivisions} from '../../logic/structure'
import { setNumerator } from '../../logic/SongFunctions'
import _ from 'lodash'

describe('setNumerator', ()=>{

    const numEquals32 : Song = {
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
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
          beatSound : 0,
          subDiv : Subdivisions.none,
            
          active : false
        },
        {
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
      }],
      repeat: true,
      
      
      
    }
    
    const numEquals1 : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
              
            active : false
        }
        ]
      }],
      repeat: true,
      
      
      
    }
  
  
  
    test('setNumerator from 1 to 32, resetAccents = true', ()=>{
  
      const numEquals32Clone = _.cloneDeep(numEquals32)
      const numEquals1Clone = _.cloneDeep(numEquals1)
  
      expect(setNumerator(numEquals1Clone, 32, true)).toEqual(numEquals32Clone);
    })
  
    test('setNumerator from 32 to 1, resetAccents = true', ()=>{
  
      const numEquals32Clone = _.cloneDeep(numEquals32)
      const numEquals1Clone = _.cloneDeep(numEquals1)
  
      expect(setNumerator(numEquals32Clone, 1, true)).toEqual(numEquals1Clone);
    })
  
    test('setNumerator from 1 to 32, resetAccents = false',()=>{
  
      const num1FirstAccent1 = _.cloneDeep(numEquals1)
  
      num1FirstAccent1.song[0].beats[0].beatSound = 1
    
      const num32FirstAccent1 = _.cloneDeep(numEquals32)
    
      num32FirstAccent1.song[0].beats[0].beatSound = 1  
  
      expect(setNumerator(num1FirstAccent1, 32, false)).toEqual(num32FirstAccent1)
    })
  
    test('setNumerator from 32 to 1, resetAccents = false',()=>{
  
      const num1FirstAccent1 = _.cloneDeep(numEquals1)
  
      num1FirstAccent1.song[0].beats[0].beatSound = 1
    
      const num32FirstAccent1 = _.cloneDeep(numEquals32)
    
      num32FirstAccent1.song[0].beats[0].beatSound = 1  
  
      expect(setNumerator(num32FirstAccent1, 1, false)).toEqual(num1FirstAccent1)
    })
  })