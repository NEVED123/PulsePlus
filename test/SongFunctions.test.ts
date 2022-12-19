import { getActiveMeter, setNumerator } from "../logic/SongFunctions";
import { Meter, Beat, Song, Subdivisions} from "../logic/structure"
import {describe, expect, test} from "@jest/globals"
import _ from "lodash"

const numEquals32 : Song = {
  song:[{
    initBpm: 100,
    denominator: 4,
    repeat : 1,
    active: true,
    beats:[{
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : true
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    },
    {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : false
    }
    ]
  }],
  repeat: true,
  name: "Default",
  author: "",
  date: ""
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
        beatDuration: 600, // 60/100 * 1000 
        active : true
    }
    ]
  }],
  repeat: true,
  name: "Default",
  author: "",
  date: ""
}

const multipleMeters : Song = {
  song:[{
    initBpm: 100,
    denominator: 4,
    repeat : 1,
    active: true,
    beats:[{
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
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
          beatDuration: 600, // 60/100 * 1000 
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
          beatDuration: 600, // 60/100 * 1000 
          active : true
        }
      ]
    }
  ],
  repeat: true,
  name: "Default",
  author: "",
  date: ""
}

describe('getActiveMeter',()=>{
  test('getActiveMeter returns a deepclone of the active meter', ()=>{
    expect(getActiveMeter(multipleMeters)).not.toBe(multipleMeters.song[0])
  })

  test('returns active meter at index 0', ()=>{
    expect(getActiveMeter(multipleMeters)).toEqual(multipleMeters.song[0])
  })

  test('returns active meter at index i where 0<i<length', ()=>{
    const multipleMetersIndexOneActive = _.cloneDeep(multipleMeters)
    
    multipleMetersIndexOneActive.song[0].active = false
    multipleMetersIndexOneActive.song[1].active = true
    
    expect(getActiveMeter(multipleMetersIndexOneActive)).toEqual(multipleMetersIndexOneActive.song[1])
  })

  test('returns active meter at last index in song',()=>{
    const multipleMetersLastActive = _.cloneDeep(multipleMeters)
    
    multipleMetersLastActive.song[0].active = false
    multipleMetersLastActive.song[2].active = true
    
    expect(getActiveMeter(multipleMetersLastActive)).toEqual(multipleMetersLastActive.song[2])
  })

  test('throws error when song contains no active meter', ()=>{
    const noActiveMeter = _.cloneDeep(multipleMeters)

    noActiveMeter.song[0].active = false

    expect(()=>{
      getActiveMeter(noActiveMeter)
    }).toThrow
  })
})

describe('setNumerator', ()=>{

  const num1FirstAccent1 = _.cloneDeep(numEquals1)

  num1FirstAccent1.song[0].beats[0].beatSound = 1

  const num32FirstAccent1 = _.cloneDeep(numEquals32)

  num32FirstAccent1.song[0].beats[0].beatSound = 1  

  test('setNumerator returns a deepclone of song', ()=>{
    expect(setNumerator(numEquals1, 1)).not.toBe(numEquals1)
  })

  test('setNumerator from 1 to 32, resetAccents = true', ()=>{
    expect(setNumerator(numEquals1, 32, true)).toEqual(numEquals32);
  })

  test('setNumerator from 32 to 1, resetAccents = true', ()=>{
    expect(setNumerator(numEquals32, 1, true)).toEqual(numEquals1);
  })

  test('setNumerator from 1 to 32, resetAccents = false',()=>{
    expect(setNumerator(num1FirstAccent1, 32, false)).toEqual(num32FirstAccent1)
  })

  test('setNumerator from 32 to 1, resetAccents = false',()=>{
    expect(setNumerator(num32FirstAccent1, 1, false)).toEqual(num1FirstAccent1)
  })
})

