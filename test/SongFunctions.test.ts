import { setNumerator } from "../logic/SongFunctions";
import { Meter, Beat, Song, Subdivisions} from "../logic/structure"
import {describe, expect, test} from "@jest/globals"

describe('setNumerator', ()=>{

  const NumEquals32 : Song = {
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

  test('setNumerator from 1 to 32, resetAccents = true', ()=>{
    expect(setNumerator(numEquals1, 32, true)).toEqual(NumEquals32);
  })
})

