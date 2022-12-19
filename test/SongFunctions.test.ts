import { getActiveMeter, incrementBeat, setNumerator } from "../logic/SongFunctions";
import { Meter, Beat, Song, Subdivisions} from "../logic/structure"
import {describe, expect, test} from "@jest/globals"
import _ from "lodash"



describe('getActiveMeter',()=>{

  test('getActiveMeter returns a deepclone of the active meter', ()=>{

    const recieved : Song = {
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

    expect(getActiveMeter(recieved)).not.toBe(recieved.song[0])

  })

  test('returns active meter at index 0', ()=>{

    const recieved : Song = {
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

    const result : Meter = {
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
      }

    expect(getActiveMeter(recieved)).toEqual(result)
  })

  test('returns active meter at index i where 0<i<length', ()=>{

    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: false,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
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
              active : false
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }
    
    const result : Meter =  {
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
    }
    
    expect(getActiveMeter(recieved)).toEqual(result)
  })

  test('returns active meter at last index in song',()=>{

    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: false,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
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
              beatDuration: 600, // 60/100 * 1000 
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
    
    const result : Meter =  {
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
    }
    
    expect(getActiveMeter(recieved)).toEqual(result)
  })

  test('throws error when song contains no active meter', ()=>{

    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: false,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : false
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(()=>{
      getActiveMeter(recieved)
    }).toThrow
  })
})

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

describe('incrementBeat',()=>{

  //increment within meter
  test('increment within single meter', ()=>{

    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true //CHANGED
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false //CHANGED
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
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
              beatDuration: 600, // 60/100 * 1000 
              active : false //CHANGED
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true //CHANGED
            }
          ]
        },
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(incrementBeat(recieved)).toEqual(result)

  })

  //loop back to beginning of meter if repeat

  //increment from one meter to the next if no repeat
  test('increment to next meter', ()=>{

    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false 
            },
            {
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
              active : false //CHANGED
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false //CHANGED
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
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
        },
        {
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
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(incrementBeat(recieved)).toEqual(result)
    
  })

  //loop from end of last meter to beginning
  test('loop to beginning', ()=>{

    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: false,
        beats:[{
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
        },
        {
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false 
            },
            {
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

    const result : Song = {
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
              active : false
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false 
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(incrementBeat(recieved)).toEqual(result)
  }) 
})

